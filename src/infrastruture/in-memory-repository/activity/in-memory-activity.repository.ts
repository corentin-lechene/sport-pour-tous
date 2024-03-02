import {ActivityRepository} from "../../../domain/activity/activity.repository";
import {Activity, ActivityId} from "../../../domain/activity/activity.model";
import {ActivityRepositoryException, ActivityRepositoryExceptionMessage} from "./activity.repository-exception";
import {EquipmentType, EquipmentTypeId} from "../../../domain/equipment/equipmentType/equipment-type.model";
import {_equipmentTypes} from "../equipment/equipmentType/in-memory-equipment-type.repository";

export const _activities: Activity[] = [];

export class InMemoryActivityRepository implements ActivityRepository {
    async create(activity: Activity): Promise<Activity> {
        _activities.push(activity);
        return activity;
    }

    async delete(activityId: ActivityId): Promise<void> {
        const index = _activities.findIndex(activity => activity.id.value === activityId.value);
        if (index === -1) {
            throw new ActivityRepositoryException(ActivityRepositoryExceptionMessage.ACTIVITY_NOT_FOUND);
        }
        _activities[index].deletedAt = new Date();
    }

    async getAll(): Promise<Activity[]> {
        return _activities.filter(_activity => !_activity.deletedAt);
    }

    async getById(activityId: ActivityId): Promise<Activity> {
        const index = _activities.findIndex(activity => activity.id.value === activityId.value);
        if (index === -1) {
            throw new ActivityRepositoryException(ActivityRepositoryExceptionMessage.ACTIVITY_NOT_FOUND);
        }
        return _activities[index];
    }

    async getEquipmentTypesByIds(equipmentTypeIds: EquipmentTypeId[]): Promise<EquipmentType[]> {
        return _equipmentTypes
            .filter(equipmentType => !equipmentType.deletedAt)
            .filter(equipmentType => equipmentTypeIds
                .some(equipmentTypeId => equipmentTypeId.value === equipmentType.id.value)
            );
    }
}