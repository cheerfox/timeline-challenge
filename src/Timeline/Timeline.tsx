import { useState, useRef } from "react";
import { Playhead } from "./Playhead";
import { Ruler } from "./Ruler";
import { TrackList } from "./TrackList";
import { KeyframeList } from "./KeyframeList";
import { PlayControls } from "./PlayControls";
import { useSyncScroll } from "../hooks/useSyncScroll";

export const Timeline = () => {
  // FIXME: performance concerned
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(2000);

  const rulerRef = useRef<HTMLDivElement>(null);
  const keyframeListRef = useRef<HTMLDivElement>(null);
  const trackListRef = useRef<HTMLDivElement>(null);
  
  
  const { scrollLeft: rulerScrollLeft } = useSyncScroll(rulerRef, keyframeListRef, "horizontal");
  useSyncScroll(trackListRef, keyframeListRef, "vertical");

  return (
    <div
      className="relative h-[300px] w-full grid grid-cols-[300px_1fr] grid-rows-[40px_1fr] 
    bg-gray-800 border-t-2 border-solid border-gray-700"
      data-testid="timeline"
    >
      <PlayControls
        time={time}
        setTime={setTime}
        duration={duration}
        setDuration={setDuration}
      />
      <Ruler
        ref={rulerRef}
        duration={duration}
        setTime={setTime}
      />
      <TrackList ref={trackListRef} />
      <KeyframeList
        ref={keyframeListRef}
        duration={duration}
      />
      <Playhead time={time} rulerScrollLeft={rulerScrollLeft} />
    </div>
  );
};
