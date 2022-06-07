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
    // js is (pseudo)asynchronous, since e.g. drawing operations are blocking
    // the main thread a bit, so correction is in order
    const delayMs: number = 980; // for now it is hardcoded
    const [hrs, setHrs]: [number, Function] = useState(getCurTime().hrs);
    const [mins, setMins]: [number, Function] = useState(getCurTime().mins);
    const [secs, setSecs]: [number, Function] = useState(getCurTime().secs);
    const [displClock, setDisplClock]: [boolean, Function] = useState(true);
    // timer
    const [timerSecsStart, setTimerSecsStart]: [number, Function] = useState(0);
    const [secsLeft, setSecsLeft]: [number, Function] = useState(0);
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
            setTimerSecsStart(parseInt(timerInput) * 60);
            setSecsLeft(parseInt(timerInput) * 60);
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
            if (isTimerOn && secsLeft > 0) {
                setSecsLeft((prevSecsLeft: number) => prevSecsLeft - 1);
            } else {
                setIsTimerOn(false);
                setTimerSecsStart(0);
            }
        }

        let timerId1 = setTimeout(() => {
            updateTime();
        }, delayMs);
        return () => {
            clearTimeout(timerId1);
        }
    }, [hrs, mins, secs, secsLeft, isTimerOn]);

    useEffect(() => {
        let soundToPlay: HTMLAudioElement = new Audio(
            "https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg");
        if (!isTimerOn && alarmAtEnd &&
            (timerSecsStart !== 0) && (secsLeft === 0)) {
            soundToPlay.play();
        }
        const timerId2 = setTimeout(() => {
            soundToPlay.pause();
        }, 3000);
        return () => clearTimeout(timerId2);
    }, [alarmAtEnd, isTimerOn, secsLeft, timerSecsStart]);

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
                    timerStartSecs={timerSecsStart} timerLeftSecs={secsLeft}
                    displayTimer={displTimer} />
            }
            {!displClock && !displTimer &&
                <h2>Nothing to display. Really?</h2>
            }
        </div>
    );
}

export default App;
