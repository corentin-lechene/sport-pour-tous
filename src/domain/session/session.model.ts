import {Place} from "../place/place.model";
import {SessionId} from "./session-id";
import {Activity} from "../activity/activity.model";

export class Session {
    readonly id: SessionId;
    place: Place;
    maxParticipant: number;
    name: string;
    activity: Activity
    price: number;
    startAt: Date;
    endAt: Date;

    constructor(name: string, price: number, place: Place, maxParticipant: number, startAt: Date, endAt: Date, activity: Activity) {
        this.id = new SessionId();
        this.place = place;
        this.name = name;
        this.activity = activity
        this.price = price;
        this.maxParticipant = maxParticipant;
        this.startAt = startAt;
        this.endAt = endAt;
    }
}
