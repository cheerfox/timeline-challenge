import { useEffect } from "react";
import { NumberInputField } from "./components/NumberInputField";

type PlayControlsProps = {
  time: number;
  setTime: (time: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
};

export const PlayControls = ({ time, setTime, duration, setDuration }: PlayControlsProps) => {
  // TODO: implement time <= maxTime
  const handleTimeChange = (time: number) => {
    setTime(time);
  };

  const handleDurationChange = (duration: number) => {
    setDuration(duration);
  };

  useEffect(() => {
    if (time > duration) {
      
      setTime(duration);
    }
  }, [time, duration, setTime]);

  return (
    <div
      className="flex items-center justify-between border-b border-r border-solid border-gray-700 
 px-2"
      data-testid="play-controls"
    >
      {/* Input logic extract to child component */}
      <fieldset className="flex gap-1">
        Current
        <NumberInputField
          dataTestid="time"
          min={0}
          max={duration}
          step={10}
          defaultValue={0}
          time={time}
          onChange={handleTimeChange}
        />
      </fieldset>
      -
      <fieldset className="flex gap-1">
        <NumberInputField
          dataTestid="max-time"
          min={100}
          max={6000}
          step={10}
          defaultValue={2000}
          time={duration}
          onChange={handleDurationChange}
        />
        Duration
      </fieldset>
    </div>
  );
};
