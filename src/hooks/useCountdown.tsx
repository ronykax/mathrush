import React from "react";

function useCountdown(interval: number, startAt: number) {
  const [countdownTime, setCountdownTime] = React.useState(startAt);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    if (running) {
      timer = setInterval(() => {
        setCountdownTime((time) => time - 1);
      }, interval);
    }

    return () => clearInterval(timer);
  }, [running, interval]);

  const startCountdown = () => {
    setRunning(true);
  }

  const stopCountdown = () => {
    setRunning(false);
  }

  return { startCountdown, stopCountdown, countdownTime }
}

export default useCountdown;