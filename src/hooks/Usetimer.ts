import React, { useCallback } from "react";
export const useTimer = ({ seconds = 2 }) => {
  const [time, setTime] = React.useState(seconds);
  const [isRunning, setIsRunning] = React.useState(false);
  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);
  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTime(seconds);
  }, [seconds]);

  React.useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  React.useEffect(() => {
    if (time === 0) {
      pauseTimer();
      resetTimer();
      setTime(0);
    }
  }, [time]);
  return { time, startTimer, resetTimer, pauseTimer };
};
