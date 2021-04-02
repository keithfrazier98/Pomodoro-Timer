import React from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration/index";

function HandleState(
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
) {
  if (activeTimer === "Focusing" && secondsLeft > 0) {
    setTimeSurpassed((prevState) => (prevState = prevState + 1));
    setSecondsLeft((prevState) => (prevState = totalTime - timeSurpassed));
    setTimeLeft(
      (prevState) => (prevState = secondsToDuration(totalTime - timeSurpassed))
    );
  } else {
    if (secondsLeft === 0) {
      new Audio("https://bigsoundbank.com/UPLOAD/mp3/2349.mp3").play();
      setActiveTimer("On Break");
      setActiveTimeLength((prevState) => (prevState = breakTime));
      setTotalTime((prevState) => (prevState = breakTime * 60));
      setTimeSurpassed((prevState) => (prevState = 1));
      setSecondsLeft((prevState) => (prevState = breakTime * 60) - 1);
      setTimeLeft((prevState) => (prevState = minutesToDuration(breakTime)));
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
}

export default HandleState;
