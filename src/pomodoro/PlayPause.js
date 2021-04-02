function PlayPause(
  setTotalTime,
  focusTime,
  setSecondsLeft,
  timeSurpassed,
  setIsTimerRunning,
  setDisplayTimer,
  totalTime,
  show
) {
  setTotalTime(focusTime * 60);
  setSecondsLeft((prevState) => (prevState = totalTime - timeSurpassed));
  setIsTimerRunning((prevState) => !prevState);
  setDisplayTimer((prevState) => (prevState = show));
}

export default PlayPause;
