import {Equipment, EquipmentId} from "../../domain/equipment/equipment.model";

export interface IEquipmentService {
    getById(equipmentId: EquipmentId): Promise<Equipment>;
    getByIds(equipmentIds: EquipmentId[]): Promise<Equipment[]>;
}