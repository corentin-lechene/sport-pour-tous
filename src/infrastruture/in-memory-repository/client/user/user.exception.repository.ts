export enum UserMessageExceptionRepository {
    ALL_FIELDS_MUST_BE_FILL = "All fields must be fill (email, password, email, phone)",
    USER_NOT_FOUND = 'User not found',
    USER_ALREADY_EXISTS = 'User already exists',
    USER_CREATED = 'User created',
    USER_UPDATED = 'User updated',
    USER_DELETED = 'User deleted',
}

export class UserExceptionRepository extends Error {
    constructor(userMessageException: UserMessageExceptionRepository) {
        const message = userMessageException.toString();

        super(message);
        this.name = "UserException";
        this.message = message;
    }
}