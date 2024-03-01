export enum InvoiceMessageExceptionRepository {
    INVOICE_NOT_FOUND = 'Invoice not found',
}

export class InvoiceExceptionRepository extends Error {
    constructor(invoiceMessageExceptionRepository: InvoiceMessageExceptionRepository) {
        const message = invoiceMessageExceptionRepository.toString();
        super(message);
        this.name = "InvoiceExceptionRepository";
        this.message = message;
    }
}