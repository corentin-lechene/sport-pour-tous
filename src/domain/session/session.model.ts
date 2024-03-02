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

    users: User[]

    deletedAt?: Date;
}