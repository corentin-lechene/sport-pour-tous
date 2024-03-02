export enum SessionMessageException {
    SESSION_NOT_FOUND = "Session not found !",
}

export class SessionException extends Error {
    constructor(sessionMessageException: SessionMessageException) {
        const message = sessionMessageException.toString()
        super(message);
        this.name = "SessionException";
        this.message = message;
    }
}