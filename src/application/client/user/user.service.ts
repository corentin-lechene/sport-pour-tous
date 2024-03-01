import {UserRepository} from "../../../domain/client/user/user.repository";
import {User, UserId} from "../../../domain/client/user/user.model";
import {Email} from "../../../common/vo/email/email";

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
// create(email, password, firstName, lastName)
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