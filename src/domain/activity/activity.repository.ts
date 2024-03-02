import {Activity, ActivityId} from "./activity.model";
import {EquipmentType, EquipmentTypeId} from "../equipment/equipmentType/equipment-type.model";

export interface ActivityRepository {
    getAll(): Promise<Activity[]>;
    getById(activityId: ActivityId): Promise<Activity>;
    create(activity: Activity): Promise<Activity>;
    delete(activityId: ActivityId): Promise<void>;
}