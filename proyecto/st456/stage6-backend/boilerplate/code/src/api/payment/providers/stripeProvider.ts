import { PaymentProvider } from './paymentProvider';

export class StripeProvider implements PaymentProvider {
    private client: StripeClient;
    private config: StripeConfig;

    constructor(client: StripeClient, config: StripeConfig) {
        this.client = client;
        this.config = config;
    }

    createTransaction(request: PaymentRequest): Transaction {
        // Implementation
    }

    processTransaction(transaction: Transaction): TransactionResult {
        // Implementation
    }

    authorizeTransaction(transaction: Transaction): AuthorizationResult {
        // Implementation
    }

    voidTransaction(transaction: Transaction): VoidResult {
        // Implementation
    }

    refundTransaction(transaction: Transaction): RefundResult {
        // Implementation
    }
}