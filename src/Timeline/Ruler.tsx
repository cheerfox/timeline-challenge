import { forwardRef, useRef, useState, useEffect } from "react";
import { roundToNearestStep } from "../utils";
import { RULER_STEP } from "../utils/contanst";

interface RulerProps {
  duration: number;
  setTime: (time: number) => void;
}

export const Ruler = forwardRef(
  ({ duration, setTime }: RulerProps, ref: React.Ref<HTMLDivElement>) => {
    // TODO: implement mousedown and mousemove to update time and Playhead position
    const isDragging = useRef(false);
    const isPressed = useRef(false);
    const [mouseStartX, setMouseStartX] = useState(0);
    const MOUSE_MOVE_THRESHOLD = 5;

    useEffect(() => {
      const handleGlobalMouseUp = () => {
        isPressed.current = false;
        isDragging.current = false;
      };

      window.addEventListener('mouseup', handleGlobalMouseUp);
      return () => {
        window.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }, []);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      // prevent dragging to select text
      e.preventDefault();
      isPressed.current = true;
      setMouseStartX(e.nativeEvent.offsetX);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        e.relatedTarget instanceof HTMLElement &&
        e.relatedTarget?.id === "playhead" &&
        isPressed.current
      ) {
        return;
      }
      isDragging.current = false;
      isPressed.current = false;
    };

    
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isPressed.current) {
        const currentX = e.nativeEvent.offsetX;
        if (Math.abs(currentX - mouseStartX) > MOUSE_MOVE_THRESHOLD) {
          isDragging.current = true;
        }
      }
      if (isPressed.current && isDragging.current) {
        setTime(roundToNearestStep(e.nativeEvent.offsetX, RULER_STEP));
      }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDragging.current || isPressed.current) {
        setTime(roundToNearestStep(e.nativeEvent.offsetX, RULER_STEP));
      }

      isDragging.current = false;
      isPressed.current = false;
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
          data-testid="ruler-bar"
          className="w-[2000px] h-6 rounded-md bg-white/25"
          style={{ width: `${duration}px` }}
        ></div>
      </div>
    );
  }
);
