import {EquipmentService} from "../../../application/equipment/equipment.service";
import {CreateEquipmentDto} from "./create-equipment.dto";
import {EquipmentTypeId} from "../../../domain/equipment/equipmentType/equipment-type.model";
import {EquipmentId} from "../../../domain/equipment/equipment.model";
import {RequestHandler} from "express";

export class EquipmentController {
    constructor(private readonly equipmentService: EquipmentService) {
        this.equipmentService = equipmentService;
    }

    async getAll(): Promise<RequestHandler> {
        return async (_, res) => {
            const equipments = await this.equipmentService.getAll();
            res.send(equipments);
        }
    }

    async getById(): Promise<RequestHandler> {
        return async (req, res) => {
            const equipmentId = req.params.equipmentId as string;
            if (!equipmentId?.trim()) return res.status(400).end();

            try {
                const equipment = await this.equipmentService.getById(new EquipmentId(equipmentId.trim()));
                res.send(equipment);
            } catch (e) {
                res.status(404).send();
            }
        }
    }

    async create(): Promise<RequestHandler> {
        return async (req, res) => {
            const name = req.body.name as string;
            const quantity = req.body.quantity as number;
            const equipmentTypeId = req.body.equipmentTypeId as string;

            if (!name?.trim() || !quantity || !equipmentTypeId?.trim()) return res.status(400).end();

            const createEquipmentDto = new CreateEquipmentDto(name.trim(), quantity, new EquipmentTypeId(equipmentTypeId.trim()));

            try {
                const equipment = await this.equipmentService.create(createEquipmentDto.name, createEquipmentDto.quantity, createEquipmentDto.equipmentTypeId);
                res.status(201).send(equipment);
            } catch (e) {
                console.log(e)
                res.status(400).send(e);
            }
        }
    }

    async delete(): Promise<RequestHandler> {
        return async (req, res) => {
            const equipmentId = req.params.equipmentId as string;
            if (!equipmentId?.trim()) return res.status(400).end();

            try {
                await this.equipmentService.delete(new EquipmentId(equipmentId.trim()));
                res.status(204).end();
            } catch (e) {
                res.status(404).send();
            }
        }
    }
}