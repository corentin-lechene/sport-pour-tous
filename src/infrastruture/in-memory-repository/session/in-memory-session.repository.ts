import {Session} from "../../../domain/session/session.model";
import {SessionRepository} from "../../../domain/session/session.repository";
import {SessionId} from "../../../domain/session/session-id";
import {Place} from "../../../domain/place/place.model";
import {ActivityId} from "../../../domain/activity/activity.model";
import {SessionExceptionRepository, SessionMessageExceptionRepository} from "./session.exception.repository";


const _sessions: Session[] = [];

export class InMemorySessionRepository implements SessionRepository {
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

}
