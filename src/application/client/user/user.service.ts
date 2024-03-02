import {UserRepository} from "../../../domain/client/user/user.repository";
import {User, UserId} from "../../../domain/client/user/user.model";
import {Email} from "../../../common/vo/email/email";
import {UserException, UserMessageException} from "./user.exception";
import {CreateUserDto} from "../../../infrastruture/express/client/user/create-user.dto";
import {UpdateUserDto} from "../../../infrastruture/express/client/user/update-user.dto";
import {IInvoiceService} from "../invoice/invoice.service.interface";
import {SessionId} from "../../../domain/session/session.model";
import {ISessionService} from "../../session/session.service.interface";
import {IGuaranteeService} from "../guarantee/guarantee.service.interface";
import {FormulaData} from "../../../infrastruture/express/formula/formula-data";
import {Guarantee} from "../../../domain/client/guarantee/guarantee.model";
import {FieldPlusMaterialFormula} from "../../../domain/formula/extends/field-plus-material.formula";
import {IFormulaService} from "../../formula/formula.service.interface";
import {SessionException} from "../../session/session.exception";
import {GuaranteeException} from "../guarantee/guarantee.exception";
import {FormulaException} from "../../formula/formula.exception";

export class UserService {

    constructor (
        private readonly userRepository: UserRepository,
        private readonly IInvoiceService: IInvoiceService,
        private readonly ISessionService: ISessionService,
        private readonly IGuaranteeService: IGuaranteeService,
        private readonly IFormulaService: IFormulaService,
    ) {
        this.userRepository = userRepository;
        this.IInvoiceService = IInvoiceService;
        this.ISessionService = ISessionService;
        this.IGuaranteeService = IGuaranteeService;
        this.IFormulaService = IFormulaService;
    }
    async getAll(): Promise<User[]> {
        return this.userRepository.getAll();
    }

    async getById(userId: UserId): Promise<User> {
        return this.userRepository.getById(userId);
    }

    async getByEmail(email: Email) {
        return this.userRepository.getByEmail(email);
    }

    async create(createUserDto: CreateUserDto) {
        if(!createUserDto.email.getEmail.trim() || !createUserDto.password.trim() || !createUserDto.firstname.trim()
            || !createUserDto.lastname.trim() || !createUserDto.phoneNumber.getPhoneNumber.trim()
            || !createUserDto.address.trim()) {
            throw new UserException(UserMessageException.ALL_FIELDS_MUST_BE_FILL);
        }

        const exitsUser = await this.getByEmail(createUserDto.email);
        if(exitsUser) {
            throw new UserException(UserMessageException.THE_MAIL_ALREADY_EXIST);
        }

        const user = new User(createUserDto.firstname, createUserDto.lastname, createUserDto.email,
            createUserDto.password, createUserDto.address, createUserDto.phoneNumber, true);
        return this.userRepository.create(user)
    }


    async delete(userId: UserId) {
        return this.userRepository.delete(userId);
    }

    async updateInfo(userId: UserId, updateUserDto: UpdateUserDto) {
        if(!updateUserDto.email.getEmail.trim() || !updateUserDto.firstname.trim() || !updateUserDto.lastname.trim()
            || !updateUserDto.phoneNumber.getPhoneNumber.trim() || !updateUserDto.address.trim()) {
            throw new UserException(UserMessageException.ALL_FIELDS_MUST_BE_FILL);
        }

        const existUser = await this.userRepository.getById(userId);
        if(!existUser) {
            throw new UserException(UserMessageException.USER_NOT_FOUND)
        }

        return this.userRepository.update(userId, updateUserDto.firstname, updateUserDto.lastname,
            updateUserDto.email.getEmail, updateUserDto.address, updateUserDto.phoneNumber.getPhoneNumber);

    }


    async updatePassword(userId: UserId, password: string) {
        if(!password.trim()) throw new UserException(UserMessageException.PASSWORD_IS_MISSING)

        const existUser = await this.userRepository.getById(userId);
        if(!existUser) {
            throw new UserException(UserMessageException.USER_NOT_FOUND)
        }

        await this.userRepository.updatePassword(userId, password);
    }



    async getAllInvoices(userId: UserId) {
        const existUser = await this.userRepository.getById(userId);
        if(!existUser) {
            throw new UserException(UserMessageException.USER_NOT_FOUND)
        }

        return this.IInvoiceService.getByUser(userId);
    }

    async subscribeToSession(userId: UserId, sessionId: SessionId, formulaData: FormulaData) {
        const user = await this.userRepository.getById(userId);
        if(!user) {
            throw new UserException(UserMessageException.USER_NOT_FOUND)
        }

        try {
            const session = await this.ISessionService.getById(sessionId);
            const formula = await this.IFormulaService.create(formulaData);

            const guarantees: Guarantee[] = [];
            if(user.isFirstTime) {
                const guarantee = await this.IGuaranteeService.createBankGuarantee();
                guarantees.push(guarantee);
            }
            if(formula instanceof FieldPlusMaterialFormula) {
                const guarantee = await this.IGuaranteeService.createMaterialGuarantee(formula);
                guarantees.push(guarantee);
            }

            const guaranteeTotal = guarantees.reduce((total, g) => total + (g.amount || 0), 0);
            const totalPrice = session.price + guaranteeTotal + formula.price;
            await this.IInvoiceService.create(user.id, session.id, session.price, totalPrice, guarantees);
            await this.userRepository.addSession(user.id, session);
            await this.ISessionService.addUser(session.id, user);

        } catch (e) {
            if(e instanceof SessionException) {
                throw new UserException(UserMessageException.SESSION_ERROR);
            }

            if(e instanceof GuaranteeException) {
                throw new UserException(UserMessageException.GUARANTEE_ERROR);
            }

            if(e instanceof FormulaException) {
                throw new UserException(UserMessageException.FORMULA_ERROR)
            }
        }

        // todo: via mail or sms send a confirmation
    }

    async unsubscribeToSession(userId: UserId, sessionId: SessionId) {
        const user = await this.userRepository.getById(userId);
        if(!user) {
            throw new UserException(UserMessageException.USER_NOT_FOUND)
        }

        const session = await this.ISessionService.getById(sessionId);
        // if(!session) {
        //     throw new UserException();
        // }

        // todo : vérifier la relation entre les deux existent bien

        // todo: caution + invoice valider si moins de 2h avant

        // todo: remove relation between session and user

        // todo: subscribe successfully

        // todo: send confirmation mail

    }

    // getAllGuarantees(userId)
    // updateFavoriteActivities(userId, activities)
    // getAllSessions(userId)
    // getAllTrackingFolders(userId)
}