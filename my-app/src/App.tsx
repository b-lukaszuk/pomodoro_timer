import React, { ReactElement, useEffect, useState } from 'react';

import Button from "./components/Button";
import Canvas from "./components/canvas/Canvas";
import Checkbox from "./components/Checkbox";
import getCurTime from "./utils/getCurTime";
import ITime from "./interfaces/ITime";
import TextInput from "./components/TextInput";

import './App.css';

const App: React.FC = (): ReactElement<HTMLElement> => {

    // clock
    const delayMs: number = 1000;
    const [hrs, setHrs]: [number, Function] = useState(getCurTime().hrs);
    const [mins, setMins]: [number, Function] = useState(getCurTime().mins);
    const [secs, setSecs]: [number, Function] = useState(getCurTime().secs);
    const [displClock, setDisplClock]: [boolean, Function] = useState(true);
    // timer
    const [timerStartMs, setTimerStartMs]: [number, Function] = useState(0);
    const [timerEndMs, setTimerEndMs]: [number, Function] = useState(0);
    const [timerNowMs, setTimerNowMs]: [number, Function] = useState(0);
    const [displTimer, setDisplTimer]: [boolean, Function] = useState(false);
    const [timerInput, setTimerInput]: [string, Function] = useState("");
    const [isTimerOn, setIsTimerOn]: [boolean, Function] = useState(false);
    const [alarmAtEnd, setAlarmAtEnd]: [boolean, Function] = useState(true);

    const toggleDisplClock = (): void => {
        setDisplClock((prevState: boolean) => !prevState);
    };

    const toggleDisplTimer = (): void => {
        setDisplTimer((prevState: boolean) => !prevState);
    };

    const toggleAlarmAtEnd = (): void => {
        setAlarmAtEnd((prevState: boolean) => !prevState);
    }

    const isBetween = (anInt: number,
        minIncl: number, maxIncl: number): boolean => {
        return (anInt >= minIncl) && (anInt <= maxIncl);
    }

    const isInputCorrect = (text: string): boolean => {
        let pattern: RegExp = /[^0-9]/;
        let onlyDigits: boolean = !pattern.test(text)
        return onlyDigits && isBetween(parseInt(text), 1, 300);
    }

    const handleTypingDigits = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setTimerInput(event.target.value);
    };

    const startTimer = (): void => {
        if (isInputCorrect(timerInput)) {
            let now: number = new Date().getTime();
            setTimerStartMs(now);
            setTimerNowMs(now);
            setTimerEndMs(now + (parseInt(timerInput) * 60 * 1000));
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
            if (isTimerOn) {
                setTimerNowMs(new Date().getTime());
            }
            if (isTimerOn && timerEndMs <= new Date().getTime()) {
                setIsTimerOn(false);
            }
        }

        let timerId1: NodeJS.Timeout = setInterval(() => {
            updateTime();
        }, delayMs);
        return () => {
            clearInterval(timerId1);
        }
    }, [hrs, mins, secs, isTimerOn, timerStartMs, timerEndMs]);

    useEffect(() => {
        let soundToPlay: HTMLAudioElement = new Audio(
            "https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg");
        if (!isTimerOn && alarmAtEnd &&
            (timerEndMs < new Date().getTime())) {
            soundToPlay.play();
        }
        const timerId2: NodeJS.Timeout = setTimeout(() => {
            soundToPlay.pause();
        }, 3000);
        return () => clearTimeout(timerId2);
    }, [alarmAtEnd, isTimerOn, timerEndMs]);

    useEffect(() => {
        document.title = "Pomodoro Timer";
    }, [])

    return (
        <div className="App">
            <h1>Pomodoro Timer</h1>
            <Checkbox name="clock" displayedText={"show clock"}
                checked={displClock} onClick={toggleDisplClock} />
            <Checkbox name="timer" displayedText={"show timer"}
                checked={displTimer} onClick={toggleDisplTimer} />
            {displTimer && !isTimerOn &&
                <TextInput name={"timerInput"}
                    label={"Time in minutes (integer, 1-300)"}
                    pattern={"[1-9][0-9]{0,3}"}
                    placeholder="20"
                    value={timerInput}
                    changeHandler={handleTypingDigits}
                />}
            {displTimer && !isTimerOn &&
                <Checkbox name="alarmSound" displayedText={"play alarm sound at end"}
                    checked={alarmAtEnd} onClick={toggleAlarmAtEnd} />}
            {displTimer && !isTimerOn &&
                <Button displText={"start timer"}
                    onClick={startTimer} />}
            {displTimer && isTimerOn &&
                <Button displText={"stop timer"}
                    onClick={stopTimer} />}
            {
                (displClock || displTimer) &&
                <Canvas hrs={hrs} mins={mins} secs={secs} displayClock={displClock}
                    timerStartMs={timerStartMs} timerEndMs={timerEndMs}
                    timerNowMs={timerNowMs}
                    displayTimer={displTimer} />
            }
            {!displClock && !displTimer &&
                <h2>Nothing to display. Really?</h2>
            }
            <p>The timer is not recommended when precise time measurement is required</p>
        </div>
    );
}

export default App;
