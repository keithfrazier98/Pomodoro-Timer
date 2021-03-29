import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { minutesToDuration, secondsToDuration } from "../utils/duration";
import "./Pomodoro.css";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [displayTimer, setDisplayTimer] = useState("hide");
  const [timeSurpassed, setTimeSurpassed] = useState(1);
  const [totalTime, setTotalTime] = useState(focusTime * 60);
  const [secondsLeft, setSecondsLeft] = useState(focusTime * 60);
  const [timeLeft, setTimeLeft] = useState(secondsToDuration(secondsLeft));
  const [activeTimer, setActiveTimer] = useState("Focusing");
  const [activeTimeLength, setActiveTimeLength] = useState(focusTime);

  useInterval(
    // ToDo: Implement what should happen when the timer is running
    () => {
      if (activeTimer === "Focusing" && secondsLeft > -1) {
        setTimeSurpassed((prevState) => (prevState = prevState + 1));
        setSecondsLeft(
          (prevState) => (prevState = totalTime - timeSurpassed) - 1
        );
        setTimeLeft(
          (prevState) =>
            (prevState = secondsToDuration(totalTime - timeSurpassed))
        );
      } else {
        if (secondsLeft === -1) {
          new Audio("https://bigsoundbank.com/UPLOAD/mp3/2349.mp3").play();
          setActiveTimer("On Break");
          setActiveTimeLength(breakTime);
          setTotalTime((prevState) => breakTime * 60);
          setTimeSurpassed((prevState) => (prevState = 1));
          setSecondsLeft((prevState) => (prevState = breakTime * 60) - 1);
        }
        if (activeTimer === "On Break") {
          setTimeSurpassed((prevState) => (prevState = prevState + 1));
          setSecondsLeft(
            (prevState) => (prevState = totalTime - timeSurpassed) - 1
          );
          setTimeLeft(
            (prevState) =>
              (prevState = secondsToDuration(totalTime - timeSurpassed))
          );
          if (timeSurpassed === totalTime) {
            new Audio("https://bigsoundbank.com/UPLOAD/mp3/2349.mp3").play();
            setActiveTimer((prevState) => "Focusing");
            setSecondsLeft((prevState) => focusTime * 60);
            setTotalTime((prevState) => focusTime * 60);
            setTimeSurpassed((prevState) => 1);
            setActiveTimeLength(focusTime);
          }
        }
      }
      //console.log(timeLeft);
      //console.log(secondsLeft);
      //console.log(timeSurpassed);
      //console.log(totalTime);
    },
    isTimerRunning ? 1000 : null
  );

  function handleStop() {
    if (isTimerRunning) {
      setIsTimerRunning((prevState) => !prevState);
      setActiveTimer((prevState) => (prevState = "Focusing"));
      setSecondsLeft((prevState) => focusTime * 60);
      setTimeLeft((prevState) => secondsToDuration(secondsLeft));
      setTimeSurpassed((prevState) => (prevState = 0));
      setDisplayTimer((prevState) => (prevState = "hide"));
    }
    //console.log(timeLeft);
    //console.log(secondsLeft);
    //console.log(timeSurpassed);
    //console.log(totalTime);
  }

  function playPause() {
    setTotalTime(focusTime * 60);
    setSecondsLeft((prevState) => (prevState = totalTime - timeSurpassed));
    setIsTimerRunning((prevState) => !prevState);
    setDisplayTimer((prevState) => (prevState = "show"));
  }
  function changeTime({
    target: {
      dataset: { testid },
    },
  }) {
    console.log(testid);
    if (!isTimerRunning) {
      switch (testid) {
        case "decrease-focus":
          if (focusTime > 5) {
            setFocusTime(prevState => prevState = focusTime - 5);
          }
          setActiveTimeLength(prevState => prevState = focusTime);

          break;
        case "increase-focus":
          if (focusTime < 60) {
            setFocusTime(prevState => prevState = focusTime + 5);
          }
          setActiveTimeLength(prevState => prevState = focusTime);

          break;
        case "decrease-break":
          if (breakTime > 1) {
            setBreakTime(prevState => prevState = breakTime - 1);
          }
          setActiveTimeLength(prevState => prevState = breakTime);

          break;
        case "increase-break":
          if (breakTime < 15) {
            setBreakTime(prevState => prevState = breakTime + 1);
          }
          setActiveTimeLength(prevState => prevState = breakTime);

          break;
      }
    }
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {minutesToDuration(focusTime)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                onClick={changeTime}
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                onClick={changeTime}
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {minutesToDuration(breakTime)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  onClick={changeTime}
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  onClick={changeTime}
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={handleStop}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <div className={displayTimer}>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <h2 data-testid="session-title">
              {activeTimer} for {minutesToDuration(activeTimeLength)} minutes
            </h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {timeLeft} remaining
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={timeSurpassed -1} // TODO: Increase aria-valuenow as elapsed time increases
                style={{
                  width: `${((timeSurpassed / totalTime) * 100).toString()}%`,
                }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
