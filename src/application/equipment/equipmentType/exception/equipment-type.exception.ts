

export class EquipmentTypeException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "EquipmentTypeException";
        this.message = message;
    }
}