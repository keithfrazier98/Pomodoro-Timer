import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import {secondsToDuration } from "../utils/duration";
import HandleState from "./HandleState";
import ChangeTime from "./ChangeTime";
import HandleStop from "./HandleStop";
import PlayPause from "./PlayPause";
import BreakBtns from "./BreakBtns";
import FocusBtns from "./FocusBtns";
import PlayPauseBtns from "./PlayPauseBtns";
import DisplayTimer from "./DisplayTimer"

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

  function handleStop() {
    HandleStop(
      isTimerRunning,
      setIsTimerRunning,
      setActiveTimer,
      setSecondsLeft,
      setTimeLeft,
      setTimeSurpassed,
      setDisplayTimer,
      focusTime,
      secondsLeft,
      hide
    );
  }

  function playPause() {
    PlayPause(
      setTotalTime,
      focusTime,
      setSecondsLeft,
      timeSurpassed,
      setIsTimerRunning,
      setDisplayTimer,
      totalTime,
      show
    );
  }

  function changeTime({
    target: {
      dataset: { testid },
    },
  }) {
    ChangeTime(
      testid,
      isTimerRunning,
      focusTime,
      breakTime,
      setBreakTime,
      setActiveTimeLength,
      setFocusTime
    );
  }

  return (
    <div className="pomodoro">
      <div className="row">
        {/*call FocusBtn components with props*/}
        <FocusBtns focusTime={focusTime} />
        {/* call BreakBtns components with props*/}
        <BreakBtns breakTime={breakTime} />
      </div>
      <div className="row">
        {/*call PlayPauseBtns component with props*/}
        <PlayPauseBtns isTimerRunning={isTimerRunning} />
      </div>
      {/* call DisplayTimer component with props */}
      <DisplayTimer
        displayTimer = {displayTimer}
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
