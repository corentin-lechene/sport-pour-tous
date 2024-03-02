export enum SessionMessageExceptionRepository {
    SESSION_NOT_FOUND = 'Session not found',
    SESSION_ALREADY_EXISTS = "Session already exists.",

}

export class SessionExceptionRepository extends Error {
    constructor(sessionMessageExceptionRepository: SessionMessageExceptionRepository) {
        const message = sessionMessageExceptionRepository.toString();
        super(message);
        this.name = "SessionExceptionRepository";
        this.message = message;
    }
}