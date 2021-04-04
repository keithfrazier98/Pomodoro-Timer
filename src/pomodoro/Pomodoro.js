import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import { secondsToDuration } from "../utils/duration";
import HandleState from "./HandleState";
import FocusAndBreakBtns from "./FocusAndBreakBtns";
import PlayPauseStopBtns from "./PlayPauseStopBtns";
import DisplayTimer from "./DisplayTimer";

const hide = {
  display: "none",
};
const show = {
  display: "block",
};

function Pomodoro() {
  // Timer starts out paused

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [displayTimer, setDisplayTimer] = useState(hide);
  const [timeSurpassed, setTimeSurpassed] = useState(1);
  const [totalTime, setTotalTime] = useState(focusTime * 60);
  const [secondsLeft, setSecondsLeft] = useState(focusTime * 60);
  const [timeLeft, setTimeLeft] = useState(secondsToDuration(secondsLeft));
  const [activeTimer, setActiveTimer] = useState("Focusing");
  const [activeTimeLength, setActiveTimeLength] = useState(focusTime);

  useInterval(
    // ToDo: Implement what should happen when the timer is running
    () => {
      HandleState(
        breakTime,
        focusTime,
        activeTimer,
        secondsLeft,
        setTimeSurpassed,
        setSecondsLeft,
        setTimeLeft,
        totalTime,
        timeSurpassed,
        setActiveTimer,
        setActiveTimeLength,
        setTotalTime
      );
    },
    isTimerRunning ? 1000 : null
  );

  return (
    <div className="pomodoro">
      {/*call FocusAndBreakBtns with props*/}
      <FocusAndBreakBtns
        focusTime={focusTime}
        breakTime={breakTime}
        isTimerRunning={isTimerRunning}
        setBreakTime={setBreakTime}
        setActiveTimeLength={setActiveTimeLength}
        setFocusTime={setFocusTime}
        setActiveTimer={setActiveTimer}
        setTimeLeft = {setTimeLeft}
        totalTime = {totalTime}
        timeSurpassed = {timeSurpassed}
      />
      <div className="row">
        {/*call PlayPauseBtns component with props*/}
        <PlayPauseStopBtns
          isTimerRunning={isTimerRunning}
          setTotalTime={setTotalTime}
          focusTime={focusTime}
          setSecondsLeft={setSecondsLeft}
          timeSurpassed={timeSurpassed}
          setIsTimerRunning={setIsTimerRunning}
          setDisplayTimer={setDisplayTimer}
          totalTime={totalTime}
          show={show}
          setActiveTimer={setActiveTimer}
          setTimeLeft={setTimeLeft}
          setTimeSurpassed={setTimeSurpassed}
          secondsLeft={secondsLeft}
          hide={hide}
        />
      </div>
      {/* call DisplayTimer component with props */}
      <DisplayTimer
        displayTimer={displayTimer}
        activeTimeLength={activeTimeLength}
        activeTimer={activeTimer}
        timeLeft={timeLeft}
        timeSurpassed={timeSurpassed}
        totalTime={totalTime}
      />
    </div>
  );
}

export default Pomodoro;
