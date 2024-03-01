export enum UserMessageException {
    ALL_FIELDS_MUST_BE_FILL = "All fields must be fill (email, password, email, phone)",
    THE_MAIL_ALREADY_EXIST = 'Mail already exists',
}

export class UserException extends Error {
    constructor(userMessageException: UserMessageException) {
        const message = userMessageException.toString()
        super(message);
        this.name = "UserException";
        this.message = message;
    }
}