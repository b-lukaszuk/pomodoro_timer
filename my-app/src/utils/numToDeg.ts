function numToDeg(aNum: number, numAt12oClock: number = 12): number {
    return (aNum % numAt12oClock) * 360 / numAt12oClock;
}

export default numToDeg;
