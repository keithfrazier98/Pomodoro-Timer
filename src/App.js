import React from "react";
import "./App.css";
import Pomodoro from "./pomodoro/Pomodoro";

function App() {
  return (
    <div className="App">
      <div className="centerContainer">
        <div className="contentContainer">
          <header className="App-header container">
            <h1>Pomodoro Timer</h1>
          </header>
          <div>
            <Pomodoro />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
