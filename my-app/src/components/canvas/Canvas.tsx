import React, { ReactElement, useEffect, useRef } from "react";

import setCanvasDefaults from "./setCanvasDefaults";

import "./Canvas.css"

interface Props {
    greeting: string;
}

const Canvas: React.FC<Props> = (props): ReactElement<HTMLElement> => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const greeting: string = props.greeting;

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
        console.log("Canvas.tsx received the following message");
        console.log(greeting);
    }, [greeting]);

    return (
        <div>
            <canvas width="500" height="500" ref={canvasRef} className="canvas" />
        </div>
    );
};

export default Canvas;
