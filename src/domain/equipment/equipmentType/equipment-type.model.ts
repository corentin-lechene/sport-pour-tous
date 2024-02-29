import { v4 as uuidv4 } from 'uuid';

export class EquipmentTypeId {
    value: string;
    constructor(value: string = uuidv4()) {
        this.value = value;
    }
}

export class EquipmentType {
    id: EquipmentTypeId;
    name: string;
    deletedAt?: Date;

    constructor(name: string, deletedAt?: Date) {
        this.id = new EquipmentTypeId()
        this.name = name;
        this.deletedAt = deletedAt;
    }
}