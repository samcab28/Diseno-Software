export class SubscriptionResult {
    public success: boolean;
    public subscriptionArn: string;
    public errorMessage: string;

    constructor(success: boolean, subscriptionArn: string = '', errorMessage: string = '') {
        this.success = success;
        this.subscriptionArn = subscriptionArn;
        this.errorMessage = errorMessage;
    }
}