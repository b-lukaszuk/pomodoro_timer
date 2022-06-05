import React, { ReactElement, useEffect, useRef } from "react";

import drawClock from "./draw/drawTime";
import setCanvasDefaults from "./setCanvasDefaults";

import "./Canvas.css"

interface Props {
    hrs: number;
    mins: number;
    secs: number;
}

const Canvas: React.FC<Props> = (props): ReactElement<HTMLElement> => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const hrs: number = props.hrs;
    const mins: number = props.mins;
    const secs: number = props.secs;

    useEffect(() => {
        const canvas: HTMLCanvasElement | null = canvasRef.current;
        if (canvas === null) {
            return undefined;
        }
        setCanvasDefaults(canvas);
        const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (ctx === null) {
            return undefined;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawClock(canvas, ctx, hrs, mins, secs, 250, 250);
    }, [hrs, mins, secs]);

    return (
        <div>
            <canvas width="500" height="500" ref={canvasRef} className="canvas" />
        </div>
    );
};

export default Canvas;
