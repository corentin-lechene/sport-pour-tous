import {UserRepository} from "../../../domain/client/user/user.repository";
import {User, UserId} from "../../../domain/client/user/user.model";
import {Email} from "../../../common/vo/email/email";
import {UserException, UserMessageException} from "./user.exception";
import {CreateUserDto} from "../../../infrastruture/express/client/user/create-user.dto";
import {UpdateUserDto} from "../../../infrastruture/express/client/user/update-user.dto";
import {IInvoiceService} from "../invoice/invoice.service.interface";
import {ISessionService} from "../../session/session.service.interface";
import {IGuaranteeService} from "../guarantee/guarantee.service.interface";
import {FormulaData} from "../../../infrastruture/express/formula/formula-data";
import {IFormulaService} from "../../formula/formula.service.interface";
import * as dayjs from "dayjs";
import {Guarantee} from "../../../domain/client/guarantee/guarantee.model";
import {SessionId} from "../../../domain/session/session-id";

export class UserService {

    constructor (
        private readonly userRepository: UserRepository,
        private readonly IInvoiceService: IInvoiceService,
        private readonly ISessionService: ISessionService,
        private readonly IGuaranteeService: IGuaranteeService,
        private readonly IFormulaService: IFormulaService,
    ) {
        this.userRepository = userRepository;
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
            createUserDto.password, createUserDto.address, createUserDto.phoneNumber, true, []);
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

        // get session
        // const session = new Session(10, "toto", 10, new Date(), []);
        const session = await this.ISessionService.fetchById(sessionId);

        //get formula
        const formula = await this.IFormulaService.create(formulaData);

        // get guarantees
        const guarantees: Guarantee[] = await this.IGuaranteeService.getAboutSubscription(formula, user);
        const guaranteeTotal = guarantees.reduce((acc, guarantee) => acc + guarantee.amount, 0)

        // create invoice
        const totalPrice = session.price + guaranteeTotal + formula.price;
        await this.IInvoiceService.create(user, session, session.price, totalPrice, guarantees);

        // subscribe
        await this.userRepository.addSession(user.id, session);
        await this.ISessionService.addUser(session.id, user);


        // todo: via mail or sms send a confirmation
    }

    async unsubscribeToSession(userId: UserId, sessionId: SessionId) {
        const user = await this.userRepository.getById(userId);

        const session = await this.ISessionService.fetchById(sessionId);

        // si c'est avant
        const now = dayjs();
        const sessionStart = dayjs(session.startAt);

        if(sessionStart.diff(now, 'hours') > 2) {
            const invoice = await this.IInvoiceService.getBySessionAndUser(session.id, user.id);
            if(invoice) {
                const guarantees = invoice.guarantees;
                guarantees.map(async guarantee => await this.IGuaranteeService.delete(guarantee.id));
                await this.IInvoiceService.delete(invoice.id);
            }
        }

        await this.userRepository.deleteSession(user.id, session.id);
        await this.ISessionService.deleteUser(session.id, user.id);

    }

    // getAllGuarantees(userId)
    // updateFavoriteActivities(userId, activities)
    // getAllSessions(userId)
    // getAllTrackingFolders(userId)
}