import * as express from 'express';
import {ActivityController} from "./activity.controller";
import {activityService} from "../../../application.configuration";

export class ActivityRoute {
    static async getRoutes() {
        const router = express.Router();
        const activityController = new ActivityController(activityService);

        router.get('/activities', await activityController.getAll());
        router.get('/activities/:activityId', await activityController.getById());
        router.post('/activities', await activityController.create());
        router.delete('/activities/:activityId', await activityController.delete());
        return router;
    }
}