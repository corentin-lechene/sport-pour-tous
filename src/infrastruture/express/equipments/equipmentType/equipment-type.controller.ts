import {EquipmentTypeService} from "../../../../application/equipment/equipmentType/equipment-type.service";
import {RequestHandler} from "express";
import {EquipmentTypeId} from "../../../../domain/equipment/equipmentType/equipment-type.model";
import {CreateEquipmentTypeDto} from "./create-equipment-type.dto";
import {
    EquipmentTypeException
} from "../../../../application/equipment/equipmentType/exception/equipment-type.exception";
import {
    EquipmentTypeMessageError
} from "../../../../application/equipment/equipmentType/exception/equipment-type.message-error";

export class EquipmentTypeController {
    constructor(private readonly equipmentTypeService: EquipmentTypeService) {
        this.equipmentTypeService = equipmentTypeService;
    }

    async getAll(): Promise<RequestHandler> {
        return async (_, res) => {
            const equipmentTypes = await this.equipmentTypeService.getAll();
            res.send(equipmentTypes);
        }
    }

    async getById(): Promise<RequestHandler> {
        return async (req, res) => {
            const equipmentTypeId = req.params.equipmentTypeId as string;
            if(!equipmentTypeId) return res.status(400).end();

            try {
                const equipmentType = await this.equipmentTypeService.getById(new EquipmentTypeId(equipmentTypeId));
                res.send(equipmentType);
            } catch(e) {
                // console.error(e);
                res.status(404).send();
            }
        }
    }

    async create(): Promise<RequestHandler> {
        return async (req, res) => {
            console.log(req.body);
            const name = req.body.name as string;
            if(!name?.trim()) return res.status(400).end();

            const createEquipmentTypeDto = new CreateEquipmentTypeDto(name.trim());

            try {
                const equipmentType = await this.equipmentTypeService.create(createEquipmentTypeDto.name);
                res.status(201).send(equipmentType);
            } catch(e) {
                console.log("e: ", e);
                res.status(400).send(e);
            }
        }
    }

    async update(): Promise<RequestHandler> {
        return async (_, res) => {
            console.log("not implemented");
            res.status(501).end();
        }
    }

    async delete(): Promise<RequestHandler> {
        return async (req, res) => {
            const equipmentTypeId = req.params.equipmentTypeId as string;
            if(!equipmentTypeId) return res.status(400).end();

            try {
                await this.equipmentTypeService.delete(new EquipmentTypeId(equipmentTypeId));
                res.status(204).end();
            } catch(e) {
                console.error(e);
                res.status(404).end();
            }
        }
    }
}