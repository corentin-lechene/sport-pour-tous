import {SessionId, Session} from "../../domain/session/session.model";
import {User, UserId} from "../../domain/client/user/user.model";

export interface ISessionService {
    getById(sessionId: SessionId): Promise<Session>;
    addUser(sessionId: SessionId, user: User): Promise<void>;
    deleteUser(sessionId: SessionId, userId: UserId): Promise<void>;
}