import React from "react";


function ChangeTime(
  testid,
  isTimerRunning,
  focusTime,
  breakTime,
  setBreakTime,
  setActiveTimeLength,
  setFocusTime
) {
  if (!isTimerRunning) {
    switch (testid) {
      case "decrease-focus":
        if (focusTime > 5) {
          setFocusTime((prevState) => (prevState = focusTime - 5));
        }
        setActiveTimeLength((prevState) => (prevState = focusTime));

        break;
      case "increase-focus":
        if (focusTime < 60) {
          setFocusTime((prevState) => (prevState = focusTime + 5));
        }
        setActiveTimeLength((prevState) => (prevState = focusTime));

        break;
      case "decrease-break":
        if (breakTime > 1) {
          setBreakTime((prevState) => (prevState = breakTime - 1));
        }
        setActiveTimeLength((prevState) => (prevState = breakTime));

        break;
      case "increase-break":
        if (breakTime < 15) {
          setBreakTime((prevState) => (prevState = breakTime + 1));
        }
        setActiveTimeLength((prevState) => (prevState = breakTime));

        break;
    }
  }
  return <p>some jsx</p>;
}

export default ChangeTime;
