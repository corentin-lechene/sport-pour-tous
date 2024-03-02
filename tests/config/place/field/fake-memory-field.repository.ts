import {Field} from "../../../../src/domain/place/field/field.model";
import {FieldRepository} from "../../../../src/domain/place/field/field.repository";
import {FieldId} from "../../../../src/domain/place/field/field-id";
import {FieldException} from "../../../../src/application/place/field/exception/field.exception";
import {FieldMessage} from "../../../../src/application/place/field/exception/field.message";

const _fields: Field[] = []

export class FakeMemoryFieldRepository implements FieldRepository {
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
        return Promise.resolve();
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