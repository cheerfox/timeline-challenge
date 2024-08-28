import { render, screen } from "@testing-library/react";
import { PlayControls } from "../Timeline/PlayControls";
import userEvent from "@testing-library/user-event";

describe("PlayControls", () => {
  const defaultProps = {
    time: 0,
    setTime: jest.fn(),
    duration: 2000,
    setDuration: jest.fn(),
  };

  function setup(jsx: React.ReactElement) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  }

  it("should render PlayControls component", () => {
    render(<PlayControls {...defaultProps} />);
    expect(screen.getByTestId("play-controls")).toBeInTheDocument();
  });

  it("if current Time is greater than duration, it should be set to duration", async () => {
    const { user } = setup(<PlayControls {...defaultProps} />);
    const currentTimeInput = screen.getByTestId("time");

    await user.type(currentTimeInput, "3000");
    await user.type(currentTimeInput, "{enter}");
    expect(currentTimeInput).toHaveValue(2000);
  });

  it("Current Time adjusts if it exceeds the newly set Duration", async () => {
    const { user } = setup(<PlayControls {...defaultProps} />);
    const currentTimeInput = screen.getByTestId("time");
    const durationInput = screen.getByTestId("max-time");

    await user.type(currentTimeInput, "1000");
    await user.tab();
    await user.type(durationInput, "500{enter}");
    expect(durationInput).toHaveValue(500);
    expect(currentTimeInput).toHaveValue(500);
  });

  it("Duration is always between 100ms and 6000ms", async () => {
    const { user } = setup(<PlayControls {...defaultProps} />);
    const durationInput = screen.getByTestId("max-time");

    await user.type(durationInput, "50{enter}");
    expect(durationInput).toHaveValue(100);
    
    await user.type(durationInput, "8000{enter}");
    expect(durationInput).toHaveValue(6000);
  });
});
