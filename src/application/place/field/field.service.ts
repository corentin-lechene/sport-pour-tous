import {FieldRepository} from "../../../domain/place/field/field.repository";
import {Field} from "../../../domain/place/field/field.model";
import {FieldId} from "../../../domain/place/field/field-id";
import {FieldType} from "../../../domain/place/field/field-type.enum";
import {FieldException} from "./exception/field.exception";
import {FieldMessage} from "./exception/field.message";
import {IFieldService} from "./field.service.interface";

export class FieldService implements IFieldService {
    constructor(private fieldRepository: FieldRepository) {}

    async fetchAll(): Promise<Field[]> {
        try {
            return await this.fieldRepository.fetchAll();
        } catch (error) {
            if (error instanceof FieldException) {
                if(error.message === FieldMessage.FIELD_NOT_FOUND)
                    throw error;
            }
        }
        throw new FieldException(FieldMessage.ERROR_OCCURRED);
    }

    async validateFieldExists(fieldId: FieldId): Promise<void> {
        const field = await this.fieldRepository.fetchById(fieldId);
        if (!field) {
            throw new FieldException(FieldMessage.FIELD_NOT_FOUND);
        }
    }

    async fetchByType(type: FieldType): Promise<Field[]> {
        try {
            return await this.fieldRepository.fetchByType(type);
        } catch (error) {
            if (error instanceof FieldException) {
                if(error.message === FieldMessage.FIELD_NOT_FOUND)
                    throw error;
            }
        }
        throw new FieldException(FieldMessage.ERROR_OCCURRED);
    }

    async fetchByName(name: string): Promise<Field[]> {
        try {
            return await this.fieldRepository.fetchByName(name);
        } catch (error) {
            if (error instanceof FieldException) {
                if(error.message === FieldMessage.FIELD_NOT_FOUND)
                    throw error;
            }
        }
        throw new FieldException(FieldMessage.ERROR_OCCURRED);
    }

    async fetchById(fieldId: FieldId): Promise<Field> {
        try {
            return await this.fieldRepository.fetchById(fieldId);
        } catch (error) {
            if (error instanceof FieldException) {
                if(error.message === FieldMessage.FIELD_NOT_FOUND){
                    throw error;
                }
            }
        }
        throw new FieldException(FieldMessage.ERROR_OCCURRED);
    }

    async deleteById(fieldId: FieldId): Promise<void> {
        try {
            await this.fieldRepository.deleteById(fieldId);
        } catch (error) {
            if (error instanceof FieldException && error.message !== FieldMessage.FIELD_NOT_FOUND) {
                throw new FieldException(FieldMessage.FIELD_NOT_FOUND);
            }
            throw new FieldException(FieldMessage.ERROR_OCCURRED);
        }
    }

    async create(name: string, fieldType: FieldType): Promise<Field> {
        if (!name?.trim() || !fieldType) {
            throw new FieldException(FieldMessage.ALL_ATTRIBUTES_MUST_BE_FILL);
        }
        const existingFields = await this.fetchByName(name.trim());
        if (existingFields.length > 0) {
            throw new FieldException(FieldMessage.FIELD_ALREADY_EXISTS);
        }
        try {
            const newField = new Field(name, fieldType);
            return await this.fieldRepository.create(newField);
        } catch (error) {
            if (error instanceof FieldException) {
                if(error.message === FieldMessage.FIELD_ALREADY_EXISTS){
                    throw error;
                }
            }
        }
        throw new FieldException(FieldMessage.ERROR_OCCURRED);
    }

    async update(fieldId: FieldId, name: string, type: FieldType): Promise<Field> {
        if (!fieldId) {
            throw new FieldException(FieldMessage.FIELD_NOT_FOUND);
        }
        if (!name?.trim() || !type) {
            throw new FieldException(FieldMessage.ALL_ATTRIBUTES_MUST_BE_FILL);
        }
        const existingField = await this.fieldRepository.fetchById(fieldId);
        if (!existingField) {
            throw new FieldException(FieldMessage.FIELD_NOT_FOUND);
        }
        try {
            existingField.name = name;
            existingField.fieldType = type;
            return await this.fieldRepository.update(existingField);
        } catch (error) {
            if (error instanceof FieldException) {
                if(error.message === FieldMessage.FIELD_NOT_FOUND)
                    throw error;
            }
        }
        throw new FieldException(FieldMessage.ERROR_OCCURRED);
    }
}
