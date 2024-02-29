import { v4 as uuidv4 } from 'uuid';
import {EquipmentType} from "./equipmentType/equipment-type.model";

export class EquipmentId {
    value: string;

    constructor(value: string = uuidv4()) {
        this.value = value;
    }
}

export class Equipment {
    id: EquipmentId;
    name: string;
    quantity: number;
    equipmentType: EquipmentType;
    deletedAt?: Date;

    constructor(name: string, quantity: number, equipmentType: EquipmentType, deletedAt?: Date) {
        this.id = new EquipmentId();
        this.name = name;
        this.quantity = quantity;
        this.equipmentType = equipmentType;
        this.deletedAt = deletedAt;
    }
}