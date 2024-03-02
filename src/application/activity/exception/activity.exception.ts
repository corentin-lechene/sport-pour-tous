export class ActivityException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ActivityException";
        this.message = message;
    }
}