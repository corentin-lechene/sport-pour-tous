import {PhoneNumber} from "../../../../common/vo/phoneNumber/phoneNumber";
import {Email} from "../../../../common/vo/email/email";

export class UpdateUserDto {
    readonly firstname: string;
    readonly lastname: string;
    readonly email: Email;
    readonly address: string;
    readonly phoneNumber: PhoneNumber;


    constructor(firstname: string, lastname: string, email: Email, address: string, phoneNumber: PhoneNumber) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}