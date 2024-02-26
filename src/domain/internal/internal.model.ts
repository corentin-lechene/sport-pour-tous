export class Faq {
    private answer: string;
    private question: string;
    private url?: string;


    constructor(answer: string, question: string, url: string) {
        this.answer = answer;
        this.question = question;
        this.url = url;
    }

}