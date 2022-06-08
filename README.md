# pomodoro_timer

My take on [pomodoro timer](https://en.wikipedia.org/wiki/Pomodoro_Technique).
Writing a count down timer in React or Vanilla JS would be way too easy.
So I guess I will add some visual flair with canvas.

For practice I will write it with [React](https://pl.reactjs.org/) and [TS](https://www.typescriptlang.org/).

## Caveats

**The clock/timer is not recommended when precise time measurement is required.**

**The timer is not precise** due to JS (pseudo)asynchronicity some lags are to be expected especially in a long run.

Still, **I've taken some steps to improve the timer accuracy**, the inner count down timer was replaced with startTimeMs, endTimeMs, nowTimeMs (they rely on new Date.getTime(), so on epoch time in ms) **this should calibrate timer** at every update (every turn of inner setInterval).

## App online

**Deployed version -> [here](https://b-lukaszuk.github.io/pomodoro_timer/)**
