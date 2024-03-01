import {User, UserId} from "./user.model";
import {Email} from "../../../common/vo/email/email";

export interface UserRepository {
    getAll(): Promise<User[]>;
    getById(id: UserId): Promise<User>;
    getByEmail(email: Email): Promise<User | undefined>;
    create(user: User): Promise<User>;
    delete(id: UserId): Promise<void>;
    update(id: UserId, firstname: string, lastname: string, email: string, address: string, phoneNumber: string): Promise<User>;
    updatePassword(id: UserId, password: string): Promise<void>;
}