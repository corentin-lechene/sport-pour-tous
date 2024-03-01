import {v4 as uuidv4} from "uuid";
import {Email} from "../../../common/vo/email/email";
import {PhoneNumber} from "../../../common/vo/phoneNumber/phoneNumber";
export class UserId {
    value: string;

    constructor(value: string = uuidv4()) {
        this.value = value;
    }
}

export class User {
    id: UserId;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    address: string;
    phoneNumber: string;

    // todo : reflexion
    deletedAt?: Date;
    createdAt?: Date;


    constructor(firstname: string, lastname: string, email: Email, password: string, address: string, phoneNumber: PhoneNumber) {
        this.id = new UserId();
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email.getEmail;
        this.password = password;
        this.address = address; // todo : VO ??
        this.phoneNumber = phoneNumber.getPhoneNumber;
    }
}