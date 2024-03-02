import * as express from "express";
import { SessionController } from "./session.controller";
import { SessionService } from "../../../application/session/session.service";
import { InMemorySessionRepository } from "../../in-memory-repository/in-memory-session.repository";
import {InMemoryActivityRepository} from "../../in-memory-repository/activity/in-memory-activity.repository";
import {ActivityService} from "../../../application/activity/activity.service";
import {EquipmentTypeService} from "../../../application/equipment/equipmentType/equipment-type.service";
import {
    InMemoryEquipmentTypeRepository
} from "../../in-memory-repository/equipment/equipmentType/in-memory-equipment-type.repository";

export class SessionRoute {
    static getRoutes() {
        const router = express.Router();
        const sessionRepository = new InMemorySessionRepository();
        const activityService = new ActivityService(
            new InMemoryActivityRepository(),
            new EquipmentTypeService(new InMemoryEquipmentTypeRepository()))
        const sessionService = new SessionService(sessionRepository, activityService);
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
