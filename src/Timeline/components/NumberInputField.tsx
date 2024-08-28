import { useEffect, useState } from "react";
import { roundIfDecimal, roundToNearestStep } from "../../utils";


interface NumberInputField {
  dataTestid: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  time: number;
  onChange: (time: number) => void;
}

const KEY = {
  ENTER: "Enter",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ESCAPE: "Escape",
};

/**
 * NumberInputField component
 * 
 * A customizable number input field with validation and keyboard navigation.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {string} props.dataTestid - The data-testid attribute for testing
 * @param {number} props.min - The minimum allowed value of the input
 * @param {number} props.max - The maximum allowed value of the input
 * @param {number} props.step - The step of the input
 * @param {number} props.defaultValue - The initial value of the input
 * @param {number} props.time - The current time value from Timeline component
 * @param {function} props.onChange - Callback function when the value changes
 * 
 * @example
 * <NumberInputField
 *   dataTestid="time-input"
 *   min={0}
 *   max={100}
 *   step={1}
 *   defaultValue={50}
 *   time={50}
 *   onChange={(newTime) => console.log(newTime)}
 * />
 */
export const NumberInputField = ({
  dataTestid,
  min,
  max,
  step,
  time,
  defaultValue,
  onChange,
}: NumberInputField) => {
  const [draft, setDraft] = useState<string>(defaultValue.toString());

  useEffect(() => {
    if (time.toString() !== draft) {
      setDraft(time.toString());
    }
  }, [time]);

  const validateTime = (time: number): number => {
    if (time < 0) return min;
    if (time < min) return min;
    if (time > max) return max;
    const formattedTime = roundToNearestStep(roundIfDecimal(time), step);

    return formattedTime;
  };

  const confirmTime = (draft: string) => {
    // non-numeric input or empty input
    if (draft.length === 0) {
      setDraft(time.toString());
      return;
    }

    const confirmTime = validateTime(Number(draft));
    onChange(confirmTime);
    setDraft(confirmTime.toString());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft(e.target.value);

    // handle click step button
    if (!(e.nativeEvent as InputEvent).inputType) {
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
    confirmTime(e.target.value);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      className="bg-gray-700 px-1 rounded w-[64px]"
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
