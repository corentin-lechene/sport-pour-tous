import { PlaceRepository } from "../../domain/place/place.repository";
import { PlaceId } from "../../domain/place/place-id";
import { Place } from "../../domain/place/place.model";
import { Field } from "../../domain/place/field/field.model";
import { Address } from "../../domain/place/address";
import { PlaceException } from "./exception/place.exception";
import { PlaceMessage } from "./exception/place.message";
import {FieldId} from "../../domain/place/field/field-id";
import {FieldType} from "../../domain/place/field/field-type.enum";
import {FieldException} from "./field/exception/field.exception";
import {FieldMessage} from "./field/exception/field.message";
import {IFieldService} from "./field/field.service.interface";

export class PlaceService {
    constructor(private placeRepository: PlaceRepository, private fieldService: IFieldService) {}

    async fetchAll(): Promise<Place[]> {
        try {
            return await this.placeRepository.fetchAll();
        } catch (error) {
            throw new PlaceException(PlaceMessage.ERROR_OCCURRED);
        }
    }

    async fetchById(placeId: PlaceId): Promise<Place> {
        try {
            return await this.placeRepository.fetchById(placeId);
        } catch (error) {
            throw new PlaceException(PlaceMessage.PLACE_NOT_FOUND);
        }
    }

    async create(place: Place): Promise<Place> {
        if (!place.address || !place.fields || !place.id) {
            throw new PlaceException(PlaceMessage.ALL_ATTRIBUTES_MUST_BE_FILL);
        }
        try {
            for (let i = 0; i < place.fields.length; i++) {
                let field = place.fields[i];
                if (!field.id) {
                    field = await this.fieldService.create(field.name, field.fieldType);
                } else {
                    await this.fieldService.validateFieldExists(field.id);
                }
                place.fields[i] = field;
            }
            return await this.placeRepository.create(place);
        } catch (error) {
            console.error(error);
            throw new PlaceException(PlaceMessage.ERROR_OCCURRED);
        }
    }

    async update(placeId: PlaceId, fields: Field[], address: Address): Promise<Place> {
        if (!placeId) {
            throw new PlaceException(PlaceMessage.PLACE_ID_REQUIRED);
        }
        if (!fields) {
            throw new FieldException(FieldMessage.FIELD_NOT_FOUND);
        }
        if (!address) {
            throw new PlaceException(PlaceMessage.ALL_ATTRIBUTES_MUST_BE_FILL);
        }
        const existingPlace = await this.placeRepository.fetchById(placeId);
        if (!existingPlace) {
            throw new PlaceException(PlaceMessage.PLACE_NOT_FOUND);
        }
        try {
            existingPlace.fields = fields;
            existingPlace.address = address;
            return await this.placeRepository.update(existingPlace);
        } catch (error) {
            throw new PlaceException(PlaceMessage.ERROR_OCCURRED);
        }
    }

    async deleteById(placeId: PlaceId): Promise<void> {
        try {
            await this.placeRepository.deleteById(placeId);
        } catch (error) {
            throw new PlaceException(PlaceMessage.PLACE_NOT_FOUND);
        }
    }

    async addField(placeId: PlaceId, fieldName: string, fieldType: FieldType): Promise<Field> {
        const place = await this.placeRepository.fetchById(placeId);
        if (!place) {
            throw new PlaceException(PlaceMessage.PLACE_NOT_FOUND);
        }
        if (place.fields.some(f => f.name === fieldName)) {
            throw new FieldException(FieldMessage.FIELD_ALREADY_EXISTS);
        }
        const newField = await this.fieldService.create(fieldName, fieldType);
        place.fields.push(newField);
        await this.placeRepository.update(place);

        return newField;
    }

    async removeField(placeId: PlaceId, fieldId: FieldId): Promise<void> {
        const place = await this.placeRepository.fetchById(placeId);
        if (!place) {
            throw new PlaceException(PlaceMessage.PLACE_NOT_FOUND);
        }
        const fieldIndex = place.fields.findIndex(f => f.id.value === fieldId.value);
        if (fieldIndex === -1) {
            throw new FieldException(FieldMessage.FIELD_NOT_FOUND);
        }
        await this.fieldService.deleteById(fieldId);
        place.fields.splice(fieldIndex, 1);
        await this.placeRepository.update(place);
    }
}
