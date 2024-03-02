import {PlaceRepository} from "../../domain/place/place.repository";
import {PlaceId} from "../../domain/place/place-id";
import {Place} from "../../domain/place/place.model";
import {FieldId} from "../../domain/place/field/field-id";
import {Field} from "../../domain/place/field/field.model";
import {PlaceException} from "../../application/place/exception/place.exception";
import {PlaceMessage} from "../../application/place/exception/place.message";
import {Address} from "../../domain/place/address";

const _places: Place[] = [];

export class InMemoryPlaceRepository implements PlaceRepository {

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
        console.log(`Updating place with id ${place.id.value}`);
        const placeIndex = _places.findIndex(existingPlace => existingPlace.id.value === place.id.value);
        if (placeIndex === -1) {
            throw new PlaceException(PlaceMessage.PLACE_NOT_FOUND);
        }
        _places[placeIndex] = place;
        console.log(`Place with id ${place.id.value} updated successfully.`);
        return place;
    }
}
