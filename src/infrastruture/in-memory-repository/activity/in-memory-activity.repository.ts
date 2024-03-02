import {ActivityRepository} from "../../../domain/activity/activity.repository";
import {Activity, ActivityId} from "../../../domain/activity/activity.model";
import {ActivityRepositoryException, ActivityRepositoryExceptionMessage} from "./activity.repository-exception";

const _activities: Activity[] = [];

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
}