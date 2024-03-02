import * as express from "express";
import {EquipmentTypeController} from "./equipment-type.controller";
import {EquipmentTypeService} from "../../../../application/equipment/equipmentType/equipment-type.service";
import {InMemoryEquipmentTypeRepository} from "../../../in-memory-repository/equipment/equipmentType/in-memory-equipment-type.repository";


export class EquipmentTypeRoute {
    static async getRoutes() {
        const router = express.Router();
        const equipmentTypeController = new EquipmentTypeController(new EquipmentTypeService(new InMemoryEquipmentTypeRepository()));

        router.get("/equipment-types", await equipmentTypeController.getAll());
        router.get("/equipment-types/:equipmentTypeId", await equipmentTypeController.getById());
        router.post("/equipment-types", await equipmentTypeController.create());
        router.patch("/equipment-types/:equipmentTypeId", await equipmentTypeController.update());
        router.delete("/equipment-types/:equipmentTypeId", await equipmentTypeController.delete());

        return router;
    }
}