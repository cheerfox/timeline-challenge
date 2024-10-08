interface SegmentProps {
  duration: number;
}

export const Segment = ({ duration }: SegmentProps) => {
  // TODO: resize based on time

  return (
    <div
      className="w-[2000px] py-2"
      data-testid="segment"
      style={{ width: `${duration}px` }}
    >
      <div className="h-6 rounded-md bg-white/10"></div>
    </div>
  );
};
