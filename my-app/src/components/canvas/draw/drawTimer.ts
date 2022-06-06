import drawArc from "./drawArc";
import drawText from "./drawText";
import { formatTime } from "../../../utils/format";
import secsToHrMinsSecs from "../../../utils/secsToHrsMinsSecs";
import ITime from "../../../interfaces/ITime";

function drawTimer(canv: HTMLCanvasElement, ctx: CanvasRenderingContext2D,
    secsStart: number, secsLeft: number,
    displDigitsAtBottom: boolean = true): void {

    let time: ITime = secsToHrMinsSecs(secsLeft);
    let color: string = (secsLeft <= 0) ? "red" : "grey";

    drawArc(ctx, canv.height / 2, canv.width / 2, 240, 360, 10, "lightgrey");
    drawArc(ctx, canv.height / 2, canv.width / 2, 240,
        360 * (1 - secsLeft / secsStart), 10, "red");

    drawText(canv, ctx, formatTime(time.hrs, time.mins, time.secs),
        color, displDigitsAtBottom);

}

export default drawTimer;
