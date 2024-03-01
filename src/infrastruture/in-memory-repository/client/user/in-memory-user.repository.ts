import {User, UserId} from "../../../../domain/client/user/user.model";
import {UserRepository} from "../../../../domain/client/user/user.repository";
import {Email} from "../../../../common/vo/email/email";
import {PhoneNumber} from "../../../../common/vo/phoneNumber/phoneNumber";
import {UserExceptionRepository, UserMessageExceptionRepository} from "./user.exception.repository";

const _users: User[] = []

export class InMemoryUserRepository implements UserRepository {

    constructor() {
        const defaultMail = Email.of("t@stark.com");
        const defaultPhoneNumber = PhoneNumber.of("+33601020304");
        const defaultUser = new User("Tony", "Stark", defaultMail, "toto", "1 rue New York", defaultPhoneNumber)
        _users.push(defaultUser)
    }
    async getAll(): Promise<User[]> {
        return _users.filter(user => !user.deletedAt);
    }

    async getById(id: UserId): Promise<User> {
        const user = _users.find(user => user.id.value === id.value);
        if (!user) {
            throw new UserExceptionRepository(UserMessageExceptionRepository.USER_NOT_FOUND);
        }
        return user;
    }

    async getByEmail(email: Email): Promise<User | undefined> {
        return _users.find(user => user.email === email.getEmail);
    }

    async create(user: User): Promise<User> {
        user.createdAt = new Date();
        _users.push(user);
        return user;
    }
    //
    // async delete(id: UserId): Promise<void> {
    //     const user = _users.find(user => user.id.value === id.value);
    //     if (!user) {
    //         throw new UserExceptionRepository(UserMessageException.USER_NOT_FOUND);
    //     }
    //     user.deletedAt = new Date();
    // }
}