export enum UserMessageException {
    ALL_FIELDS_MUST_BE_FILL = "All fields must be fill (email, password, email, phone)",
    THE_MAIL_ALREADY_EXIST = 'Mail already exists',
    USER_NOT_FOUND = 'User not found',
    PASSWORD_IS_MISSING = 'Password is missing',

    SESSION_ERROR = "Problem with session",
    GUARANTEE_ERROR = "Problem with guarantee",
    FORMULA_ERROR = "Problem with guarantee",
    INVOICE_ERROR = "Problem with invoice",
}

export class UserException extends Error {
    constructor(userMessageException: UserMessageException) {
        const message = userMessageException.toString()
        super(message);
        this.name = "UserException";
        this.message = message;
    }
}