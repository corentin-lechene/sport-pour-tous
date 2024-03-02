import {SessionId} from "./session-id";
import {Session} from "./session.model";
import {Place} from "../place/place.model";
import {ActivityId} from "../activity/activity.model";

export interface SessionRepository {
    fetchAll(): Promise<Session[]>
    fetchById(id: SessionId): Promise<Session>
    create(session: Session): Promise<Session>
    fetchByActivityId(activityId: ActivityId): Promise<Session>
    updatePlace(sessionId: SessionId, newPlace: Place): Promise<Session>
    updateHours(session: Session): Promise<Session>
    deleteById(id: SessionId): Promise<void>
}