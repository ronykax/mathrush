import React from "react";

function useTimer(interval: number) {
  const [time, setTime] = React.useState(0);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    if (running) {
      timer = setInterval(() => {
        setTime((time) => time + 1);
      }, interval);
    }

    return () => {
      clearInterval(timer);
    }
  }, [running, interval]);

  const start = () => {
    setRunning(true);
  }

  const stop = () => {
    setRunning(false);
  }

  return { start, stop, time }
}

export default useTimer;