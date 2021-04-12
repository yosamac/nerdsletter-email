
import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/joi.validation.pipe';

export const TemplatesEnum = {
    WELCOME: 'welcome.html',
    GOODBYE: 'goodbye.html'
};

const notificationSchema = Joi.object({
    template: Joi.string().default('WELCOME').required().valid('WELCOME'),
    eventType:Joi.string().required(),
    from: Joi.string().allow('').optional().email({ minDomainSegments: 2 }),
    to: Joi.string().required().email({ minDomainSegments: 2 }),
    metadata: Joi.object().optional(),
});

export const NotificationEmailPipe = new JoiValidationPipe(notificationSchema);
