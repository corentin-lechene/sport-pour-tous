import {v4 as uuidv4} from "uuid";

export class PlaceId {
    readonly value: string;


    constructor(value= uuidv4()) {
        this.value = value;
    }
}