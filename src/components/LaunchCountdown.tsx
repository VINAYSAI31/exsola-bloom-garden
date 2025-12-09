import { LaunchTimeLeft, LAUNCH_DATETIME } from "@/hooks/useLaunchCountdown";
import { AlarmClock, Rocket } from "lucide-react";

type LaunchCountdownProps = {
  timeLeft: LaunchTimeLeft;
  isLaunched: boolean;
  label?: string;
  variant?: "banner" | "card" | "overlay";
};

const CountdownValue = ({ value, unit }: { value: number; unit: string }) => (
  <div className="flex flex-col items-center justify-center px-3 py-2 bg-white/70 backdrop-blur rounded-lg shadow-sm min-w-[72px]">
    <span className="text-2xl font-bold text-gray-900 tabular-nums">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-xs uppercase tracking-wide text-gray-600">{unit}</span>
  </div>
);

const LaunchCountdown = ({
  timeLeft,
  isLaunched,
  label = "Come back in",
  variant = "banner",
}: LaunchCountdownProps) => {
  const containerStyles =
    variant === "banner"
      ? "w-full"
      : variant === "overlay"
        ? "w-full max-w-lg"
        : "w-full md:w-auto";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 via-white to-green-50 shadow-lg ${containerStyles}`}
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#16a34a,_transparent_45%)]" />
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-800">
            {isLaunched ? <Rocket className="w-6 h-6" /> : <AlarmClock className="w-6 h-6" />}
          </div>
          <div>
            <p className="text-sm font-semibold text-green-800">
              {isLaunched ? "We're live!" : label}
            </p>
            <p className="text-xs text-gray-600">Launches Dec 10, 10:00 AM IST</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isLaunched ? (
            <span className="text-lg font-semibold text-green-800">Shop unlocked</span>
          ) : (
            <>
              <CountdownValue value={timeLeft.days} unit="Days" />
              <span className="text-lg font-semibold text-gray-500">:</span>
              <CountdownValue value={timeLeft.hours} unit="Hours" />
              <span className="text-lg font-semibold text-gray-500">:</span>
              <CountdownValue value={timeLeft.minutes} unit="Min" />
              <span className="text-lg font-semibold text-gray-500">:</span>
              <CountdownValue value={timeLeft.seconds} unit="Sec" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaunchCountdown;

