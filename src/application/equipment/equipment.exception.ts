export enum EquipmentMessageError {
    ALL_FIELDS_MUST_BE_FILL = "All fields must be fill",
    EQUIPMENT_NOT_FOUND = 'Equipment not found',
}

export class EquipmentException extends Error {
    constructor(message: EquipmentMessageError) {
        super(message);
        this.name = "EquipmentException";
        this.message = message;
    }
}