import { beforeEach, describe, it, expect } from "@jest/globals";
import {PlaceService} from "../../../src/application/place/place.service";
import {Place} from "../../../src/domain/place/place.model";
import {Field} from "../../../src/domain/place/field/field.model";
import {FieldType} from "../../../src/domain/place/field/field-type.enum";
import {Address} from "../../../src/domain/place/address";
import {PlaceException} from "../../../src/application/place/exception/place.exception";
import {PlaceMessage} from "../../../src/application/place/exception/place.message";
import {FakeMemoryPlaceRepository} from "../../config/place/fake-memory-place.repository";
import exp = require("constants");
import {FieldService} from "../../../src/application/place/field/field.service";
import {FakeMemoryFieldRepository} from "../../config/place/field/fake-memory-field.repository";

describe('PlaceService', () => {
    let placeService: PlaceService;
    let fieldService: FieldService;
    beforeEach(() => {
        const fakePlaceRepository = new FakeMemoryPlaceRepository();
        const fakeFieldRepository = new FakeMemoryFieldRepository();
        fieldService = new FieldService(fakeFieldRepository);
        placeService = new PlaceService(fakePlaceRepository, fieldService);
    });

    describe('create', () => {
        it('should successfully create a place', async () => {
            const fields = [new Field("Soccer Field", FieldType.FOOTBALL_OUTDOOR)];
            const newPlace = new Place(fields, new Address("123 Main St", "City", "State", "12345"));

            const createdPlace = await placeService.create(newPlace);

            expect(createdPlace).toBeDefined();
            expect(createdPlace.address.street).toEqual("123 Main St");
            expect(createdPlace.fields[0].name).toEqual("Soccer Field");
        });
    });


    describe('fetchAll', () => {
        it('should fetch all places', async () => {
            const fieldsForPlace1 = [new Field("Field 1", FieldType.FOOTBALL_OUTDOOR)];
            const address1 = new Address("123 Main St", "City A", "State A", "12345");
            const place1 = new Place(fieldsForPlace1, address1);

            const fieldsForPlace2 = [new Field("Field 2", FieldType.TENNIS_OUTDOOR)];
            const address2 = new Address("456 Main St", "City B", "State B", "67890");
            const place2 = new Place(fieldsForPlace2, address2);

            await placeService.create(place1);
            await placeService.create(place2);

            const places = await placeService.fetchAll();

            expect(places.length).toBeGreaterThanOrEqual(2);
        });
    });


    describe('fetchById', () => {
        it('should fetch a place by its ID', async () => {
            const fieldsForPlace1 = [new Field("Field 1", FieldType.FOOTBALL_OUTDOOR)];
            const address1 = new Address("123 Main St", "City A", "State A", "12345");
            const place1 = new Place(fieldsForPlace1, address1);

            await placeService.create(place1);
            const fetchedPlace = await placeService.fetchById(place1.id);

            expect(fetchedPlace).toBeDefined();
            expect(fetchedPlace.id).toEqual(place1.id);
        });
    });

    describe('fetchFieldsByAddress', ()  => {
        it('should fetch fields by its Address', async () => {
            const fieldsForPlace1 = new Field("Field 1", FieldType.FOOTBALL_OUTDOOR);
            const address1 = new Address("123 Main St", "City A", "State A", "12345");
            const place1 = new Place([fieldsForPlace1], address1);

            await placeService.create(place1);
            const fetchedField = await placeService.fetchFieldsByAddress(fieldsForPlace1.id, address1)

            expect(fetchedField).toBeDefined();
            expect(fetchedField.length).toBeGreaterThan(0);
        });
    });

    describe('delete', () => {
        it('should delete a field by its ID', async () => {
            const fieldsForPlace1 = [new Field("Field 1", FieldType.FOOTBALL_OUTDOOR)];
            const address1 = new Address("123 Main St", "City A", "State A", "12345");
            const place1 = new Place(fieldsForPlace1, address1);

            await placeService.create(place1);
            await placeService.deleteById(place1.id);

            await expect(placeService.fetchById(place1.id))
                .rejects
                .toThrowError(new PlaceException(PlaceMessage.PLACE_NOT_FOUND));
        });
    });

    describe('update', () => {
        it('should update a place with a new address and field', async () => {
            const fieldsForPlace1 = [new Field("Field 1", FieldType.FOOTBALL_OUTDOOR)];
            const address1 = new Address("123 Main St", "City A", "State A", "12345");
            const initialPlace = new Place(fieldsForPlace1, address1);

            const createdPlace = await placeService.create(initialPlace);

            const updatedStreet = "151 Main St";
            const updatedAddress = new Address(updatedStreet, address1.city, address1.state, address1.postalCode);
            const updatedField = [new Field("Field 2", FieldType.FOOTBALL_OUTDOOR)];

            const updatedPlace = await placeService.update(createdPlace.id, updatedField, updatedAddress);

            expect(updatedPlace).toBeDefined();
            expect(updatedPlace.id).toEqual(createdPlace.id);
            expect(updatedPlace.address.street).toEqual(updatedStreet);
        });
    });

    describe('addField', () => {
        it('should add a field to a place and ensure it is accessible globally', async () => {
            const address = new Address("100 Main St", "Metropolis", "NY", "10001");
            const place = new Place([], address);
            const createdPlace = await placeService.create(place);

            const fieldName = "New Field";
            const fieldType = FieldType.FOOTBALL_OUTDOOR;
            const addedField = await placeService.addField(createdPlace.id, fieldName, fieldType);

            const updatedPlace = await placeService.fetchById(createdPlace.id);
            expect(updatedPlace.fields.length).toBe(1);
            expect(updatedPlace.fields.find(f => f.id === addedField.id)).toBeDefined();
            expect(updatedPlace.fields[0].name).toEqual(fieldName);

            const fetchedField = await fieldService.fetchById(addedField.id);
            expect(fetchedField).toBeDefined();
            expect(fetchedField.name).toEqual(fieldName);
        });
    });


    describe('removeField', () => {
        it('should remove a field from a place', async () => {
            const address = new Address("101 Main St", "Gotham", "NY", "10002");
            const place = new Place([], address);
            const createdPlace = await placeService.create(place);

            const fieldName = "Existing Field";
            const fieldType = FieldType.TENNIS_OUTDOOR;
            const addedField = await placeService.addField(createdPlace.id, fieldName, fieldType);

            await placeService.removeField(createdPlace.id, addedField.id);

            const updatedPlace = await placeService.fetchById(createdPlace.id);
            expect(updatedPlace.fields.length).toBe(0);
        });
    });

});
