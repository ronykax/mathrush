import React from "react";

function useTimer(interval: number) {
  const [timerTime, setTimerTime] = React.useState(0);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    if (running) {
      timer = setInterval(() => {
        setTimerTime((time) => time + 1);
      }, interval);
    }

    return () => clearInterval(timer);
  }, [running, interval]);

  const startTimer = () => {
    setRunning(true);
  }

  const stopTimer = () => {
    setRunning(false);
  }

  return { startTimer, stopTimer, timerTime }
}

export default useTimer;