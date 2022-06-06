import ITime from "../interfaces/ITime";

function secsToHrsMinsSecs(secsInt: number): ITime {

    let hrs: number = Math.floor(secsInt / 3600);
    let mins: number = Math.floor((secsInt - (hrs * 3600)) / 60);
    let secs: number = Math.floor(secsInt % 60);

    return { hrs: hrs, mins: mins, secs: secs };
}

export default secsToHrsMinsSecs;
