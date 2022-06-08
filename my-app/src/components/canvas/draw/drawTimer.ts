import drawArc from "./drawArc";
import drawPieceOfPie from "./drawPieceOfPie";
import drawText from "./drawText";
import { formatTime } from "../../../utils/format";
import numsToDeg from "../../../utils/numToDeg";
import secsToHrMinsSecs from "../../../utils/secsToHrsMinsSecs";
import ITime from "../../../interfaces/ITime";

function drawTimer(
    canv: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    timerStartMs: number,
    timerEndMs: number,
    timerNowMs: number,
    displDigitsAtBottom: boolean = true
): void {

    let secsLeft: number = Math.round((timerEndMs - timerNowMs) / 1000);
    let secsTotal: number = Math.round((timerEndMs - timerStartMs) / 1000);
    let timeLeft: ITime = secsToHrMinsSecs(secsLeft);
    let colorFont: string = timerEndMs <= timerNowMs ? "red" : "dimgray";
    let colorMainPath: string = timerEndMs <= timerNowMs ? "red" : "dimgray";
    let textToDisplay: string =
        timerEndMs <= timerNowMs
            ? "00:00:00"
            : formatTime(timeLeft.hrs, timeLeft.mins, timeLeft.secs);
    let timeLeftToTimeTotalInDeg: number = 360 - ((360 * secsLeft) / secsTotal);
    let timeLeftSecsTo60InDeg: number = numsToDeg(60 - secsLeft, 60);

    drawArc(ctx, canv.height / 2, canv.width / 2, 240, 360, 10, colorMainPath);
    drawArc(
        ctx,
        canv.height / 2,
        canv.width / 2,
        240,
        timeLeftToTimeTotalInDeg,
        10,
        "red"
    );

    if (!displDigitsAtBottom && timerEndMs >= timerNowMs) {
        drawPieceOfPie(
            ctx,
            canv.height / 2,
            canv.width / 2,
            200,
            0,
            timeLeftSecsTo60InDeg,
            "rgba(255, 0, 0, 0.3)"
        );
    }

    drawText(canv, ctx, textToDisplay, colorFont, displDigitsAtBottom);
}

export default drawTimer;
