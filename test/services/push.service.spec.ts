import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { PushService } from '../../src/push/push.service';
import { SnsService } from '../../src/push/sns/sns.service';
import { SnsServiceMock } from '../mock/notifications/sns.service.mock';
import {
    userNotificationGrpcServiceMock
} from '../mock/notifications/user.notification.grpc.service.mock';
import {
    UserNotificationGrpcService
} from '../../src/grpc/notification/user.notification.grpc.service';
import {
    UserDeviceGrpcService
} from '../../src/grpc/notification/user.device.grcp.service';
import {
    userDeviceGrpcServiceMock
} from '../mock/notifications/user.device.grpc.service.mock';
import {
    requestPushDTO,
    userId,
    notificationId,
    message,
    event,
} from '../mock/notifications/contants.notification.mock';
import {
    NotificationStatusType
} from '@mediktiv/nestjs-contract';

describe('pushService', () => {
    let pushService: PushService;

    beforeAll(async () => {
        process.env = Object.assign(process.env, { LOGGING_LEVEL: 'ERROR' });

        const app: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        })
            .overrideProvider(SnsService).useClass(SnsServiceMock)
            .compile();

        pushService = app.get<PushService>(PushService);
        userNotificationGrpcServiceMock(
            app.get<UserNotificationGrpcService>(UserNotificationGrpcService)
        );
        userDeviceGrpcServiceMock(
            app.get<UserDeviceGrpcService>(UserDeviceGrpcService)
        );
    });

    describe('Should pass all notifications tests', () => {
        it('Set token in database, should not throw exception', async () => {
            const res = await pushService
                .savePushToken(userId, requestPushDTO);
            expect(res).toEqual(undefined);
        });

        it('should get a notification list', async () => {
            const res = await pushService
                .getNotifications(userId);
            expect(res.newNotifications).toEqual(0);
            expect(res.notifications.length).toEqual(1);
        });

        it('should get a notification', async () => {
            const res = await pushService
                .getNotification(userId, notificationId);
            expect(res.message).toEqual(message);
            expect(res.event).toEqual(event);
        });

        it('should change the status of a notification', async () => {
            const res = await pushService
                .updateNotificationStatus(
                    userId,
                    notificationId,
                    NotificationStatusType.UNREAD
                );
            expect(res.message).toEqual(message);
            expect(res.event).toEqual(event);
            expect(res.status).toEqual('UNREAD');
        });

        it('should receive zero in newNotification property', async () => {
            const res = await pushService
                .resetCounter(userId);
            expect(res.newNotifications).toEqual(0);
        });
    });
});
