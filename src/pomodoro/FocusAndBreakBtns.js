import React from "react";
import { minutesToDuration } from "../utils/duration/index";

function FocusAndBreakBtns({
  focusTime,
  breakTime,
  isTimerRunning,
  setBreakTime,
  setActiveTimeLength,
  setFocusTime,
  setTimeLeft,
  totalTime,
  timeSurpassed,
}) {
  function changeTime({
    target: {
      dataset: { testid },
    },
  }) {
    if (!isTimerRunning) {
      switch (testid) {
        case "decrease-focus":
          if (focusTime > 5) {
            setFocusTime((prevState) => (prevState = focusTime - 5));
            setActiveTimeLength((prevState) => (prevState = focusTime - 5));
            setTimeLeft((prevState) => (prevState = minutesToDuration(focusTime - 5)))
          }

          break;

        case "increase-focus":
          if (focusTime < 60) {
            setFocusTime((prevState) => (prevState = focusTime + 5));
            setActiveTimeLength((prevState) => (prevState = focusTime + 5));
            setTimeLeft((prevState) => (prevState = minutesToDuration(focusTime + 5)))

          }

          break;

        case "decrease-break":
          if (breakTime > 1) {
            setBreakTime((prevState) => (prevState = breakTime - 1));
            setActiveTimeLength((prevState) => (prevState = breakTime - 1));
            setTimeLeft((prevState) => (prevState = minutesToDuration(focusTime - 1)))

          }

          break;

        case "increase-break":
          if (breakTime < 15) {
            setBreakTime((prevState) => (prevState = breakTime + 1));
            setActiveTimeLength((prevState) => (prevState = breakTime + 1));
            setTimeLeft((prevState) => (prevState = minutesToDuration(focusTime + 1)))

          }

          break;
      }
    }
  }

  return (
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
  );
}

export default FocusAndBreakBtns;
