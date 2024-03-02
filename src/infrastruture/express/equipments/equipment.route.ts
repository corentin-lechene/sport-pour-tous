import * as express from "express";
import {EquipmentController} from "./equipment.controller";
import {equipmentService} from "../../../application.configuration";

export class EquipmentRoute {
    static async getRoutes() {
        const router = express.Router();
        const equipmentController = new EquipmentController(equipmentService);

        router.get("/equipments", await equipmentController.getAll());
        router.get("/equipments/:equipmentId", await equipmentController.getById());
        router.post("/equipments", await equipmentController.create());
        router.delete("/equipments/:equipmentId", await equipmentController.delete());

        return router;
    }
}