import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import {
    SnsService
} from '../../src/push/sns/sns.service';
import {
    SnsServiceMock
} from '../mock/notifications/sns.service.mock';
import {
    PushController
} from '../../src/push/push.controller';
import {
    PushService
} from '../../src/push/push.service';
import {
    userId,
    requestPushDTO,
    notificationId,
    message,
} from '../mock/notifications/contants.notification.mock';
import {
    userNotificationGrpcServiceMock
} from '../mock/notifications/user.notification.grpc.service.mock';
import {
    UserNotificationGrpcService
} from '../../src/grpc/notification/user.notification.grpc.service';
import {
    userDeviceGrpcServiceMock
} from '../mock/notifications/user.device.grpc.service.mock';
import {
    UserDeviceGrpcService
} from '../../src/grpc/notification/user.device.grcp.service';

const request = {
    user: {
        userId
    }
};

describe('Notifications Controller', () => {
    let controller: PushController;
    let service: PushService;

    beforeAll(async () => {
        process.env = Object.assign(process.env, {
            LOG_LEVEL: 'NONE',
            AUTH_ENABLED: false
        });

        const app: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        })
            .overrideProvider(SnsService).useClass(SnsServiceMock)
            .compile();

        service = app.get<PushService>(PushService);
        controller = app.get<PushController>(PushController);
        userNotificationGrpcServiceMock(
            app.get<UserNotificationGrpcService>(UserNotificationGrpcService)
        );
        userDeviceGrpcServiceMock(
            app.get<UserDeviceGrpcService>(UserDeviceGrpcService)
        );
    });

    describe('Push Notification', () => {
        it('Should not fail', async () => {
            const response = await controller
                .saveDeviceToken(request, requestPushDTO);
            expect(response).toBe(undefined);
        });

        it('should reset counter', async () => {
            const response = await controller
                .resetNotificationCounter(request);
            expect(response.newNotifications).toBe(0);
        });

        it('should reset counter', async () => {
            const response = await controller
                .updateNotification(request, {
                    status: 'UNREAD'
                }, notificationId);
            expect(response.status).toBe('UNREAD');
        });

        it('should reset counter', async () => {
            const response = await controller
                .getNotifications(request);
            expect(response.notifications.length).toBe(1);
        });

        it('should reset counter', async () => {
            const response = await controller
                .getNotification(request, notificationId);
            expect(response.message).toBe(message);
        });
    });

});
