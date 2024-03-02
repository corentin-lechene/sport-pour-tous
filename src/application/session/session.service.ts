import { SessionRepository } from "../../domain/session/session.repository";
import { SessionId } from "../../domain/session/session-id";
import { Session } from "../../domain/session/session.model";
import { SessionException } from "./exception/session.exception";
import {SessionMessage} from "./exception/session-message";
import {Place} from "../../domain/place/place.model";
import dayjs from "../../../config/dayjs.config";
import {Activity, ActivityId} from "../../domain/activity/activity.model";
import {ActivityService} from "../activity/activity.service";

export class SessionService {
    constructor(private sessionRepository: SessionRepository, private activityService: ActivityService) {}

    async fetchAll(): Promise<Session[]> {
        try {
            return await this.sessionRepository.fetchAll();
        } catch (error) {
            throw new SessionException(SessionMessage.ERROR_OCCURRED);
        }
    }

    async fetchById(sessionId: SessionId): Promise<Session> {
        try {
            return await this.sessionRepository.fetchById(sessionId);
        } catch (error) {
            throw new SessionException(SessionMessage.SESSION_NOT_FOUND);
        }
    }

    async create(name:string, price: number, maxParticipant: number, startAt: Date, endAt: Date, place: Place, activity: Activity): Promise<Session> {
        if (!name || !price || !place || !startAt || !endAt || !maxParticipant || activity) {
            throw new SessionException(SessionMessage.ALL_ATTRIBUTES_MUST_BE_FILL);
        }

        const startAtDayjs = dayjs(startAt);
        const endAtDayjs = dayjs(endAt);
        if (startAtDayjs.isSameOrAfter(endAtDayjs)) {
            throw new SessionException(SessionMessage.INVALID_TIME_RANGE);
        }
        if (maxParticipant <= 0) {
            throw new SessionException(SessionMessage.INVALID_MAX_PARTICIPANT);
        }

        try {
            const newSession = new Session(name, price, place, maxParticipant, startAt, endAt, activity)
            return await this.sessionRepository.create(newSession);
        } catch (error) {
            throw new SessionException(SessionMessage.SESSION_ALREADY_EXISTS);
        }
    }

    async updatePlace(sessionId: SessionId, newPlace: Place): Promise<Session> {
        if (!sessionId || !newPlace) {
            throw new SessionException(SessionMessage.ALL_ATTRIBUTES_MUST_BE_FILL);
        }

        try {
            const existingSession = await this.sessionRepository.fetchById(sessionId);
            if (!existingSession) {
                throw new SessionException(SessionMessage.SESSION_NOT_FOUND);
            }
            return await this.sessionRepository.updatePlace(sessionId, newPlace);
        } catch (error) {
            throw new SessionException(SessionMessage.ERROR_OCCURRED);
        }
    }

    async updateHours(session: Session): Promise<Session> {
        if (!session || !session.id || !session.startAt || !session.endAt) {
            throw new SessionException(SessionMessage.ALL_ATTRIBUTES_MUST_BE_FILL);
        }

        const startAtDayjs = dayjs(session.startAt);
        const endAtDayjs = dayjs(session.endAt);

        if (!startAtDayjs.isBefore(endAtDayjs)) {
            throw new SessionException(SessionMessage.INVALID_TIME_RANGE);
        }

        try {
            const existingSession = await this.sessionRepository.fetchById(session.id);
            if (!existingSession) {
                throw new SessionException(SessionMessage.SESSION_NOT_FOUND);
            }

            return await this.sessionRepository.updateHours(session);
        } catch (error) {
            throw new SessionException(SessionMessage.ERROR_OCCURRED);
        }
    }

    async deleteById(sessionId: SessionId): Promise<void> {
        try {
            await this.sessionRepository.deleteById(sessionId);
        } catch (error) {
            throw new SessionException(SessionMessage.SESSION_NOT_FOUND);
        }
    }

    async fetchByActivityById(activityId: ActivityId): Promise<Session> {
        const activity = await this.activityService.getById(activityId);
        if (!activity) {
            throw new SessionException(SessionMessage.SESSION_NOT_FOUND);
        }

        try {
            return await this.sessionRepository.fetchByActivityId(activityId);
        } catch (error) {
            throw new SessionException(SessionMessage.ERROR_OCCURRED);
        }
    }
}
