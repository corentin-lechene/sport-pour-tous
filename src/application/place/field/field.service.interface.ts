import {FieldType} from "../../../domain/place/field/field-type.enum";
import {Field} from "../../../domain/place/field/field.model";
import {FieldId} from "../../../domain/place/field/field-id";
import {PlaceId} from "../../../domain/place/place-id";

export interface IFieldService {
    create(name: string, type: FieldType): Promise<Field>
    validateFieldExists(fieldId: FieldId): Promise<void>
    deleteById(fieldId: FieldId): Promise<void>
    fetchById(fieldId: FieldId): Promise<Field>
}