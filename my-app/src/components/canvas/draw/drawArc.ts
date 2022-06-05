import degreeToRadian from "../../../utils/degreeToRadian";

function drawArc(ctx: CanvasRenderingContext2D, xMid: number, yMid: number,
    radius: number, endAngleDeg: number,
    lineWidth: number, color: string): void {

    // in ctx.arc 0 is 3 o'clock, i want it to be 12 o'clock so:
    const correction: number = degreeToRadian(90);

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.beginPath();
    if (endAngleDeg === 0 || endAngleDeg === 360) {
        ctx.arc(xMid, yMid, radius, 0, 2 * Math.PI);
    } else {
        ctx.arc(xMid, yMid, radius,
            degreeToRadian(0) - correction,
            degreeToRadian(endAngleDeg) - correction);
    }
    ctx.stroke();
}

export default drawArc
