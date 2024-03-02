export enum GuaranteeMessageExceptionRepository {
    GUARANTEE_NOT_FOUND = 'Guarantee not found',
}

export class GuaranteeExceptionRepository extends Error {
    constructor(guaranteeMessageExceptionRepository: GuaranteeMessageExceptionRepository) {
        const message = guaranteeMessageExceptionRepository.toString();
        super(message);
        this.name = "GuaranteeExceptionRepository";
        this.message = message;
    }
}