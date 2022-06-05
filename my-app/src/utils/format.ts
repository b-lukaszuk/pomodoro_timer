function formatDigit(anInt: number) {
    let result: string = (anInt < 0) ? "00" : anInt.toString();
    return result.length === 1 ? ("0" + result) : result;
}

function formatTime(hrs: number, mins: number, secs: number): string {
    return `${formatDigit(hrs)}:${formatDigit(mins)}:${formatDigit(secs)}`;
}

export { formatDigit, formatTime };
