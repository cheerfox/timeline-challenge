import { roundToNearestStep } from "../utils";
import { RULER_STEP } from "../utils/contanst";

type PlayheadProps = {
  time: number;
  rulerScrollLeft: number;
};

export const Playhead = ({ time, rulerScrollLeft }: PlayheadProps) => {
  const playheadPosition = roundToNearestStep(time - rulerScrollLeft, RULER_STEP);
  
  return (
    <div
      id="playhead"
      className="absolute left-[316px] h-full border-l-2 border-solid border-yellow-600 z-10"
      data-testid="playhead"
      style={{ 
        transform: `translateX(calc(${playheadPosition}px - 50%))`,
        visibility: playheadPosition < -18 ? "hidden" : "visible"
       }}
    >
      <div className="absolute border-solid border-[5px] border-transparent border-t-yellow-600 -translate-x-1.5" />
    </div>
  );
};
