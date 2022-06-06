import React, { ReactElement, useEffect, useRef } from "react";

import drawClock from "./draw/drawClock";
import drawTimer from "./draw/drawTimer";
import setCanvasDefaults from "./setCanvasDefaults";

import "./Canvas.css"

interface Props {
    hrs: number;
    mins: number;
    secs: number;
    displayClock: boolean;
    timerStartSecs: number;
    timerLeftSecs: number;
    displayTimer: boolean;
}

const Canvas: React.FC<Props> = (props): ReactElement<HTMLElement> => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const hrs: number = props.hrs;
    const mins: number = props.mins;
    const secs: number = props.secs;
    const displayClock: boolean = props.displayClock;
    const timerStartSecs: number = props.timerStartSecs;
    const timerLeftSecs: number = props.timerLeftSecs;
    const displayTimer: boolean = props.displayTimer;

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
        if (displayClock) {
            drawClock(canvas, ctx, hrs, mins, secs, 250, 250);
        }
        if (displayTimer) {
            drawTimer(canvas, ctx, timerStartSecs, timerLeftSecs);
        }
    }, [hrs, mins, secs, displayClock, timerStartSecs, timerLeftSecs, displayTimer]);

    return (
        <div>
            <canvas width="500" height="500" ref={canvasRef} className="canvas" />
        </div>
    );
};

export default Canvas;
