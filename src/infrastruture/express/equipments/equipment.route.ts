import * as express from "express";
import {EquipmentController} from "./equipment.controller";
import {EquipmentService} from "../../../application/equipment/equipment.service";
import {InMemoryEquipmentRepository} from "../../in-memory-repository/equipment/in-memory-equipment.repository";
import {InMemoryEquipmentTypeRepository} from "../../in-memory-repository/equipment/equipmentType/in-memory-equipment-type.repository";

export class EquipmentRoute {
    static async getRoutes() {
        const router = express.Router();
        const equipmentController = new EquipmentController(new EquipmentService(
            new InMemoryEquipmentRepository(),
            new InMemoryEquipmentTypeRepository()
        ));

        router.get("/equipments", await equipmentController.getAll());
        router.get("/equipments/:equipmentId", await equipmentController.getById());
        router.post("/equipments", await equipmentController.create());
        router.delete("/equipments/:equipmentId", await equipmentController.delete());

        return router;
    }
}