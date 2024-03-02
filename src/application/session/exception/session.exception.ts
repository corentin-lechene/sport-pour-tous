export class SessionException extends Error{
    constructor(message: string) {
        super(message);
        this.name = "SessionException";
    }
}