import { forwardRef, useRef } from "react";
import { roundToNearestStep } from "../utils";

interface RulerProps {
  duration: number;
  setTime: (time: number) => void;
}

// TODO: 還是有機會 mouseleave 的時候沒有 reset isDragging，還要測試
export const Ruler = forwardRef(
  ({ duration, setTime }: RulerProps, ref: React.Ref<HTMLDivElement>) => {
    // TODO: implement mousedown and mousemove to update time and Playhead position
    const isDragging = useRef(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      // TODO: make step to constants

      // prevent dragging to select text
      e.preventDefault();
      isDragging.current = true;
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        e.relatedTarget instanceof HTMLElement &&
        e.relatedTarget?.id === "playhead"
      ) {
        return;
      }
      isDragging.current = false;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDragging.current) {
        setTime(roundToNearestStep(e.nativeEvent.offsetX, 10));
      }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
      isDragging.current = false;
      setTime(roundToNearestStep(e.nativeEvent.offsetX, 10));
    };

    return (
      <div
        ref={ref}
        className="px-4 py-2 min-w-0 
      border-b border-solid border-gray-700 
      overflow-x-auto overflow-y-hidden"
        data-testid="ruler"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="w-[2000px] h-6 rounded-md bg-white/25"
          style={{ width: `${duration}px` }}
        ></div>
      </div>
    );
  }
);
