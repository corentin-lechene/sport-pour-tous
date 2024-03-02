export enum ActivityRepositoryExceptionMessage {
    ACTIVITY_NOT_FOUND = "Activity not found",
}

export class ActivityRepositoryException extends Error {
    constructor(message: ActivityRepositoryExceptionMessage) {
        super(message);
        this.name = "ActivityRepositoryException";
        this.message = message;
    }
}