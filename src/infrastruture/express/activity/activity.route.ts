import * as express from 'express';
import {ActivityController} from "./activity.controller";
import {ActivityService} from "../../../application/activity/activity.service";
import {InMemoryActivityRepository} from "../../in-memory-repository/in-memory-activity.repository";
import {InMemoryEquipmentTypeRepository} from "../../in-memory-repository/in-memory-equipment-type.repository";

export class ActivityRoute {
    static async getRoutes() {
        const router = express.Router();
        const activityController = new ActivityController(new ActivityService(
            new InMemoryActivityRepository(),
            new InMemoryEquipmentTypeRepository()
        ));

        router.get('/activities', await activityController.getAll());
        router.get('/activities/:activityId', await activityController.getById());
        router.post('/activities', await activityController.create());
        router.delete('/activities/:activityId', await activityController.delete());
        return router;
    }
}