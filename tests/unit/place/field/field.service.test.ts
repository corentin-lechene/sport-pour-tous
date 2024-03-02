import {beforeEach, describe, it} from "@jest/globals";
import {FieldService} from "../../../../src/application/place/field/field.service";
import {FakeMemoryFieldRepository} from "../../../config/place/field/fake-memory-field.repository";
import {FieldType} from "../../../../src/domain/place/field/field-type.enum";
import {FieldMessage} from "../../../../src/application/place/field/exception/field.message";
import {FieldException} from "../../../../src/application/place/field/exception/field.exception";

describe('FieldService', function () {
    let fieldService: FieldService;

    beforeEach(() => {
        const fakeRepository = new FakeMemoryFieldRepository();
        fieldService = new FieldService(fakeRepository);
    });

    describe('create with uniqueness constraint', () => {
        it('should throw an error when trying to add a field with a name that already exists', async () => {
            const fieldName = "Test Field";
            const fieldType = FieldType.FOOTBALL_OUTDOOR;

            await fieldService.create(fieldName, fieldType);

            await expect(fieldService.create(fieldName, fieldType))
                .rejects
                .toThrowError(new FieldException(FieldMessage.FIELD_ALREADY_EXISTS));
        });
    });

    describe('fetchAll', () => {
        it('should fetch all fields', async () => {
            await fieldService.create("Field 1", FieldType.FOOTBALL_INDOOR);
            await fieldService.create("Field 2", FieldType.TENNIS_OUTDOOR);

            const fields = await fieldService.fetchAll();

            expect(fields.length).toBeGreaterThanOrEqual(2);
        });
    });

    describe('fetchByName', () => {
        it('should fetch fields by name', async () => {
            const fieldName = "Unique Field";
            await fieldService.create(fieldName, FieldType.FOOTBALL_INDOOR);

            const fields = await fieldService.fetchByName(fieldName);

            expect(fields).toBeDefined();
            expect(fields.length).toBe(1);
            expect(fields[0].name).toEqual(fieldName);
        });

        it('should return an empty array when no fields are found with the given name', async () => {
            const fieldName = "Nonexistent Field";

            const fields = await fieldService.fetchByName(fieldName);
            expect(fields).toEqual([]);
        });
    });


    describe('fetchById', () => {
        it('should fetch a field by its ID', async () => {
            const newField = await fieldService.create("Field 3", FieldType.RUGBY_INDOOR);
            const fetchedField = await fieldService.fetchById(newField.id);

            expect(fetchedField).toBeDefined();
            expect(fetchedField.id).toEqual(newField.id);
        });
    });

    describe('delete', () => {
        it('should delete a field by its ID', async () => {
            const newField = await fieldService.create("Field 4", FieldType.SWIMMING_POOL_OUTDOOR);
            await fieldService.deleteById(newField.id);

            await expect(fieldService.fetchById(newField.id))
                .rejects
                .toThrowError(new FieldException(FieldMessage.FIELD_NOT_FOUND));
        });
    });

    describe('update', () => {
        it('should update a field', async () => {
            const initialField = await fieldService.create("Field 5", FieldType.BASKETBALL_INDOOR);

            const updatedName = "Updated Field 5";
            const updatedType = FieldType.BASKETBALL_OUTDOOR;
            const updatedField = await fieldService.update(initialField.id, updatedName, updatedType);

            expect(updatedField).toBeDefined();
            expect(updatedField.id).toEqual(initialField.id);
            expect(updatedField.name).toEqual(updatedName);
            expect(updatedField.fieldType).toEqual(updatedType);
        });
    });


    describe('fetchByType', () => {
        it('should fetch fields by type', async () => {
            const fieldType = FieldType.BASKETBALL_INDOOR;
            await fieldService.create("Field 6", fieldType);

            const fields = await fieldService.fetchByType(fieldType);

            expect(fields).toBeDefined();
            expect(fields.some(field => field.fieldType === fieldType)).toBe(true);
        });

        it('should return no fields when no matching types', async () => {
            const fields = await fieldService.fetchByType(FieldType.NONE);
            expect(fields.length).toEqual(0);
        });
    });
});
