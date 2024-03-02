import {FieldId} from "./field-id";
import {FieldType} from "./field-type.enum";
import {PlaceId} from "../place-id";

export class Field {
    id: FieldId;
    name: string;
    fieldType: FieldType;

    constructor(name: string, fieldType: FieldType) {
        this.id = new FieldId();
        this.name = name;
        this.fieldType = fieldType;
    }
}
