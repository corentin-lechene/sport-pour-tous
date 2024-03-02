import {Session} from "../../../domain/session/session.model";
import {SessionRepository} from "../../../domain/session/session.repository";
import {SessionId} from "../../../domain/session/session-id";
import {Place} from "../../../domain/place/place.model";
import {Activity, ActivityId} from "../../../domain/activity/activity.model";
import {SessionExceptionRepository, SessionMessageExceptionRepository} from "./session.exception.repository";
import {EquipmentType} from "../../../domain/equipment/equipmentType/equipment-type.model";
import {Field} from "../../../domain/place/field/field.model";
import {FieldType} from "../../../domain/place/field/field-type.enum";
import {Address} from "../../../domain/place/address";
import {User, UserId} from "../../../domain/client/user/user.model";

const _sessions: Session[] = [];

export class InMemorySessionRepository implements SessionRepository {
    constructor() {
        const equipmentType = new EquipmentType("toto");
        const activity = new Activity("tennis", "description", [equipmentType])
        const field = new Field("terrain 1", FieldType.BASKETBALL_INDOOR);
        const address = new Address("toto", "toto", "toto", "toto");
        const place = new Place([field], address)
        const session = new Session("séance 1", 10, place, 10, new Date(), new Date(), activity, []);

        _sessions.push(session);
    }
    async fetchAll(): Promise<Session[]> {
        return _sessions.filter(session => !session.deletedAt);
    }

    async fetchById(id: SessionId): Promise<Session> {
        const session = _sessions.find(session => session.id.value === id.value);
        if (!session) {
            throw new SessionExceptionRepository(SessionMessageExceptionRepository.SESSION_NOT_FOUND);
        }
        return session;
    }

    async create(session: Session): Promise<Session> {
        const existingSessionIndex = _sessions.findIndex(existingSession => existingSession.id.value === session.id.value);
        if (existingSessionIndex !== -1) {
            throw new SessionExceptionRepository(SessionMessageExceptionRepository.SESSION_ALREADY_EXISTS);
        }

        _sessions.push(session);
        return session;
    }

    async updatePlace(sessionId: SessionId, newPlace: Place): Promise<Session> {
        const sessionIndex = _sessions.findIndex(session => session.id.value === sessionId.value);
        if (sessionIndex === -1) {
            throw new SessionExceptionRepository(SessionMessageExceptionRepository.SESSION_NOT_FOUND);
        }

        _sessions[sessionIndex].place = newPlace;
        return _sessions[sessionIndex];
    }

    async updateHours(session: Session): Promise<Session> {
        const sessionIndex = _sessions.findIndex(existingSession => existingSession.id.value === session.id.value);
        if (sessionIndex === -1) {
            throw new SessionExceptionRepository(SessionMessageExceptionRepository.SESSION_NOT_FOUND);
        }

        _sessions[sessionIndex].startAt = session.startAt;
        _sessions[sessionIndex].endAt = session.endAt;
        return _sessions[sessionIndex];
    }

    async deleteById(id: SessionId): Promise<void> {
        const sessionIndex = _sessions.findIndex(session => session.id.value === id.value);
        if (sessionIndex === -1) {
            throw new SessionExceptionRepository(SessionMessageExceptionRepository.SESSION_NOT_FOUND);
        }
        _sessions.splice(sessionIndex, 1);
    }

    async fetchByActivityId(activityId: ActivityId): Promise<Session> {
        const session = _sessions.find(session => session.activity.id.value === activityId.value);
        if (!session) {
            throw new SessionExceptionRepository(SessionMessageExceptionRepository.SESSION_NOT_FOUND);
        }
        return session;
    }

    async addUser(sessionId: SessionId, user: User) {
        const session = _sessions.find(session => session.id.value === sessionId.value);
        if (!session) {
            throw new SessionExceptionRepository(SessionMessageExceptionRepository.SESSION_NOT_FOUND);
        }

         session.users.push(user);
    }

    async deleteUser(sessionId: SessionId, userId: UserId) {
        const session = _sessions.find(session => session.id.value === sessionId.value);
        if (!session) {
            throw new SessionExceptionRepository(SessionMessageExceptionRepository.SESSION_NOT_FOUND);
        }

        const user = session.users.find(user => user.id.value === userId.value);
        if(!user) {
            throw new SessionExceptionRepository(SessionMessageExceptionRepository.USER_NOT_FOUND);
        }

        session.users = session.users.filter(user => user.id.value !== userId.value);


    }

}
