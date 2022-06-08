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

    let timeLeft: ITime = secsToHrMinsSecs((timerEndMs - timerNowMs) / 1000);
    let colorFont: string = timerEndMs <= timerNowMs ? "red" : "dimgray";
    let colorMainPath: string = timerEndMs <= timerNowMs ? "red" : "dimgray";
    let textToDisplay: string =
        timerEndMs <= timerNowMs
            ? "00:00:00"
            : formatTime(timeLeft.hrs, timeLeft.mins, timeLeft.secs);
    let timeLeftToTimeTotalInDeg: number =
        (360 * (timerNowMs - timerStartMs)) / (timerEndMs - timerStartMs);

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
            numsToDeg(60 - timeLeft.secs, 60),
            "rgba(255, 0, 0, 0.3)"
        );
    }

    drawText(canv, ctx, textToDisplay, colorFont, displDigitsAtBottom);
}

export default drawTimer;
