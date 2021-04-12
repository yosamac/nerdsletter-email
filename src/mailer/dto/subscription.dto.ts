
import { CreateSubscriptionDTO } from './create.subscription.dto';

export class SubscriptionDTO extends CreateSubscriptionDTO {
    id: string;
    createdAt: string;
    modifiedAt: string;
}