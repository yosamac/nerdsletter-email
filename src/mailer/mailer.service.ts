import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter } from 'nodemailer';
import { join } from 'path';
import * as njk from 'nunjucks';

import { ServiceLogger } from '../logger/logger.service';
import { TemplatesEnum } from './dto/mailer.dto';
import { handleError } from '../common/helper';
import {
    ServiceExceptionStatus
} from '../common/service.exception';

const JSON_SPACES = 4;

@Injectable()
export class MailerService implements OnModuleInit {
    private transporter: Transporter;
    private defaultSender: string;

    constructor(
        private readonly logger: ServiceLogger,
        private readonly config: ConfigService,
    ) {
        const instance = this.constructor;
        logger.setContext(instance.name);
    }

    onModuleInit() {
        const templates = this.config.get<string>('templates.path');

        this.logger.debug(`Templates directory ${templates}`);

        njk.configure(join(__dirname, '..', templates), {
            autoescape: true,
        });

        this.defaultSender = this.config.get<string>('email.from');
    }

    async sendEmail(data: any): Promise<any> {
        this.logger.info('Sending email', JSON.stringify(data, null, JSON_SPACES));

        // const template = TemplatesEnum[data.template];

        // if (!template) {
        //     return handleError(this.logger, {
        //         status: ServiceExceptionStatus.INVALID_ARGUMENT,
        //         msg: 'Invalid template'
        //     });
        // }

        // const renderedTemplate = njk.render(template, { data: { ...data.metadata } });

        // if (!data.from) {
        //     data.from = this.defaultSender;
        // }

        // const result = await this.transporter.sendMail({
        //     from: {
        //         name: 'Nerdsletter',
        //         address: data.from
        //     },
        //     to: data.to,
        //     subject: data.subject,
        //     html: renderedTemplate,
        // });

        return Promise.resolve({ envolved: {} });
    }
}
