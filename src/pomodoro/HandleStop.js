import { secondsToDuration } from "../utils/duration";

function HandleStop(
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
) {
  if (isTimerRunning) {
    setIsTimerRunning((prevState) => !prevState);
    setActiveTimer((prevState) => (prevState = "Focusing"));
    setSecondsLeft((prevState) => focusTime * 60);
    setTimeLeft((prevState) => secondsToDuration(secondsLeft));
    setTimeSurpassed((prevState) => (prevState = 0));
    setDisplayTimer((prevState) => (prevState = hide));
  }
}

export default HandleStop;
