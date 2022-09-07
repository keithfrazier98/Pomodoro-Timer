import React, { useEffect, useState } from "react";
import useInterval from "../utils/useInterval";
import { minutesToDuration, secondsToDuration } from "../utils/duration";
import FocusAndBreakBtns from "./FocusAndBreakBtns";
import PlayPauseStopBtns from "./PlayPauseStopBtns";
import DisplayTimer from "./DisplayTimer";

const hide = {
  display: "none",
};
const show = {
  display: "block",
};

export const oneMin = 30000;

function Pomodoro() {
  // Timer starts out paused
  const [focusTime, setFocusTime] = useState(300000 * 5);
  const [breakTime, setBreakTime] = useState(300000);

  // set to `focusing` / `breaking` / `paused` / false
  const [timerRunning, setTimerRunning] = useState(false);

  const [totalMs, setTotalMs] = useState(focusTime);
  const [msPassed, setMsPassed] = useState(0);

  useInterval(() => {
    console.log("Interval is running");
    if (!!timerRunning && timerRunning !== "paused") {
      if (msPassed === totalMs) {
        setTimerRunning(timerRunning === "breaking" ? "focusing" : "breaking");
        // https://bigsoundbank.com/UPLOAD/wav/2632.wav
        new Audio("https://bigsoundbank.com/UPLOAD/wav/0292.wav").play();
      }
      setMsPassed(msPassed + 1000);
    }
  }, 1000);

  useEffect(() => {
    if (timerRunning !== "paused") {
      switch (timerRunning) {
        case "focusing":
          setTotalMs(focusTime);
          break;
        case "breaking":
          setTotalMs(breakTime);
          break;
        case false:
          setTotalMs(focusTime)
          setMsPassed(0)
          break;
        default:
          throw new Error("Invalid timerRunning value: ", timerRunning);
      }
    }
  }, [timerRunning]);

  return (
    <div className="pomodoro">
      {/*call FocusAndBreakBtns with props*/}
      <FocusAndBreakBtns
        focusTime={focusTime}
        setFocusTime={setFocusTime}
        breakTime={breakTime}
        setBreakTime={setBreakTime}
        timerRunning={timerRunning}
      />
      <div className="row">
        {/*call PlayPauseBtns component with props*/}
        <PlayPauseStopBtns
          timerRunning={timerRunning}
          setTimerRunning={setTimerRunning}
        />
      </div>
      {/* call DisplayTimer component with props */}
      <DisplayTimer
        msPassed={msPassed}
        totalMs={totalMs}
        timerRunning={timerRunning}
      />
    </div>
  );
}

export default Pomodoro;
