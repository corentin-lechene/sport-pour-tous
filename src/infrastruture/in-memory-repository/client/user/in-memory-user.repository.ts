import {User, UserId} from "../../../../domain/client/user/user.model";
import {UserRepository} from "../../../../domain/client/user/user.repository";
import {Email} from "../../../../common/vo/email/email";
import {PhoneNumber} from "../../../../common/vo/phoneNumber/phoneNumber";
import {UserExceptionRepository, UserMessageExceptionRepository} from "./user.exception.repository";
import {Session, SessionId} from "../../../../domain/session/session.model";

const _users: User[] = []

export class InMemoryUserRepository implements UserRepository {

    constructor() {
        const defaultMail = Email.of("t@stark.com");
        const defaultPhoneNumber = PhoneNumber.of("+33601020304");
        const defaultUser = new User("Tony", "Stark", defaultMail, "toto", "1 rue New York", defaultPhoneNumber, true)
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
        user.isFirstTime = true;
        _users.push(user);
        return user;
    }

    async update(id: UserId, firstname: string, lastname: string, email: string, address: string, phoneNumber: string): Promise<User> {
        const user = _users.find(user => user.id.value === id.value);
        if (!user) {
            throw new UserExceptionRepository(UserMessageExceptionRepository.USER_NOT_FOUND);
        }

        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.address = address;
        user.phoneNumber = phoneNumber;

        return user;
    }

    async updatePassword(id: UserId, password: string): Promise<void> {
        const user = _users.find(user => user.id.value === id.value);
        if (!user) {
            throw new UserExceptionRepository(UserMessageExceptionRepository.USER_NOT_FOUND);
        }

        user.password = password;
    }

    async delete(id: UserId): Promise<void> {
        const user = _users.find(user => user.id.value === id.value);
        if (!user) {
            throw new UserExceptionRepository(UserMessageExceptionRepository.USER_NOT_FOUND);
        }
        user.deletedAt = new Date();
    }

    async addSession(id: UserId, session: Session): Promise<void> {
        const user = _users.find(user => user.id.value === id.value);
        if (!user) {
            throw new UserExceptionRepository(UserMessageExceptionRepository.USER_NOT_FOUND);
        }
        user.isFirstTime = false;
        user.sessions.push(session);
    }

    async deleteSession(id: UserId, sessionId: SessionId): Promise<void> {
        const user = _users.find(user => user.id.value === id.value);
        if (!user) {
            throw new UserExceptionRepository(UserMessageExceptionRepository.USER_NOT_FOUND);
        }

        const session = user.sessions.find(session => session.id.value === sessionId.value);
        if (!session) {
            throw new UserExceptionRepository(UserMessageExceptionRepository.USER_NOT_FOUND);
        }

        session.deletedAt = new Date();
    }
}