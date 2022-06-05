import ITime from "../interfaces/ITime";

function minsToHrsMinsSecs(minutes: number): ITime {

    let hrs: number = Math.floor(minutes / 60);
    let mins: number = Math.floor(minutes - (hrs * 60));
    let secs: number = Math.floor(minutes % 60);

    return { hrs: hrs, mins: mins, secs: secs };
}

export default minsToHrsMinsSecs;
