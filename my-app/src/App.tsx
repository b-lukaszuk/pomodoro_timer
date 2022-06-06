import React, { ReactElement, useEffect, useState } from 'react';

import Button from "./components/Button";
import Canvas from "./components/canvas/Canvas";
import Checkbox from "./components/Checkbox";
import getCurTime from "./utils/getCurTime";
import ITime from "./interfaces/ITime";
import TextInput from "./components/TextInput";

import './App.css';

const App: React.FC = (): ReactElement<HTMLElement> => {

    const [hrs, setHrs]: [number, Function] = useState(getCurTime().hrs);
    const [mins, setMins]: [number, Function] = useState(getCurTime().mins);
    const [secs, setSecs]: [number, Function] = useState(getCurTime().secs);
    const [displClock, setDisplClock]: [boolean, Function] = useState(true);
    const [timerSecs, setTimerSecs]: [number, Function] = useState(120);
    const [secsLeft, setSecsLeft]: [number, Function] = useState(120);
    const [displTimer, setDisplTimer]: [boolean, Function] = useState(false);
    const [timerInput, setTimerInput]: [string, Function] = useState("");
    const [isTimerOn, setIsTimerOn]: [boolean, Function] = useState(false);

    const toggleDisplClock = (): void => {
        setDisplClock((prevState: boolean) => !prevState);
    };

    const toggleDisplTimer = (): void => {
        setDisplTimer((prevState: boolean) => !prevState);
    };

    const isBetween = (anInt: number,
        minIncl: number, maxIncl: number): boolean => {
        return (anInt >= minIncl) && (anInt <= maxIncl);
    }

    const isInputCorrect = (text: string): boolean => {
        let pattern: RegExp = /[^0-9]/;
        let onlyDigits: boolean = !pattern.test(text)
        return onlyDigits && isBetween(parseInt(text), 1, 1440);
    }

    const handleTypingDigits = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setTimerInput(event.target.value);
    };

    const startTimer = (): void => {
        if (isInputCorrect(timerInput)) {
            setTimerSecs(parseInt(timerInput) * 60);
            setSecsLeft(parseFloat(timerInput) * 60);
            setIsTimerOn(true);
        } else {
            window.alert("Incorrect input. Change it and try again");
        }
    }

    const stopTimer = (): void => {
        setIsTimerOn(false);
    }

    useEffect(() => {
        const updateTime = (): void => {
            let time: ITime = getCurTime();
            setHrs(time.hrs);
            setMins(time.mins);
            setSecs(time.secs);
            if (secsLeft > 0) {
                setSecsLeft((prevSecsLeft: number) => prevSecsLeft - 1);
            }
        }

        let timerId1 = setInterval(() => {
            updateTime();
        }, 1000);
        return () => {
            clearInterval(timerId1);
        }
    }, [hrs, mins, secs, secsLeft]);

    return (
        <div className="App">
            <h1>Pomodoro Timer</h1>
            <Checkbox name="clock" displayedText={"show clock"}
                checked={displClock} onClick={toggleDisplClock} />
            <Checkbox name="timer" displayedText={"show timer"}
                checked={displTimer} onClick={toggleDisplTimer} />
            {displTimer &&
                <TextInput name={"timerInput"}
                    label={"type minutes (1-1440)"}
                    pattern={"[1-9][0-9]{0,3}"}
                    placeholder="20"
                    value={timerInput}
                    changeHandler={handleTypingDigits}
                />}
            {displTimer &&
                <Button displText={"start timer"}
                    onClick={startTimer} />}
            {displTimer &&
                <Button displText={"stop timer"}
                    onClick={stopTimer} />}
            <Canvas hrs={hrs} mins={mins} secs={secs} displayClock={displClock}
                timerStartSecs={timerSecs} timerLeftSecs={secsLeft} timerOn={isTimerOn} />
        </div>
    );
}

export default App;
