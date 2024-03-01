import {PhoneNumberException, PhoneNumberMessageException} from "./phoneNumber.exception";

export class PhoneNumber {
    private constructor(private readonly _value: string) {
        this._value = _value;
    }

    public static of(phone: string) : PhoneNumber {
        if(!PhoneNumber.isValid(phone)) {
            throw new PhoneNumberException(PhoneNumberMessageException.BAD_FORMAT);
        }

        console.log("phone number okay");
        return new PhoneNumber(phone);
    }

    private static isValid(phoneNumber: string) {
        const phoneRegex = /^(?:(?:\+|00)33|0)[1-9](?:[\s.-]?[0-9]{2}){4}$/;
        return phoneRegex.test(phoneNumber);
    }


    get getPhoneNumber(): string {
        return this._value;
    }
}