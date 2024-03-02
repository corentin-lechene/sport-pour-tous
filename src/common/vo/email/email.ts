import {EmailException, EmailMessageException} from "./email.exception";

export class Email {
    private constructor(protected readonly _value: string) {
        this._value = _value;
    }

    public static of(email: string) : Email {
        if(!Email.isValid(email)) {
            throw new EmailException(EmailMessageException.BAD_FORMAT);
        }
        return new Email(email);
    }

    get getEmail(): string {
        return this._value;
    }

    private static isValid(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}