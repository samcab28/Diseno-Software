export class NotificationResult {
    public success: boolean;
    public messageId: string;
    public errorMessage: string;

    constructor(success: boolean, messageId: string = '', errorMessage: string = '') {
        this.success = success;
        this.messageId = messageId;
        this.errorMessage = errorMessage;
    }
}