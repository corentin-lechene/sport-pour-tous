import {SessionId, Session} from "../../domain/session/session.model";
import {User} from "../../domain/client/user/user.model";

export interface ISessionService {
    getById(sessionId: SessionId): Promise<Session>;
    addUser(sessionId: SessionId, user: User): Promise<void>;
}