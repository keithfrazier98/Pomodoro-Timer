import React from "react";
import {minutesToDuration} from "../utils/duration/index"

function DisplayTimer({displayTimer,activeTimeLength, activeTimer, timeLeft,timeSurpassed,totalTime}) {
  return (
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
  );
}

export default DisplayTimer