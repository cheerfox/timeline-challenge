import { TimeInput } from "./components/TimeInput";

type PlayControlsProps = {
  time: number;
  setTime: (time: number) => void;
};

export const PlayControls = ({ time, setTime }: PlayControlsProps) => {
  // TODO: implement time <= maxTime
  const handleTimeChange = (time: number) => {
    setTime(time);
  };

  return (
    <div
      className="flex items-center justify-between border-b border-r border-solid border-gray-700 
 px-2"
      data-testid="play-controls"
    >
      {/* Input logic extract to child component */}
      <fieldset className="flex gap-1">
        Current
        <TimeInput
          dataTestid="time"
          min={0}
          max={2000}
          step={10}
          defaultValue={0}
          time={time}
          onTimeChange={handleTimeChange}
        />
      </fieldset>
      -
      <fieldset className="flex gap-1">
        <input
          className="bg-gray-700 px-1 rounded"
          type="number"
          data-testid="max-time"
          min={100}
          max={2000}
          step={10}
          defaultValue={2000}
        />
        Duration
      </fieldset>
    </div>
  );
};
