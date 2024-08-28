import { render, screen, fireEvent } from "@testing-library/react";
import { Timeline } from "../Timeline";
import userEvent from "@testing-library/user-event";

describe("Timeline", () => {
  function setup(jsx: React.ReactElement) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  }

  it("should render Timeline component", () => {
    render(<Timeline />);
    expect(screen.getByTestId("timeline")).toBeInTheDocument();
  });

  it("Ruler length visually represents the total Duration", async () => {
    const { user } = setup(<Timeline />);
    const rulerBar = screen.getByTestId("ruler-bar");
    const durationInput = screen.getByTestId("max-time");
    await user.type(durationInput, "1000{enter}");

    expect(rulerBar).toHaveStyle({ width: "1000px" });
  });

  it("Playhead moves when current time is changed", async () => {
    const { user } = setup(<Timeline />);
    const playhead = screen.getByTestId("playhead");
    const currentTimeInput = screen.getByTestId("time");
    await user.type(currentTimeInput, "300{enter}");
    expect(playhead).toHaveStyle({ transform: "translateX(calc(300px - 50%))" });
  });

  it("Clicking on the Ruler updates the Current Time and Playhead position", async () => {
    setup(<Timeline />);
    const ruler = screen.getByTestId("ruler");
    const playhead = screen.getByTestId("playhead");

    fireEvent.mouseDown(ruler, { clientX: 100 });
    fireEvent.mouseUp(ruler, { clientX: 100 });
    expect(playhead.style.transform).toBe('translateX(calc(100px - 50%))');
  });

  it("Vertical scrolling of the Track List is synchronized with the Keyframe List", async () => {
    setup(<Timeline />);
    const trackList = screen.getByTestId("track-list");
    const keyframeList = screen.getByTestId("keyframe-list");

    fireEvent.scroll(trackList, { target: { scrollTop: 100 } });
    expect(keyframeList.scrollTop).toBe(100);
  });

  it("Vertical scrolling of Keyframe List is synchronized with the Track List", async () => {
    setup(<Timeline />);
    const trackList = screen.getByTestId("track-list");
    const keyframeList = screen.getByTestId("keyframe-list");

    fireEvent.scroll(keyframeList, { target: { scrollTop: 300 } });
    expect(trackList.scrollTop).toBe(300);
  });

  it("Horizontal scrolling of Keyframe List is synchronized with the Ruler", async () => {
    setup(<Timeline />);
    const ruler = screen.getByTestId("ruler");
    const keyframeList = screen.getByTestId("keyframe-list");

    fireEvent.scroll(keyframeList, { target: { scrollLeft: 100 } });
    expect(ruler.scrollLeft).toBe(100);
  });

  it("Horizontal scrolling of Ruler is synchronized with the Keyframe List", async () => {
    setup(<Timeline />);
    const ruler = screen.getByTestId("ruler");
    const keyframeList = screen.getByTestId("keyframe-list");

    fireEvent.scroll(ruler, { target: { scrollLeft: 200 } });
    expect(keyframeList.scrollLeft).toBe(200);
  });


});
  
