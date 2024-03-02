import {v4 as uuidv4} from "uuid";

export class SessionId {
    readonly value: string;

    constructor(value = uuidv4()) {
        this.value = value;
    }
}