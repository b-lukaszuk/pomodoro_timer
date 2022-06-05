import React, { ReactElement } from 'react';

import Canvas from "./components/canvas/Canvas";

import './App.css';

const App: React.FC = (): ReactElement<HTMLElement> => {
    return (
        <div className="App">
            Pomodoro Timer
            <Canvas greeting={"App.tsx says hello to Canvas.tsx"} />
        </div>
    );
}

export default App;
