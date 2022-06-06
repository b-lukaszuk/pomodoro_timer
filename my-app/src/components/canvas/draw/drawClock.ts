import drawPieceOfPie from "./drawPieceOfPie";
import drawText from "./drawText";
import numsToDeg from "../../../utils/numToDeg";
import { formatTime } from "../../../utils/format";


function drawHrs(ctx: CanvasRenderingContext2D, hrs: number,
    xMid: number, yMid: number): void {
    drawPieceOfPie(ctx, xMid, yMid, 100, 0,
        numsToDeg(hrs, 12), "rgba(212, 175, 55, 0.5)");
}

function drawMins(ctx: CanvasRenderingContext2D, mins: number,
    xMid: number, yMid: number): void {

    drawPieceOfPie(ctx, xMid, yMid, 150, 0,
        numsToDeg(mins, 60), "rgba(0, 0, 255, 0.3)");
}

function drawSecs(ctx: CanvasRenderingContext2D, secs: number,
    xMid: number, yMid: number): void {

    drawPieceOfPie(ctx, xMid, yMid, 200, 0,
        numsToDeg(secs, 60), "rgba(255, 0, 0, 0.2)");
}

function drawClock(canv: HTMLCanvasElement, ctx: CanvasRenderingContext2D,
    hrs: number, mins: number, secs: number,
    xMid: number, yMid: number): void {

    let minsFloat: number = mins + (secs / 60);
    let hrsFloat: number = hrs + (minsFloat / 60);

    drawSecs(ctx, secs, xMid, yMid);
    drawMins(ctx, minsFloat, xMid, yMid);
    drawHrs(ctx, hrsFloat, xMid, yMid);
    drawText(canv, ctx, formatTime(hrs, mins, secs), "black", false);
}


export default drawClock;
