import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { LoggerModule } from './logger/logger.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
    imports: [
        LoggerModule.forRoot({
            isGlobal: true,
        }),
        ConfigModule.forRoot({
            load: [ configuration ],
            isGlobal: true
        }),
        MailerModule,
    ]
})
export class MainModule { }
