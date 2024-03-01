import {PhoneNumber} from "../../../../common/vo/phoneNumber/phoneNumber";
import {Email} from "../../../../common/vo/email/email";

export class CreateUserDto {
    readonly firstname: string;
    readonly lastname: string;
    readonly email: Email;
    readonly password: string;
    readonly address: string;
    readonly phoneNumber: PhoneNumber;


    constructor(firstname: string, lastname: string, email: Email, password: string, address: string, phoneNumber: PhoneNumber) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}