export default interface Excursionsource{
    getExcursions(token: string):Promise<any>;
    getExcursionsId(token:string, id:number):Promise<any>;
}