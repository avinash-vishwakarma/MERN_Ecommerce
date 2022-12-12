import { useEffect, useState } from "react";

const useTimer = (initialMinutes, inSeconds, afterComplete) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(inSeconds);
  const [startTimer, setStartTimer] = useState(false);

  useEffect(() => {
    const otpTimer = setInterval(() => {
      setSeconds((old) => {
        if (old === 0) {
          setMinutes((minutesOld) => {
            if (minutesOld === 0) {
              clearInterval(otpTimer);
              setMinutes(4);
              setSeconds(60);
              afterComplete();
            }
            return minutesOld - 1;
          });
          return 60;
        }
        return old - 1;
      });
    }, 100);
  }, [startTimer]);

  return [minutes, seconds, setStartTimer];
};

export default useTimer;
