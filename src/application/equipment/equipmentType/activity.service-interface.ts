import {EquipmentType, EquipmentTypeId} from "../../../domain/equipment/equipmentType/equipment-type.model";

export interface IEquipmentTypeService {
    getEquipmentTypesByIds(equipmentTypeIds: EquipmentTypeId[]): Promise<EquipmentType[]>;
    getEquipmentById(equipmentTypeId: EquipmentTypeId): Promise<EquipmentType>;
}