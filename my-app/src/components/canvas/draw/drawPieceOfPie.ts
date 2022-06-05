import degreeToRadian from "../../../utils/degreeToRadian";

function drawPieceOfPie(ctx: CanvasRenderingContext2D,
    xMid: number, yMid: number, radius: number,
    startAngleDeg: number, endAngleDeg: number,
    color: string): void {

    // in ctx.arc 0 is 3 o'clock, i want it to be 12 o'clock so:
    const correction: number = degreeToRadian(90);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(xMid, yMid);
    ctx.arc(xMid, yMid, radius,
        degreeToRadian(startAngleDeg) - correction,
        degreeToRadian(endAngleDeg) - correction);
    ctx.closePath();
    ctx.fill()
}

export default drawPieceOfPie;
