import {Place} from "./place.model";
import {PlaceId} from "./place-id";
import {Field} from "./field/field.model";
import {FieldId} from "./field/field-id";
import {Address} from "./address";

export interface PlaceRepository {
    fetchAll(): Promise<Place[]>
    fetchById(id: PlaceId): Promise<Place>
    create(place: Place): Promise<Place>
    update(place: Place): Promise<Place>
    deleteById(id: PlaceId): Promise<void>
}