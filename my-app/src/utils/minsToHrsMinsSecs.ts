import ITime from "../interfaces/ITime";

function minsToHrsMinsSecs(minutesFloat: number): ITime {

    let hrs: number = Math.floor(minutesFloat / 60);
    let mins: number = Math.floor(minutesFloat - (hrs * 60));
    let secs: number = Math.floor((minutesFloat % 1) * 60);

    return { hrs: hrs, mins: mins, secs: secs };
}

export default minsToHrsMinsSecs;
