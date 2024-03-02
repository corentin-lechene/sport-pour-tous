import {SessionExceptionRepository, SessionMessageExceptionRepository} from "./session.exception.repository";
import {Session, SessionId} from "../../../domain/session/session.model";

const _sessions: Session[] = []

export class InMemorySessionRepository /*implements InvoiceSession*/ {
    async getAll(): Promise<Session[]> {
        return _sessions.filter(session => !session.deletedAt);
    }

    async getById(sessionId: SessionId): Promise<Session> {
        const session = _sessions.find(session => session.id.value === sessionId.value);
        if(!session) throw new SessionExceptionRepository(SessionMessageExceptionRepository.SESSION_NOT_FOUND);
        return session;
    }

}