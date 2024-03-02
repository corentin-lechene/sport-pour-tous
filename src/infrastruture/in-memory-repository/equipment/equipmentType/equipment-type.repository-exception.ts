export enum EquipmentTypeRepositoryExceptionMessage {
    EQUIPMENT_TYPE_NOT_FOUND = 'Equipment type not found',
}

export class EquipmentTypeRepositoryException extends Error {
    constructor(message: EquipmentTypeRepositoryExceptionMessage) {
        super(message);
        this.name = 'EquipmentTypeRepositoryException';
        this.message = message;
    }
}