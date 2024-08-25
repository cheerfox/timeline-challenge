import { useState } from "react";

interface TimeInputProps {
  dataTestid: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  time: number;
  onTimeChange: (time: number) => void;
}

const KEY = {
  ENTER: "Enter",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ESCAPE: "Escape",
};

const roundIfDecimal = (value: number) => {
  return Number.isInteger(value) ? value : Math.round(value);
};

export const TimeInput = ({
  dataTestid,
  min,
  max,
  step,
  time,
  defaultValue,
  onTimeChange,
}: TimeInputProps) => {
  const [draft, setDraft] = useState<string>(defaultValue.toString());

  const validateTime = (time: number): number => {
    if (time < 0) return 0;
    if (time > max) return max;
    const formattedTime = roundIfDecimal(time);

    return formattedTime;
  };

  const confirmTime = (draft: string) => {
    // non-numeric input or empty input
    if (draft.length === 0) {
      setDraft(time.toString());
      return;
    }

    const confirmTime = validateTime(Number(draft));
    onTimeChange(confirmTime);
    setDraft(confirmTime.toString());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("onChange", e.target.value);

    setDraft(e.target.value);

    // handle click step button
    if (!(e.nativeEvent as InputEvent).inputType) {
      console.log(e.nativeEvent);
      confirmTime(e.target.value);
    }
  };

  // onClick component 內部處理就好
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      e.target.select();
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log("blur", e);

    confirmTime(e.target.value);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    const target = e.target as HTMLInputElement;

    switch (e.key) {
      case KEY.ENTER:
        confirmTime(draft);
        target.blur();
        break;
      case KEY.ARROW_UP:
        target.select();
        break;
      case KEY.ARROW_DOWN:
        target.select();
        break;
      case KEY.ESCAPE:
        setDraft(time.toString());
        setTimeout(() => {
          target.blur();
        }, 0);
        break;
    }
  };

  return (
    <input
      className="bg-gray-700 px-1 rounded"
      type="number"
      data-testid={dataTestid}
      min={min}
      max={max}
      step={step}
      value={draft}
      onClick={handleClick}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyUp={handleKeyUp}
    />
  );
};
