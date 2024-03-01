export enum UserMessageExceptionRepository {
    USER_NOT_FOUND = 'User not found',
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