function degreeToRadian(degree: number): number {
    // 1 rad = 180deg/pi = 57.296deg
    return (degree % 360) / (180 / Math.PI);
}

export default degreeToRadian;
