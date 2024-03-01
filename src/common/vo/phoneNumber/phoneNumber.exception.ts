export enum PhoneNumberMessageException {
    BAD_FORMAT = "Le numéro de téléphone est au mauvais format !"
}

export class PhoneNumberException extends Error {
    constructor(phoneNumberMessageException: PhoneNumberMessageException) {
        const message = phoneNumberMessageException.toString()
        super(message);
        this.name = "PhoneNumberException";
        this.message = message;
    }
}