import * as express from "express";


export class FaqRoute {
    getRoutes() {
        const router = express.Router();
        // const faqController = new FaqController(faqService);

        // router.get("/faqs", faqController.fetchFaqs());
        // router.post("/faqs", faqController.addFaq());
        // router.patch("/faqs/:faqId", faqController.updateFaq());
        // router.delete("/faqs/:faqId", faqController.deleteFaq());

        return router;
    }
}