import {EquipmentTypeId} from "../../../domain/equipment/equipmentType/equipment-type.model";

export class CreateActivityDto {
    name: string;
    description: string;
    equipmentTypeIds: EquipmentTypeId[];

    constructor(name: string, description: string, equipmentTypeIds: EquipmentTypeId[]) {
        this.name = name;
        this.description = description;
        this.equipmentTypeIds = equipmentTypeIds;
    }
}