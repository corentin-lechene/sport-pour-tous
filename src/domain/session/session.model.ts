import {v4 as uuidv4} from "uuid";
import {User} from "../client/user/user.model";

export class SessionId {
    value: string;

    constructor(value: string = uuidv4()) {
        this.value = value;
    }
}

export class Session {
    id: SessionId;
    max_participant: number; // todo: activity or session
    name: string;
    price: number;
    startAt: Date;

    users: User[]

    deletedAt?: Date;
    createdAt?: Date;


    constructor(max_participant: number, name: string, price: number, startAt: Date, users: User[]) {
        this.id = new SessionId();
        this.max_participant = max_participant;
        this.name = name;
        this.price = price;
        this.startAt = startAt;
        this.users = users;
    }
}