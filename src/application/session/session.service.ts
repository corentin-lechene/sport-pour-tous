import {ISessionService} from "./session.service.interface";
import {SessionId, Session} from "../../domain/session/session.model";
import {User} from "../../domain/client/user/user.model";

export class SessionService implements ISessionService{
    getById(sessionId: SessionId): Promise<Session> {
        throw new Error("not implemented");
    }

    addUser(sessionId: SessionId, user: User): Promise<void> {
        throw new Error("not implemented");
    }
    // getAll(): void
    // getById(sessionId)
    // create(activityId, startAt, endAt)
    // delete(sessionId)
    // updateActivity(sessionId, activityId)
    // updatePlace(sessionId, placeId)
    // updateHours(sessionId, startAt, endAt)
}