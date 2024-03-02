import {PlaceId} from "../../../src/domain/place/place-id";
import {Field} from "../../../src/domain/place/field/field.model";
import {Place} from "../../../src/domain/place/place.model";
import {FieldId} from "../../../src/domain/place/field/field-id";
import {PlaceException} from "../../../src/application/place/exception/place.exception";
import {PlaceMessage} from "../../../src/application/place/exception/place.message";
import {FieldException} from "../../../src/application/place/field/exception/field.exception";
import {FieldMessage} from "../../../src/application/place/field/exception/field.message";
import {PlaceRepository} from "../../../src/domain/place/place.repository";
import {Address} from "../../../src/domain/place/address";

const _places: Place[] = [];

export class FakeMemoryPlaceRepository implements PlaceRepository{
    async create(place: Place): Promise<Place> {
        const existingPlaceIndex = _places.findIndex(existingPlace => existingPlace.id.value === place.id.value);
        if (existingPlaceIndex !== -1) {
            throw new PlaceException(PlaceMessage.PLACE_ALREADY_EXISTS);
        }
        _places.push(place);
        return place;
    }

    async deleteById(id: PlaceId): Promise<void> {
        const placeIndex = _places.findIndex(place => place.id.value === id.value);
        if (placeIndex === -1) {
            throw new PlaceException(PlaceMessage.PLACE_NOT_FOUND);
        }
        _places.splice(placeIndex, 1);
    }

    async fetchAll(): Promise<Place[]> {
        return _places;
    }

    async fetchById(id: PlaceId): Promise<Place> {
        const place = _places.find(place => place.id.value === id.value);
        if (!place) {
            throw new PlaceException(PlaceMessage.PLACE_NOT_FOUND);
        }
        return place;
    }

    async update(place: Place): Promise<Place> {
        const placeIndex = _places.findIndex(existingPlace => existingPlace.id.value === place.id.value);
        if (placeIndex === -1) {
            throw new PlaceException(PlaceMessage.PLACE_NOT_FOUND);
        }
        _places[placeIndex] = place;
        return place;
    }

    async fetchByFieldsAddress(fieldId: FieldId, address: Address): Promise<Field[]> {
        const matchedPlaces = _places.filter(place =>
            place.address.street === address.street &&
            place.address.city === address.city &&
            place.address.state === address.state &&
            place.address.postalCode === address.postalCode
        );

        return matchedPlaces
            .map(place => place.fields)
            .flat()
            .filter(field => field.id.value === fieldId.value);
    }
}