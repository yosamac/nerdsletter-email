import { Controller, UsePipes } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { MailerService } from './mailer.service';
import { NotificationEmailPipe } from './dto/mailer.dto';

@Controller('mailer')
export class MailerMessageController {

    constructor(private readonly mailerService: MailerService) {}

    @MessagePattern({ cmd: 'sendMail' })
    @UsePipes(NotificationEmailPipe)
    sendEmail(data: any): Promise<any> {
        return this.mailerService.sendEmail(data)
            .then(result => { return result.envelope; });
    }
}
