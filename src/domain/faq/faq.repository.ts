import {Faq} from "./faq.model";

export interface FaqRepository {
    fetchAll(): Promise<Faq[]>;

    fetchById(id: string): Promise<Faq>;

    fetchByTags(tags: string[]): Promise<Faq[]>;

    create(faq: Faq): Promise<Faq>;

    update(faq: Faq): Promise<void>;
}