import drawArc from "./drawArc";
import drawPieceOfPie from "./drawPieceOfPie";
import drawText from "./drawText";
import { formatTime } from "../../../utils/format";
import numsToDeg from "../../../utils/numToDeg";
import secsToHrMinsSecs from "../../../utils/secsToHrsMinsSecs";
import ITime from "../../../interfaces/ITime";

function drawTimer(canv: HTMLCanvasElement, ctx: CanvasRenderingContext2D,
    secsStart: number, secsLeft: number,
    displDigitsAtBottom: boolean = true): void {

    let time: ITime = secsToHrMinsSecs(secsLeft);
    let colorFont: string = (secsLeft <= 0) ? "red" : "dimgray";
    let colorMainPath: string = (secsLeft <= 0) ? "red" : "dimgray";

    drawArc(ctx, canv.height / 2, canv.width / 2, 240, 360, 10, colorMainPath);
    drawArc(ctx, canv.height / 2, canv.width / 2, 240,
        360 * (1 - secsLeft / secsStart), 10, "red");

    if (!displDigitsAtBottom) {
        drawPieceOfPie(ctx, canv.height / 2, canv.width / 2, 200, 0,
            numsToDeg(secsStart - secsLeft, 60), "rgba(255, 0, 0, 0.3)");
    }

    drawText(canv, ctx, formatTime(time.hrs, time.mins, time.secs),
        colorFont, displDigitsAtBottom);

}

export default drawTimer;
