export class PhoneNumber {
    private constructor(private readonly _value: string) {
        this._value = _value;
    }

    public static of(phone: string) : PhoneNumber {
        if(!PhoneNumber.isValid(phone)) {
            throw new Error("Phone non valide");
        }

        return new PhoneNumber(phone);
    }

    private static isValid(phoneNumber: string) {
        const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
        return phoneRegex.test(phoneNumber);
    }


    get getPhoneNumber(): string {
        return this._value;
    }
}