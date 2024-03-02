export enum EquipmentRepositoryExceptionMessage {
    EQUIPMENT_NOT_FOUND = 'Equipment not found',
    ALL_FIELDS_MUST_BE_FILL = 'fghjklmù'
}

export class EquipmentRepositoryException extends Error {
    constructor(message: EquipmentRepositoryExceptionMessage) {
        super(message);
        this.name = 'EquipmentRepositoryException';
        this.message = message;
    }
}