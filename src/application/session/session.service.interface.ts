import { Session} from "../../domain/session/session.model";
import {User, UserId} from "../../domain/client/user/user.model";
import {SessionId} from "../../domain/session/session-id";

export interface ISessionService {
    fetchById(sessionId: SessionId): Promise<Session>;
    addUser(sessionId: SessionId, user: User): Promise<void>;
    deleteUser(sessionId: SessionId, userId: UserId): Promise<void>;
}