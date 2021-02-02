export interface ServerTimestamp{
    seconds: number;
    nanoseconds: number;
    toDate: ()=>any;
}