import {v4 as uuidv4} from "uuid";
import {EquipmentType} from "../equipment/equipmentType/equipment-type.model";

export class ActivityId {
    value: string;
    constructor(value: string = uuidv4()) {
        this.value = value;
    }
}

export class Activity {
    id: ActivityId;
    name: string;
    description: string;
    equipments: EquipmentType[];
    deletedAt?: Date

    constructor(name: string, description: string, equipmentTypes: EquipmentType[], deletedAt?: Date) {
        this.id = new ActivityId();
        this.name = name;
        this.description = description;
        this.equipments = equipmentTypes;
        this.deletedAt = deletedAt;
    }
}