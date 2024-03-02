import {FieldService} from "./application/place/field/field.service";
import {InMemoryFieldRepository} from "./infrastruture/in-memory-repository/in-memory-field.repository";
import {InMemoryPlaceRepository} from "./infrastruture/in-memory-repository/in-memory-place.repository";
import {PlaceService} from "./application/place/place.service";
import {EquipmentTypeService} from "./application/equipment/equipmentType/equipment-type.service";
import {
    InMemoryEquipmentTypeRepository
} from "./infrastruture/in-memory-repository/equipment/equipmentType/in-memory-equipment-type.repository";
import {EquipmentService} from "./application/equipment/equipment.service";
import {
    InMemoryEquipmentRepository
} from "./infrastruture/in-memory-repository/equipment/in-memory-equipment.repository";
import {ActivityService} from "./application/activity/activity.service";
import {InMemoryActivityRepository} from "./infrastruture/in-memory-repository/activity/in-memory-activity.repository";
import {SessionService} from "./application/session/session.service";
import {InMemorySessionRepository} from "./infrastruture/in-memory-repository/session/in-memory-session.repository";
import {InMemoryUserRepository} from "./infrastruture/in-memory-repository/client/user/in-memory-user.repository";
import {InMemoryInvoiceRepository} from "./infrastruture/in-memory-repository/invoice/in-memory-invoice.repository";
import {InvoiceService} from "./application/client/invoice/invoice.service";
import {
    InMemoryGuaranteeRepository
} from "./infrastruture/in-memory-repository/guarantee/in-memory-guarantee.repository";
import {GuaranteeService} from "./application/client/guarantee/guarantee.service";
import {InMemoryFormulaRepository} from "./infrastruture/in-memory-repository/formula/in-memory-formula.repository";
import {FormulaService} from "./application/formula/formula.service";
import {UserService} from "./application/client/user/user.service";


// repo
const placeRepository = new InMemoryPlaceRepository();
const fieldRepository = new InMemoryFieldRepository();
const equipmentTypeRepository = new InMemoryEquipmentTypeRepository()
const activityRepository = new InMemoryActivityRepository();
const sessionRepository = new InMemorySessionRepository();
const userRepository = new InMemoryUserRepository();
const invoiceRepository =  new InMemoryInvoiceRepository();
const guaranteeRepository = new InMemoryGuaranteeRepository();
const formulaRepository = new InMemoryFormulaRepository();

// service
export const fieldService = new FieldService(fieldRepository);

export const placeService = new PlaceService(placeRepository, fieldService);

export const equipmentTypeService = new EquipmentTypeService(equipmentTypeRepository);

export  const equipmentService = new EquipmentService(new InMemoryEquipmentRepository(), equipmentTypeService)

export const activityService = new ActivityService (activityRepository, equipmentTypeService)

export const sessionService = new SessionService(sessionRepository, activityService);

export const invoiceService = new InvoiceService(invoiceRepository);

export const guaranteeService = new GuaranteeService(guaranteeRepository);
export const formulaService = new FormulaService(formulaRepository, equipmentService);

export const userService = new UserService (userRepository, invoiceService, sessionService, guaranteeService, formulaService)