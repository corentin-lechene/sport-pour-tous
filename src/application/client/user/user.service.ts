import {UserRepository} from "../../../domain/client/user/user.repository";
import {User, UserId} from "../../../domain/client/user/user.model";
import {Email} from "../../../common/vo/email/email";
import {UserException, UserMessageException} from "./user.exception";
import {CreateUserDto} from "../../../infrastruture/express/client/user/create-user.dto";

export class UserService {

    constructor(
        private readonly userRepository: UserRepository
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
            createUserDto.password, createUserDto.address, createUserDto.phoneNumber);
        return this.userRepository.create(user)
    }


// delete(userId)
// updateInfo(userId, firstName, lastName, address, phone)
// updateFavoriteActivities(userId, activities)
// updatePassword(userId, password)
// subscribeToSession(userId, sessionId)
// unsubscribeToSession(userId, sessionId)
// getAllSessions(userId)
// getAllInvoices(userId)
// getAllGuarantees(userId)
    // getAllTrackingFolders(userId)
}