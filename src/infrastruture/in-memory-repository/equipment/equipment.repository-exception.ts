export enum EquipmentRepositoryExceptionMessage {
    EQUIPMENT_NOT_FOUND = 'Equipment not found',
}

export class EquipmentRepositoryException extends Error {
    constructor(message: EquipmentRepositoryExceptionMessage) {
        super(message);
        this.name = 'EquipmentRepositoryException';
        this.message = message;
    }
}