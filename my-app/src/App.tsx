import React, { ReactElement, useEffect, useState } from 'react';

import Canvas from "./components/canvas/Canvas";
import ITime from "./interfaces/ITime";
import getCurTime from "./utils/getCurTime";

import './App.css';

const App: React.FC = (): ReactElement<HTMLElement> => {

    const [hrs, setHrs]: [number, Function] = useState(getCurTime().hrs);
    const [mins, setMins]: [number, Function] = useState(getCurTime().mins);
    const [secs, setSecs]: [number, Function] = useState(getCurTime().secs);

    useEffect(() => {
        const updateTime = (): void => {
            let time: ITime = getCurTime();
            setHrs(time.hrs);
            setMins(time.mins);
            setSecs(time.secs);
        }

        let timerId1 = setInterval(() => {
            updateTime();
        }, 1000);
        return () => {
            clearInterval(timerId1);
        }
    })

    return (
        <div className="App">
            Pomodoro Timer
            <Canvas hrs={hrs} mins={mins} secs={secs} />
        </div>
    );
}

export default App;
