export interface PaymentProvider {
    createTransaction(request: PaymentRequest): Transaction;
    processTransaction(transaction: Transaction): TransactionResult;
    authorizeTransaction(transaction: Transaction): AuthorizationResult;
    voidTransaction(transaction: Transaction): VoidResult;
    refundTransaction(transaction: Transaction): RefundResult;
}