import degreeToRadian from "../../../utils/degreeToRadian";

function drawArc(ctx: CanvasRenderingContext2D, xMid: number, yMid: number,
    radius: number, startAngleDeg: number, endAngleDeg: number,
    lineWidth: number, color: string): void {

    // in ctx.arc 0 is 3 o'clock, i want it to be 12 o'clock so:
    const correction: number = degreeToRadian(90);

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.arc(xMid, yMid, radius, degreeToRadian(startAngleDeg) - correction,
        degreeToRadian(endAngleDeg) - correction);
    ctx.stroke();
}

export default drawArc
