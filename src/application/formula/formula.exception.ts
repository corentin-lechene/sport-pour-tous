export enum FormulaMessageException {
    BAD_FORMULA = "The formula doesn't exist !"
}

export class FormulaException extends Error {
    constructor(formulaMessageException: FormulaMessageException) {
        const message = formulaMessageException.toString()
        super(message);
        this.name = "FormulaException";
        this.message = message;
    }
}