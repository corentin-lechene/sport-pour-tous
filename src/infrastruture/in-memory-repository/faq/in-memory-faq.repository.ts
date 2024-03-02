import {FaqRepository} from "../../../domain/faq/faq.repository";
import {Faq} from "../../../domain/faq/faq.model";

export class InMemoryFaqRepository implements FaqRepository {
    create(faq: Faq): Promise<Faq> {
        return Promise.resolve(undefined as unknown as Faq);

    }

    fetchAll(): Promise<Faq[]> {
        return Promise.resolve([]);
    }

    fetchById(id: string): Promise<Faq> {
        return Promise.resolve(undefined as unknown as Faq);
    }

    fetchByTags(tags: string[]): Promise<Faq[]> {
        return Promise.resolve([]);
    }

    update(faq: Faq): Promise<void> {
        return Promise.resolve(undefined);
    }

}