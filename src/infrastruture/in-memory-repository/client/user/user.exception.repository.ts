export enum UserMessageExceptionRepository {
    USER_NOT_FOUND = 'User not found',
}

export class UserExceptionRepository extends Error {
    constructor(userMessageException: UserMessageExceptionRepository) {
        const message = userMessageException.toString();

        super(message);
        this.name = "UserExceptionRepository";
        this.message = message;
    }
}