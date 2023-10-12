import { differenceInSeconds } from "date-fns";
import React, { useCallback } from "react";
export const useTimerCountDown = ({ seconds = 2 }) => {
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

export const useTimerDuration = (isRunning: boolean) => {
  const [seconds, setSeconds] = React.useState<number>(0);

  React.useEffect(() => {
    let interval: any;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, seconds]);

  return seconds;
};

// Return seconds from specific date to current date
export const useTimerFromTime = (date?: Date) => {
  const [seconds, setSeconds] = React.useState<number>(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(
        differenceInSeconds(
          new Date(),
          date ?? new Date("2023-10-11T113:03:00")
        )
      );
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [seconds]);

  return seconds;
};
