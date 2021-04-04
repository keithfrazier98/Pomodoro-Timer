import React from "react";
import classNames from "../utils/class-names";
import { minutesToDuration } from "../utils/duration";

function PlayPauseStopBtns({
  isTimerRunning,
  setTotalTime,
  focusTime,
  setSecondsLeft,
  timeSurpassed,
  setIsTimerRunning,
  setDisplayTimer,
  totalTime,
  show,
  setActiveTimer,
  setTimeLeft,
  setTimeSurpassed,
  secondsLeft,
  hide,
}) {
  function playPauseHandler() {
      setTotalTime(focusTime * 60);
      setSecondsLeft((prevState) => (prevState = totalTime - timeSurpassed));
      setIsTimerRunning((prevState) => !prevState);
      setDisplayTimer((prevState) => (prevState = show));
  }

  function stopHandler() {
    if (isTimerRunning) {
      setIsTimerRunning((prevState) => !prevState);
      setActiveTimer((prevState) => (prevState = "Focusing"));
      setTimeLeft((prevState) => prevState = minutesToDuration(focusTime));
      setTimeSurpassed((prevState) => (prevState = 1));
      setDisplayTimer((prevState) => (prevState = hide));
      setSecondsLeft((prevState) => prevState = focusTime * 60);
    }
  }

  return (
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
          onClick={playPauseHandler}
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
          onClick={stopHandler}
        >
          <span className="oi oi-media-stop" />
        </button>
      </div>
    </div>
  );
}

export default PlayPauseStopBtns;
