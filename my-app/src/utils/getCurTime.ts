import ETime from "../customTypes/ETime";

const getCurTime = (resType: ETime): number => {
    let curDate: Date = new Date();
    switch (resType) {
        case ETime.Hrs:
            return curDate.getHours();
        case ETime.Mins:
            return curDate.getMinutes();
        default:
            return curDate.getSeconds();
    }
}

export default getCurTime;
