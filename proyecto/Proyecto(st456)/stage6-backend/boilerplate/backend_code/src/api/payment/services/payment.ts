import { PaymentProvider } from '../providers/paymentProvider';

export class Payment {
    private paymentProvider: PaymentProvider;

    constructor(paymentProvider: PaymentProvider) {
        this.paymentProvider = paymentProvider;
    }

    public process(): any {
        // Implementation
    }

    public authorize(): any {
        // Implementation
    }

    public capture(): any {
        // Implementation
    }

    public void(): any {
        // Implementation
    }

    public refund(): any {
        // Implementation
    }
}