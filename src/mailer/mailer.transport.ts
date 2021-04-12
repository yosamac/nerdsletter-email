// import { ConfigService } from '@nestjs/config';
// import { Injectable } from '@nestjs/common';

// import { Transporter, createTransport } from 'nodemailer';
// // import * as AWS from 'aws-sdk';

// @Injectable()
// export class MailerTransport {
//     constructor(private readonly config: ConfigService) { }

//     getTransportAWS(): Transporter {
//         AWS.config.region = this.config.get<string>('region.SES');
//         return createTransport({
//             SES: new AWS.SES({
//                 apiVersion: '2010-12-01'
//             })
//         });
//     }

//     getTransportSMTP(): Transporter {
//         return createTransport({
//             host: this.config.get<string>('aws.smtp.server'),
//             port: 465,
//             secure: true,
//             auth: {
//                 user: this.config.get<string>('aws.smtp.user'),
//                 pass: this.config.get<string>('aws.smtp.pass')
//             }
//         });
//     }
// }