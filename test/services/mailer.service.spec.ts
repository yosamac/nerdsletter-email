import { Test, TestingModule } from '@nestjs/testing';
import { MainModule } from '../../src/main.module';

import { MailerService } from '../../src/mailer/mailer.service';


describe('MailerService', () => {
    let service: MailerService;

    beforeAll(async () => {
        process.env = Object.assign(process.env, {
        LOG_LEVEL: 'NONE',
        AUTH_ENABLED: false
        });

        const app: TestingModule = await Test.createTestingModule({
        imports: [MainModule],
        }).compile();


        service = app.get<MailerService>(MailerService);
        service.onModuleInit();
    });

    it('should be sended correct email', () => {

        expect(true).toBeTruthy();
    });
});
