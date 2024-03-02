export enum GuaranteeMessageException {
    AMOUNT_ZERO_OR_LOWER = "The amount cannot be equal to 0 or lower than it !",

}

export class GuaranteeException extends Error {
    constructor(guaranteeMessageException: GuaranteeMessageException) {
        const message = guaranteeMessageException.toString()
        super(message);
        this.name = "GuaranteeException";
        this.message = message;
    }
}