export enum EmailMessageException {
    BAD_FORMAT = "Email is in bad format !"
}

export class EmailException extends Error {
    constructor(emailMessageException: EmailMessageException) {
        const message = emailMessageException.toString()
        super(message);
        this.name = "MailException";
        this.message = message;
    }
}