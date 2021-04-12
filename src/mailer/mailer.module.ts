import { Module } from '@nestjs/common';

import { MailerMessageController } from './mailer.message.controller';
import { MailerService } from './mailer.service';


@Module({
    controllers: [MailerMessageController],
    providers: [MailerService]
})
export class MailerModule { }
