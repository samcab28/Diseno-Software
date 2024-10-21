import { CodeDeliveryDetails } from './codeDeliveryDetails';

export class SignUpResult {
    private userConfirmed: boolean;
    private codeDeliveryDetails: CodeDeliveryDetails;

    constructor(userConfirmed: boolean, codeDeliveryDetails: CodeDeliveryDetails) {
        this.userConfirmed = userConfirmed;
        this.codeDeliveryDetails = codeDeliveryDetails;
    }

    public isUserConfirmed(): boolean {
        return this.userConfirmed;
    }

    public getCodeDeliveryDetails(): CodeDeliveryDetails {
        return this.codeDeliveryDetails;
    }
}