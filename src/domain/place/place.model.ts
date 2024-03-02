import {Field} from "./field/field.model";
import {PlaceId} from "./place-id";
import {Address} from "./address";

export class Place {
    readonly id: PlaceId;
    fields: Field[];
    address: Address;

    constructor(fields: Field[], address: Address) {
        this.id = new PlaceId();
        this.fields = fields;
        this.address = address;
    }
}
