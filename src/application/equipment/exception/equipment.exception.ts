export class EquipmentException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "EquipmentException";
        this.message = message;
    }
}