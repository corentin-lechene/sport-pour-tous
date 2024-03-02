import * as express from "express";
import { SessionController } from "./session.controller";
import {sessionService} from "../../../application.configuration";

export class SessionRoute {
    static getRoutes() {
        const router = express.Router();
        const sessionController = new SessionController(sessionService);

        router.get("/sessions", sessionController.fetchAll());
        router.get("/sessions/:sessionId", sessionController.fetchById());
        router.post("/sessions", sessionController.create());
        router.patch("/sessions/:sessionId/place", sessionController.updatePlace());
        router.patch("/sessions/:sessionId/hours", sessionController.updateHours());
        router.delete("/sessions/:sessionId", sessionController.deleteById());

        return router;
    }
}
