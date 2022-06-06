import drawArc from "./drawArc";
import { formatTime } from "../../../utils/format";
import secsToHrMinsSecs from "../../../utils/secsToHrsMinsSecs";
import ITime from "../../../interfaces/ITime";

function drawTimer(canv: HTMLCanvasElement, ctx: CanvasRenderingContext2D,
    secsStart: number, secsLeft: number): void {

    let fontSize: number = parseInt((canv.height / 8).toFixed(0));
    let time: ITime = secsToHrMinsSecs(secsLeft);

    drawArc(ctx, canv.height / 2, canv.width / 2, 240, 360, 10, "lightgrey");
    drawArc(ctx, canv.height / 2, canv.width / 2, 240,
        360 * (1 - secsLeft / secsStart), 10, "red");

    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = (secsLeft <= 0) ? "red" : "grey";
    ctx.fillText(formatTime(time.hrs, time.mins, time.secs), (canv.width / 2),
        (canv.height - fontSize));

}

export default drawTimer;
