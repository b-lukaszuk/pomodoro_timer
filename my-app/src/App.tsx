import React, { ReactElement, useEffect, useState } from 'react';

import Canvas from "./components/canvas/Canvas";
import Checkbox from "./components/Checkbox";
import getCurTime from "./utils/getCurTime";
import ITime from "./interfaces/ITime";

import './App.css';

const App: React.FC = (): ReactElement<HTMLElement> => {

    const [hrs, setHrs]: [number, Function] = useState(getCurTime().hrs);
    const [mins, setMins]: [number, Function] = useState(getCurTime().mins);
    const [secs, setSecs]: [number, Function] = useState(getCurTime().secs);
    const [displClock, setDisplClock]: [boolean, Function] = useState(true);

    const toggleDisplClock = (): void => {
        setDisplClock((prevState: boolean) => !prevState);
    }

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
    }, [hrs, mins, secs]);

    return (
        <div className="App">
            <h1>Pomodoro Timer</h1>
            <Checkbox name="clock" displayedText={"show clock"}
                checked={displClock} onClick={toggleDisplClock} />
            <Canvas hrs={hrs} mins={mins} secs={secs} displayClock={displClock} />
        </div>
    );
}

export default App;
