import {Field} from "./field.model";
import {FieldId} from "./field-id";

export interface FieldRepository {
    fetchAll(): Promise<Field[]>
    fetchById(id: FieldId): Promise<Field>
    fetchByType(type: string): Promise<Field[]>
    create(field: Field): Promise<Field>
    update(field: Field): Promise<Field>
    fetchByName(name: string): Promise<Field[]>
    deleteById(id: FieldId): Promise<void>
}