import { ExcursionActivities } from "./activities";

export class ExcursionStopPoints{
    id: number;
    excursionId: number;
    name: string;
    numStop: number;
    duration: string;
    activities: ExcursionActivities[];

    constructor(
        id: number,
        excursionId: number,
        name: string,
        numStop: number,
        duration: string,
        activities: ExcursionActivities[],
    ){
        this.id = id;
        this.excursionId = excursionId;
        this.name = name;
        this.numStop = numStop;
        this.duration = duration;
        this.activities = activities;
    }
}