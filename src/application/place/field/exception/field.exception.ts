export class FieldException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "FieldException";
    }
}