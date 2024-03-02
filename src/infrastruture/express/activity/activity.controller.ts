import {RequestHandler} from "express";
import {CreateActivityDto} from "./create-activity.dto";
import {EquipmentTypeId} from "../../../domain/equipment/equipmentType/equipment-type.model";
import {ActivityId} from "../../../domain/activity/activity.model";
import {ActivityService} from "../../../application/activity/activity.service";


export class ActivityController {
    constructor(private readonly activityService: ActivityService) {
        this.activityService = activityService;
    }

    async getAll(): Promise<RequestHandler> {
        return async (_, res) => {
            const activities = await this.activityService.getAll();
            res.send(activities);
        }
    }

    async getById(): Promise<RequestHandler> {
        return async (req, res) => {
            const activityId = req.params.activityId as string;
            if (!activityId?.trim()) return res.status(400).end();

            try {
                const activity = await this.activityService.getById(new ActivityId(activityId.trim()));
                res.send(activity);
            } catch (e) {
                res.status(404).send();
            }
        }
    }

    async create(): Promise<RequestHandler> {
        return async (req, res) => {
            const name = req.body.name as string;
            const description = req.body.description as string;
            const equipmentTypeIds = req.body.equipmentTypeIds as string[];

            if(!name?.trim() || !description?.trim()) return res.status(400).end();

            const createActivityDto = new CreateActivityDto(
                name.trim(),
                description.trim(),
                equipmentTypeIds.map(id => new EquipmentTypeId(id.trim()))
            );

            try {
                const activity = await this.activityService.create(createActivityDto.name, createActivityDto.description, createActivityDto.equipmentTypeIds);
                res.status(201).send(activity);
            } catch (e) {
                res.status(400).send(e);
            }
        }
    }

    async delete(): Promise<RequestHandler> {
        return async (req, res) => {
            const activityId = req.params.activityId as string;
            if (!activityId?.trim()) return res.status(400).end();

            try {
                await this.activityService.delete(new ActivityId(activityId.trim()));
                res.status(204).end();
            } catch (e) {
                res.status(404).send();
            }
        }
    }
}