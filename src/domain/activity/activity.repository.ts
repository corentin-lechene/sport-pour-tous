import {Activity, ActivityId} from "./activity.model";

export interface ActivityRepository {
    getAll(): Promise<Activity[]>;
    getById(activityId: ActivityId): Promise<Activity>;
    create(activity: Activity): Promise<Activity>;
    delete(activityId: ActivityId): Promise<void>;
}