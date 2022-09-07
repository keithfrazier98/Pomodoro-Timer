import React from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration/index";

function DisplayTimer({ msPassed, totalMs, timerRunning }) {
  return timerRunning ? (
    <div>
      {/* TODO: This area should show only when a focus or break session is running or pauses */}
      <div className="row mb-2">
        <div className="col">
          {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
          <h2 data-testid="session-title">
            {timerRunning}{" "}
            {timerRunning !== "paused" ? `for ${totalMs / 60000} minutes` : ""}
          </h2>
          {/* TODO: Update message below to include time remaining in the current session */}
          <p className="lead" data-testid="session-sub-title">
            {secondsToDuration((totalMs - msPassed) / 1000)} remaining
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
              aria-valuenow={Math.trunc((msPassed / totalMs) * 100)} // TODO: Increase aria-valuenow as elapsed time increases
              style={{
                width: `${((msPassed / totalMs) * 100).toString()}%`,
              }} // TODO: Increase width % as elapsed time increases
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default DisplayTimer;
