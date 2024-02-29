import {EquipmentTypeId} from "../../../domain/equipment/equipmentType/equipment-type.model";


export class CreateEquipmentDto {
    name: string;
    quantity: number;
    equipmentTypeId: EquipmentTypeId;

    constructor(name: string, quantity: number, equipmentTypeId: EquipmentTypeId) {
        this.name = name;
        this.quantity = quantity;
        this.equipmentTypeId = equipmentTypeId;
    }
}