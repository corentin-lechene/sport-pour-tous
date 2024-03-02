import { FieldRepository } from "../../domain/place/field/field.repository";
import { Field } from "../../domain/place/field/field.model";
import { FieldId } from "../../domain/place/field/field-id";
import {FieldType} from "../../domain/place/field/field-type.enum";
import {FieldException} from "../../application/place/field/exception/field.exception";
import {FieldMessage} from "../../application/place/field/exception/field.message";

const _fields: Field[] = [];

export class InMemoryFieldRepository implements FieldRepository {
    //init
    // constructor() {
    //     _fields.filter(field => field.id.value === "");
    //     const newField = new Field("Bernabeu", FieldType.FOOTBALL_OUTDOOR)
    //     _fields.push(newField);
    // }

    async create(field: Field): Promise<Field> {
        const index = _fields.findIndex(existingField => existingField.id.value === field.id.value);
        if (index !== -1) {
            throw new FieldException(FieldMessage.FIELD_ALREADY_EXISTS);
        }

        _fields.push(field);
        return field;
    }

    async deleteById(id: FieldId): Promise<void> {
        const index = _fields.findIndex(field => field.id.value === id.value);
        if (index === -1) {
            throw new FieldException(FieldMessage.FIELD_NOT_FOUND);
        }

        _fields.splice(index, 1);
    }

    async fetchAll(): Promise<Field[]> {
        return _fields;
    }

    async fetchById(id: FieldId): Promise<Field> {
        const field = _fields.find(field => field.id.value === id.value);
        if (!field) {
            throw new FieldException(FieldMessage.FIELD_NOT_FOUND);
        }
        return field;
    }

    async update(field: Field): Promise<Field> {
        const index = _fields.findIndex(existingField => existingField.id.value === field.id.value);
        if (index === -1) {
            throw new FieldException(FieldMessage.FIELD_NOT_FOUND);
        }

        _fields[index] = field;
        return field;
    }

    async fetchByType(type: string): Promise<Field[]> {
        return _fields.filter(field => field.fieldType === type);
    }

    async fetchByName(name: string): Promise<Field[]> {
        return _fields.filter(field => field.name === name);
    }
}
