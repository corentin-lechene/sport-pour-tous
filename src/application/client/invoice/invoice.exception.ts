export enum InvoiceMessageException {
    AMOUNT_ZERO_OR_LOWER = "The amount cannot be equal to 0 or lower than it !",
    INVOICE_ALREADY_EXIST_FOR_THE_USER_AND_SESSION = "There is an invoice existing for this user and the session associated !",
    INVOICE_NOT_FOUND = "Invoice not found !",
}

export class InvoiceException extends Error {
    constructor(invoiceMessageException: InvoiceMessageException) {
        const message = invoiceMessageException.toString()
        super(message);
        this.name = "InvoiceException";
        this.message = message;
    }
}