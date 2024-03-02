export class PlaceException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PlaceException";
    }
}