import { RequestHandler } from "express";
import { SessionService } from "../../../application/session/session.service";
import { SessionId } from "../../../domain/session/session-id";
import { SessionException } from "../../../application/session/exception/session.exception";
import { SessionMessage } from "../../../application/session/exception/session-message";


export class SessionController {
    constructor(private readonly sessionService: SessionService) {}

    public fetchAll(): RequestHandler {
        return async (_, res) => {
            try {
                const sessions = await this.sessionService.fetchAll();
                res.status(200).json(sessions);
            } catch (e) {
                res.status(500).json({ message: SessionMessage.ERROR_OCCURRED });
            }
        };
    }

    public fetchById(): RequestHandler {
        return async (req, res) => {
            const sessionId = req.params.sessionId as string;
            try {
                const session = await this.sessionService.fetchById(new SessionId(sessionId));
                res.status(200).json(session);
            } catch (e) {
                if (e instanceof SessionException) {
                    res.status(404).json({ message: SessionMessage.SESSION_NOT_FOUND });
                } else {
                    res.status(500).json({ message: SessionMessage.ERROR_OCCURRED });
                }
            }
        };
    }

    public create(): RequestHandler {
        return async (req, res) => {
            const { name, price, place, startAt, endAt, maxParticipant, activity } = req.body;
            if(!name || !price || !place || !startAt || !endAt || !maxParticipant || !activity){
                throw new SessionException(SessionMessage.ALL_ATTRIBUTES_MUST_BE_FILL);
            }
            try {
                const session = await this.sessionService.create(name, price, maxParticipant, startAt, endAt, place, activity);
                res.status(201).json(session);
            } catch (e) {
                res.status(400).json({ message: SessionMessage.ERROR_OCCURRED });
            }
        };
    }

    public updatePlace(): RequestHandler {
        return async (req, res) => {
            const sessionId = req.params.sessionId as string;
            const { newPlace } = req.body;
            try {
                const updatedSession = await this.sessionService.updatePlace(new SessionId(sessionId), newPlace);
                res.status(200).json(updatedSession);
            } catch (e) {
                res.status(500).json({ message: SessionMessage.ERROR_OCCURRED });
            }
        };
    }

    public updateHours(): RequestHandler {
        return async (req, res) => {
            const sessionId = req.params.sessionId as string;
            const { startAt, endAt } = req.body;
            try {
                const session = await this.sessionService.fetchById(new SessionId(sessionId));
                session.startAt = new Date(startAt);
                session.endAt = new Date(endAt);
                const updatedSession = await this.sessionService.updateHours(session);
                res.status(200).json(updatedSession);
            } catch (e) {
                res.status(500).json({ message: SessionMessage.ERROR_OCCURRED });
            }
        };
    }

    public deleteById(): RequestHandler {
        return async (req, res) => {
            const sessionId = req.params.sessionId as string;
            try {
                await this.sessionService.deleteById(new SessionId(sessionId));
                res.status(204).end();
            } catch (e) {
                res.status(404).json({ message: SessionMessage.SESSION_NOT_FOUND });
            }
        };
    }
}
