import * as Joi from 'joi';


import { JoiValidationPipe } from '../../common/joi.validation.pipe';

export class SubscriptionIdDTO {
    readonly id: string;
}

export const SubscriptionIdSchema = Joi.object({
    id: Joi.string().required(),
});

export const SubscriptionIdPipe = new JoiValidationPipe(SubscriptionIdSchema);