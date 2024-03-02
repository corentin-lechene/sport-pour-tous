import {ActivityRepository} from "../../domain/activity/activity.repository";
import {Activity, ActivityId} from "../../domain/activity/activity.model";
import {EquipmentTypeId} from "../../domain/equipment/equipmentType/equipment-type.model";
import {EquipmentTypeRepository} from "../../domain/equipment/equipmentType/equipment-type.repository";
import {ActivityException} from "./exception/activity.exception";
import {ActivityMessageError} from "./exception/activity.message-error";


export class ActivityService {
    constructor(
        private readonly activityRepository: ActivityRepository,
        private readonly equipmentTypeRepository: EquipmentTypeRepository,
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

        const equipmentTypes = await this.equipmentTypeRepository.getByIds(equipmentTypeIds);

        const newActivity = new Activity(name, description, equipmentTypes);
        return this.activityRepository.create(newActivity);
    }

    async delete(activityId: ActivityId) {
        return this.activityRepository.delete(activityId);
    }
}