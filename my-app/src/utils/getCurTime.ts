import ITime from "../interfaces/ITime";

const getCurTime = (): ITime => {
    let curDate: Date = new Date();
    return {
        hrs: curDate.getHours(),
        mins: curDate.getMinutes(),
        secs: curDate.getSeconds(),
    }
}

export default getCurTime;
