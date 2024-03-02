import {beforeEach, describe, it} from "@jest/globals";
import {Place} from "../../../src/domain/place/place.model";
import {Session} from "../../../src/domain/session/session.model";
import {SessionService} from "../../../src/application/session/session.service";
import {FakeMemorySessionRepository} from "../../config/session/fake-memory-session.repository";
import {Address} from "../../../src/domain/place/address";
import {Field} from "../../../src/domain/place/field/field.model";
import {FieldType} from "../../../src/domain/place/field/field-type.enum";
import {SessionMessage} from "../../../src/application/session/exception/session-message";
import {SessionException} from "../../../src/application/session/exception/session.exception";
import dayjs from "../../../config/dayjs.config";
import {FormatDayjs} from "../../../config/dayjs.config";

describe('SessionService', () => {
    let sessionService: SessionService;

    beforeEach(() => {
        const fakeRepository = new FakeMemorySessionRepository();
        sessionService = new SessionService(fakeRepository);
    });

    describe('create', () => {
        it('should successfully create a session', async () => {
            const fields = [new Field("Soccer Field", FieldType.FOOTBALL_OUTDOOR)];
            const address = new Address("123 Main St", "City", "State", "12345");
            const place = new Place(fields, address);
            const startAt = dayjs('2022-01-01 10:00:00', FormatDayjs.FORMAT_DATE_HOUR).toDate();
            const endAt = dayjs('2022-01-01 11:00:00', FormatDayjs.FORMAT_DATE_HOUR).toDate();
            const maxParticipants = 10;
            const name = "session 1";
            const price = 50;

            const newSession = new Session(name, price, place, maxParticipants, startAt, endAt);

            const createdSession = await sessionService.create(newSession.name, newSession.price, newSession.maxParticipant, newSession.startAt, newSession.endAt, newSession.place);

            expect(createdSession).toBeDefined();
        });
    });

    describe('fetchAll', () => {
        it('should fetch all sessions', async () => {
            const fields = [new Field("Soccer Field", FieldType.FOOTBALL_OUTDOOR)];
            const address = new Address("123 Main St", "City", "State", "12345");
            const place = new Place(fields, address);
            const startAt = dayjs('2022-01-01 10:00:00', FormatDayjs.FORMAT_DATE_HOUR).toDate();
            const endAt = dayjs('2022-01-01 11:00:00', FormatDayjs.FORMAT_DATE_HOUR).toDate();
            const maxParticipants = 10;
            const name = "session 1";
            const price = 50;

            const session1 = new Session(name, price, place, maxParticipants, startAt, endAt);

            const fields2 = [new Field("Soccer Field", FieldType.FOOTBALL_OUTDOOR)];
            const address2 = new Address("123 Main St", "City", "State", "12345");
            const place2 = new Place(fields2, address2);
            const startAt2 = dayjs('2022-01-01 10:00:00', FormatDayjs.FORMAT_DATE_HOUR).toDate();
            const endAt2 = dayjs('2022-01-01 11:00:00', FormatDayjs.FORMAT_DATE_HOUR).toDate();
            const maxParticipants2 = 10;
            const name2 = "session 1";
            const price2 = 50;

            const session2 = new Session(name2, price2, place2, maxParticipants2, startAt2, endAt2);

            await sessionService.create(session1.name, session1.price, session1.maxParticipant, session1.startAt, session1.endAt, session1.place);
            await sessionService.create(session2.name, session2.price, session2.maxParticipant, session2.startAt, session2.endAt, session2.place);

            const sessions = await sessionService.fetchAll();

            expect(sessions.length).toBeGreaterThanOrEqual(2);
        });
    });

    describe('fetchById', () => {
        it('should fetch a session by its ID', async () => {
            const fields = [new Field("Soccer Field", FieldType.FOOTBALL_OUTDOOR)];
            const address = new Address("123 Main St", "City", "State", "12345");
            const place = new Place(fields, address);
            const startAt = dayjs('2022-01-01 10:00:00', FormatDayjs.FORMAT_DATE_HOUR).toDate();
            const endAt = dayjs('2022-01-01 11:00:00', FormatDayjs.FORMAT_DATE_HOUR).toDate();
            const maxParticipants = 10;
            const name = "session 1";
            const price = 50;

            const newSession = new Session(name, price, place, maxParticipants, startAt, endAt);

            const createdSession = await sessionService.create(newSession.name, newSession.price, newSession.maxParticipant, newSession.startAt, newSession.endAt, newSession.place);
            const fetchedSession = await sessionService.fetchById(createdSession.id);

            expect(fetchedSession).toBeDefined();
            expect(fetchedSession.id).toEqual(createdSession.id);
        });
    });

    describe('updatePlace', () => {
        it('should update the place of a session', async () => {
            const fields = [new Field("Soccer Field", FieldType.FOOTBALL_OUTDOOR)];
            const address = new Address("123 Main St", "City", "State", "12345");
            const place = new Place(fields, address);
            const startAt = dayjs('2022-01-01 10:00:00', FormatDayjs.FORMAT_DATE_HOUR).toDate();
            const endAt = dayjs('2022-01-01 11:00:00', FormatDayjs.FORMAT_DATE_HOUR).toDate();
            const maxParticipants = 10;
            const name = "session 1";
            const price = 50;

            const newSession = new Session(name, price, place, maxParticipants, startAt, endAt);

            const createdSession = await sessionService.create(newSession.name, newSession.price, newSession.maxParticipant, newSession.startAt, newSession.endAt, newSession.place);
            const newFields = [new Field("Bernabeu", FieldType.FOOTBALL_INDOOR)];
            const newAddress = new Address("789 Main St", "City", "State", "12345");
            const newPlace = new Place(newFields, newAddress);
            const updatedSession = await sessionService.updatePlace(createdSession.id, newPlace);

            expect(updatedSession.place.address.street).toEqual("789 Main St");
        });
    });

    describe('updateHours', () => {
        it('should update the start and end times of a session', async () => {
            const fields = [new Field("Soccer Field", FieldType.FOOTBALL_OUTDOOR)];
            const address = new Address("123 Main St", "City", "State", "12345");
            const place = new Place(fields, address);
            const startAt = dayjs('2022-01-01 10:00:00', FormatDayjs.FORMAT_DATE_HOUR).toDate();
            const endAt = dayjs('2022-01-01 11:00:00', FormatDayjs.FORMAT_DATE_HOUR).toDate();
            const maxParticipants = 10;
            const name = "session 1";
            const price = 50;

            const newSession = new Session(name, price, place, maxParticipants, startAt, endAt);

            const createdSession = await sessionService.create(newSession.name, newSession.price, newSession.maxParticipant, newSession.startAt, newSession.endAt, newSession.place);
            const updatedStartAt = new Date("2022-01-01T10:00:00Z");
            const updatedEndAt = new Date("2022-01-01T11:00:00Z");

            let sessionToUpdate = await sessionService.fetchById(createdSession.id);

            sessionToUpdate.startAt = updatedStartAt;
            sessionToUpdate.endAt = updatedEndAt;

            const updatedSession = await sessionService.updateHours(sessionToUpdate);

            expect(updatedSession.startAt).toEqual(updatedStartAt);
            expect(updatedSession.endAt).toEqual(updatedEndAt);
        });
    });


    describe('deleteById', () => {
        it('should delete a session by its ID', async () => {
            const fields = [new Field("Soccer Fi    eld", FieldType.FOOTBALL_OUTDOOR)];
            const address = new Address("123 Main St", "City", "State", "12345");
            const place = new Place(fields, address);
            const startAt = dayjs('2022-01-01 10:00:00', FormatDayjs.FORMAT_DATE_HOUR).toDate();
            const endAt = dayjs('2022-01-01 11:00:00', FormatDayjs.FORMAT_DATE_HOUR).toDate();
            const maxParticipants = 10;
            const name = "session 1";
            const price = 50;

            const newSession = new Session(name, price, place, maxParticipants, startAt, endAt);

            const createdSession = await sessionService.create(newSession.name, newSession.price, newSession.maxParticipant, newSession.startAt, newSession.endAt, newSession.place);

            await sessionService.deleteById(createdSession.id);
            await expect(sessionService.fetchById(createdSession.id))
                .rejects
                .toThrowError(new SessionException(SessionMessage.SESSION_NOT_FOUND));
        });
    });
});