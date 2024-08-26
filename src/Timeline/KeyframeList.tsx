import { forwardRef } from "react";
import { Segment } from "./Segment";

interface KeyframeListProps {
  duration: number;
}

export const KeyframeList = forwardRef(
  ({ duration }: KeyframeListProps, ref: React.Ref<HTMLDivElement>) => {
    // TODO: implement scroll sync with `Ruler` and `TrackList`
    const segmentCount = 10;

    return (
      <div
        ref={ref}
        className="px-4 min-w-0 overflow-auto"
        data-testid="keyframe-list"
      >
        {Array.from({ length: segmentCount }).map((_, index) => (
          <Segment key={index} duration={duration} />
        ))}
        {/* <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment /> */}
      </div>
    );
  }
);
