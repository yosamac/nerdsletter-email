import { Test, TestingModule } from '@nestjs/testing';

import { MailerDTO } from '../../src/mailer/dto/mailer.dto';
import { MailerTransport } from '../../src/mailer/mailer.transport';
import { AppModule } from '../../src/app.module';
import { MailerService } from '../../src/mailer/mailer.service';
import { ContactDTO } from '../../src/mailer/dto/contact.dto';

describe('Notifications Controller', () => {
    let service: MailerService;

    beforeAll(async () => {
        process.env = Object.assign(process.env, {
            LOG_LEVEL: 'NONE',
            AUTH_ENABLED: false
        });

        const app: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        })
            .overrideProvider(MailerTransport)
            .useValue({
                getTransportAWS: () => ({
                    sendMail: (data) => ({
                        envelope: {
                            from: data.from,
                            to: [data.to],
                            subject: data.subject
                        }
                    })
                })
            })
            .compile();

        service = app.get<MailerService>(MailerService);
        service.onModuleInit();

    });

    describe('Sending email', () => {
        it('should be sended correct email', async () => {

            const dataOK: MailerDTO = {
                template: 'ACCEPT_INVITATION',
                from: 'no-reply@mediktiv.com',
                to: 'backend@mediktiv.com',//backend by default for test
                subject: 'Backend Test',
                link: '',
                metadata: {}
            };

            const response = await service.sendEmail(dataOK);

            expect(response.envelope.to[0]).toBe('backend@mediktiv.com');
        });

        it('should be undefined with invalid template', async () => {

            const dataNotOK: MailerDTO = {
                template: 'BAD_TEMPLATE',
                from: 'no-reply@mediktiv.com',
                to: 'gabriel.cueva@mediktiv.com',
                subject: 'Backend Test',
                link: '',
                metadata: {}
            };

            try {
                await service.sendEmail(dataNotOK);
            } catch (err) {
                expect(err.error.msg).toBe('Invalid template');
            }
        });

        it('should be undefined with invalid email', async () => {

            const dataNotOK: MailerDTO = {
                template: 'ACCEPT_INVITATION',
                from: 'no-reply@mediktiv.com',
                to: 'gabriel.cueva',
                subject: 'Backend Test',
                link: '',
                metadata: {}
            };

            try {
                await service.sendEmail(dataNotOK);
            } catch (err) {
                expect(err.message).toBe('Missing required header `To`.');
            }
        });

        describe('Sending contact email', () => {
            it('should be sended correct email', async () => {

                const dataOK: ContactDTO = {
                    name: 'John',
                    email: 'prueba@mediktiv.com',
                    subject: 'Backend Test Contact',
                    content: 'email test'
                };

                await service.contactAdmin(dataOK).then(response => {
                    expect(response).toStrictEqual({});
                });

            });

        });


    });
});
