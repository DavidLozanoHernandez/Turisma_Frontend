export class ExcursionActivities{
    id: number;
    stopPointId: number;
    name: string;
    numActivity: number;
    description: string;

    constructor(
        id: number,
        stopPointId: number,
        name: string,
        numActivity: number,
        description: string,
    ){
        this.id = id;
        this.stopPointId = stopPointId;
        this.name = name;
        this.numActivity = numActivity;
        this.description = description;
    }
}