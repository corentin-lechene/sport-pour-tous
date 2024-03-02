import {EquipmentType, EquipmentTypeId} from "../../domain/equipment/equipmentType/equipment-type.model";

export class IEquipmentService {
    getEquipmentTypesByIds(equipmentTypeIds: EquipmentTypeId[]): Promise<EquipmentType[]>;
}