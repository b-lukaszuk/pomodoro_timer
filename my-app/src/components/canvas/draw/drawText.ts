function drawText(canv: HTMLCanvasElement, ctx: CanvasRenderingContext2D,
    text: string, color: string, displAtBottom: boolean = true) {

    let fontSize: number = parseInt((canv.height / 8).toFixed(0));
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = color;

    if (displAtBottom) {
        ctx.fillText(text, canv.width / 2, canv.height - fontSize * 1.2);
    } else { // middle
        ctx.fillText(text, canv.width / 2, canv.height / 2);
    }
}

export default drawText;
