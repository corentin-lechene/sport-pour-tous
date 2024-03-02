import {Guarantee, GuaranteeId} from "../../../domain/client/guarantee/guarantee.model";
import {User} from "../../../domain/client/user/user.model";
import {Formula} from "../../../domain/formula/formula.model";

export interface IGuaranteeService {
    getAboutSubscription(formula: Formula, user: User): Promise<Guarantee[]>;
    delete(guaranteeId: GuaranteeId): Promise<void>;
}