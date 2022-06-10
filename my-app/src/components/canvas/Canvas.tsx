import React, { ReactElement, useEffect, useRef } from "react";

import drawClock from "./draw/drawClock";
import drawTimer from "./draw/drawTimer";
import setCanvasDefaults from "./setCanvasDefaults";

import "./Canvas.css";

interface Props {
    isDisplayed: boolean;
    hrs: number;
    mins: number;
    secs: number;
    displayClock: boolean;
    timerStartMs: number;
    timerEndMs: number;
    timerNowMs: number;
    displayTimer: boolean;
}

const Canvas: React.FC<Props> = (props): ReactElement<HTMLElement> | null => {

    const canvasRef: React.MutableRefObject<HTMLCanvasElement | null> =
        useRef<HTMLCanvasElement | null>(null);
    const isDisplayed: boolean = props.isDisplayed;
    const hrs: number = props.hrs;
    const mins: number = props.mins;
    const secs: number = props.secs;
    const displayClock: boolean = props.displayClock;
    const timerStartMs: number = props.timerStartMs;
    const timerEndMs: number = props.timerEndMs;
    const timerNowMs: number = props.timerNowMs;
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
            drawTimer(
                canvas,
                ctx,
                timerStartMs,
                timerEndMs,
                timerNowMs,
                displayClock
            );
        }
    }, [
        hrs,
        mins,
        secs,
        displayClock,
        timerStartMs,
        timerEndMs,
        timerNowMs,
        displayTimer,
    ]);

    if (isDisplayed) {
        return (
            <div>
                <canvas width="500" height="500" ref={canvasRef} className="canvas" />
            </div>
        );
    } else {
        return null;
    }
};

export default Canvas;
