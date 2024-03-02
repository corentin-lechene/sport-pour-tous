import {ActivityRepository} from "../../domain/activity/activity.repository";
import {Activity, ActivityId} from "../../domain/activity/activity.model";
import {EquipmentType, EquipmentTypeId} from "../../domain/equipment/equipmentType/equipment-type.model";
import {ActivityException} from "./exception/activity.exception";
import {ActivityMessageError} from "./exception/activity.message-error";
import {IEquipmentService} from "../equipment/equipment.service-repository";
import {IEquipmentTypeService} from "../equipment/equipmentType/activity.service-interface";


export class ActivityService {
    constructor(
        private readonly activityRepository: ActivityRepository,
        private readonly equipmentTypeService: IEquipmentTypeService,
    ) {
        this.activityRepository = activityRepository;
    }

    async getAll() {
        return this.activityRepository.getAll();
    }

    async getById(activityId: ActivityId) {
        return this.activityRepository.getById(activityId);
    }

    async create(name: string, description: string, equipmentTypeIds: EquipmentTypeId[] = []) {
        if(!name?.trim() || !description?.trim()) {
            throw new ActivityException(ActivityMessageError.ACTIVITY_FIELDS_ARE_REQUIRED);
        }

        let equipmentTypes: EquipmentType[] = [];
        if(equipmentTypeIds.length != 0) {
            equipmentTypes = await this.equipmentTypeService.getEquipmentTypesByIds(equipmentTypeIds);
        }

        const newActivity = new Activity(name, description, equipmentTypes);
        return this.activityRepository.create(newActivity);
    }

    async delete(activityId: ActivityId) {
        return this.activityRepository.delete(activityId);
    }
}