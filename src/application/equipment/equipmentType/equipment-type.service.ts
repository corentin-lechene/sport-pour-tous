import {EquipmentType, EquipmentTypeId} from "../../../domain/equipment/equipmentType/equipment-type.model";
import {EquipmentTypeException} from "./exception/equipment-type.exception";
import {EquipmentTypeMessageError} from "./exception/equipment-type.message-error";
import {EquipmentTypeRepository} from "../../../domain/equipment/equipmentType/equipment-type.repository";

export class EquipmentTypeService {
    constructor(private readonly equipmentTypeRepository: EquipmentTypeRepository) {
        this.equipmentTypeRepository = equipmentTypeRepository;
    }

    async getAll(): Promise<EquipmentType[]> {
        return this.equipmentTypeRepository.getAll();
    }

    async getById(equipmentTypeId: EquipmentTypeId) {
        return this.equipmentTypeRepository.getById(equipmentTypeId);
    }

    async create(name: string): Promise<EquipmentType> {
        if (!name?.trim()) {
            throw new EquipmentTypeException(EquipmentTypeMessageError.ALL_FIELDS_MUST_BE_FILL);
        }

        try {
            const equipmentType = await this.equipmentTypeRepository.getByName(name.trim());
            if(equipmentType) {
                throw new EquipmentTypeException(EquipmentTypeMessageError.EQUIPMENT_TYPE_ALREADY_EXISTS);
            }
        } catch(e) {
            if(e instanceof EquipmentTypeException) {
                if(e.message === EquipmentTypeMessageError.EQUIPMENT_TYPE_ALREADY_EXISTS) {
                    throw e;
                }
            }
        }

        const newEquipmentType = new EquipmentType(name.trim());
        return this.equipmentTypeRepository.create(newEquipmentType);
    }

    async update(equipmentTypeId: EquipmentTypeId, equipmentType: EquipmentType): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async delete(equipmentTypeId: EquipmentTypeId): Promise<void> {
        return this.equipmentTypeRepository.delete(equipmentTypeId);
    }
}