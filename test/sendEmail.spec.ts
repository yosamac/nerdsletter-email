import { Test, TestingModule } from '@nestjs/testing';
import { MailerDTO } from '../src/mailer/dto/mailer.dto';
import { AppModule } from '../src/app.module';
import { ConfigService } from '@nestjs/config';
import { MailerMessageController } from '../src/mailer/mailer.message.controller';
import { MailerService } from '../src/mailer/mailer.service';


describe('Notifications Controller', () => {
  let controller: MailerMessageController;
  let config: ConfigService;
  let service: MailerService;

  beforeAll(async () => {
    process.env = Object.assign(process.env, {
      LOG_LEVEL: 'NONE',
      AUTH_ENABLED: false
    });

    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();


    service = app.get<MailerService>(MailerService);
    service.onModuleInit();

    controller = app.get<MailerMessageController>(MailerMessageController);
    config = app.get<ConfigService>(ConfigService);
  });

  it('should be sended correct email', async () => {
    if (config.get<string>('test.sendEnabled')) {
      const dataOK: MailerDTO = {
        template: 'BILLING',
        from: 'no-reply@mediktiv.com',
        to: 'gabriel.cueva@mediktiv.com', //backend by default for test
        subject: 'Link test',
        link: 'http://localhost:5000/misuperlink',
        metadata: {
          billingId: 'BILL-1',
          transactionId: 'FIRST-TRANS',
          date: Date.now(),
          packName: 'Complete',
          price:250
        },
      };

      const result = await controller.sendEmail(dataOK);

      expect(result.from).toBe('no-reply@mediktiv.com');
      expect(result.to[0]).toBe('gabriel.cueva@mediktiv.com');
    } else {
      expect(true).toBe(true);
    }
  });
});
