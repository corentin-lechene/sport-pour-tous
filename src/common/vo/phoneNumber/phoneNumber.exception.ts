export enum PhoneNumberMessageException {
    BAD_FORMAT = "Phone number is in bad format !"
}

export class PhoneNumberException extends Error {
    constructor(phoneNumberMessageException: PhoneNumberMessageException) {
        const message = phoneNumberMessageException.toString()
        super(message);
        this.name = "PhoneNumberException";
        this.message = message;
    }
}