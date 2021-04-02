import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { minutesToDuration, secondsToDuration } from "../utils/duration";
import HandleState from "./HandleState";
import ChangeTime from "./ChangeTime";
import HandleStop from "./HandleStop";
import PlayPause from "./PlayPause";

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
      <div style={displayTimer}>
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
                aria-valuenow={Math.trunc((timeSurpassed / totalTime) * 100)} // TODO: Increase aria-valuenow as elapsed time increases
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
