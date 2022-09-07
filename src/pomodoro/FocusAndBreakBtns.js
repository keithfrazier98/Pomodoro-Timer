import React from "react";
import { minutesToDuration } from "../utils/duration/index";
// import { oneMin } from "./Pomodoro";

const minMs = 300000;
const maxMsFocus = 300000 * 5;
const maxMsBreak = 300000 * 3;
const fiveMin = 60000 * 5;

function FocusAndBreakBtns({
  focusTime,
  setFocusTime,
  breakTime,
  setBreakTime,
  timerRunning,
}) {
  function changeTime({
    target: {
      dataset: { testid },
    },
  }) {
    if (!!!timerRunning) {
      switch (testid) {
        case "decrease-focus":
          if (focusTime > minMs) {
            setFocusTime(focusTime - fiveMin);
          }
          break;
        case "increase-focus":
          if (focusTime < maxMsFocus) {
            setFocusTime(focusTime + fiveMin);
          }
          break;
        case "decrease-break":
          if (breakTime > minMs) {
            setBreakTime(breakTime - fiveMin);
          }
          break;
        case "increase-break":
          if (breakTime < maxMsBreak) {
            setBreakTime(breakTime + fiveMin);
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
            Focus Duration: {minutesToDuration(focusTime / 60000)}
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
              Break Duration: {minutesToDuration(breakTime / 60000)}
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
