import { useEffect, useMemo, useState } from "react";

export type LaunchTimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// Target launch: Dec 10, 2025 10:00 AM IST (UTC+05:30)
export const LAUNCH_DATETIME = "2025-12-10T10:00:00+05:30";

const getTimeLeft = (target: number): LaunchTimeLeft => {
  const diff = target - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
};

const useLaunchCountdown = () => {
  const targetTimestamp = useMemo(
    () => new Date(LAUNCH_DATETIME).getTime(),
    []
  );
  const [timeLeft, setTimeLeft] = useState<LaunchTimeLeft>(() =>
    getTimeLeft(targetTimestamp)
  );
  const [isLaunched, setIsLaunched] = useState(() => Date.now() >= targetTimestamp);

  useEffect(() => {
    if (isLaunched) return;

    const interval = setInterval(() => {
      const remaining = getTimeLeft(targetTimestamp);
      const reached = Date.now() >= targetTimestamp;

      setTimeLeft(remaining);
      if (reached) {
        setIsLaunched(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isLaunched, targetTimestamp]);

  return { timeLeft, isLaunched };
};

export default useLaunchCountdown;

