import { PaymentProvider } from '../providers/paymentProvider';

export abstract class Payment {
    protected paymentProvider: PaymentProvider;

    constructor(paymentProvider: PaymentProvider) {
        this.paymentProvider = paymentProvider;
    }

    process(): PaymentResult {
        // Implementation
    }

    authorize(): AuthorizationResult {
        // Implementation
    }

    capture(): CaptureResult {
        // Implementation
    }

    void(): VoidResult {
        // Implementation
    }

    refund(): RefundResult {
        // Implementation
    }
}