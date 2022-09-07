import React, { useRef } from "react";
import classNames from "../utils/class-names";

function PlayPauseStopBtns({ timerRunning, setTimerRunning }) {
  const lastTimerRunning = useRef(timerRunning);
  function playPauseHandler() {
    switch (timerRunning) {
      case false:
        console.log("Starting timer");
        setTimerRunning("focusing");
        lastTimerRunning.current = "focusing";
        break;
      case "focusing":
      case "breaking":
        lastTimerRunning.current = timerRunning;
        setTimerRunning("paused");
        break;
      case "pause":
        setTimerRunning(lastTimerRunning.current);
      default:
        throw new Error("Inavlid timerRunning value: ", timerRunning);
        break;
    }
  }

  function stopHandler() {
    setTimerRunning(false);
    
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
              "oi-media-play": timerRunning === "paused",
              "oi-media-pause": timerRunning !== "paused",
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
