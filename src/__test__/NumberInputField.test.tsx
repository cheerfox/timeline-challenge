import { render, screen } from "@testing-library/react";
import { NumberInputField } from "../Timeline/components/NumberInputField";
import userEvent from "@testing-library/user-event";

describe("NumberInputField", () => {
  const defaultProps = {
    dataTestid: "number-input-field",
    min: 0,
    max: 6000,
    step: 10,
    defaultValue: 1000,
    time: 1000,
    onChange: jest.fn(),
  };

  function setup(jsx: React.ReactElement) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  }

  it("should render NumberInputField component", () => {
    render(<NumberInputField {...defaultProps} />);
    expect(screen.getByTestId("number-input-field")).toBeInTheDocument();
  });

  it("updates displayed value while typing without triggering onChange", async () => {
    const { user } = setup(<NumberInputField {...defaultProps} />);
    const input = screen.getByTestId("number-input-field");

    await user.type(input, "200");
    expect(input).toHaveValue(200);
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it("Clicking outside the input field removes focus and changes the value", async () => {
    const { user } = setup(<NumberInputField {...defaultProps} />);

    const input = screen.getByTestId("number-input-field");
    expect(input).toHaveValue(1000);

    await user.type(input, "200");
    expect(input).toHaveValue(200);

    await user.click(document.body);
    expect(input).not.toHaveFocus();
    expect(defaultProps.onChange).toHaveBeenCalledWith(200);
  });

  it("Pressing up arrow or down arrow keys immediately changes the value", async () => {
    const { user } = setup(<NumberInputField {...defaultProps} />);
    const input = screen.getByTestId("number-input-field");

    await user.type(input, "{arrowup}");
    expect(defaultProps.onChange).toHaveBeenCalledWith(1010);    
    await user.type(input, "{arrowup}");
    expect(defaultProps.onChange).toHaveBeenCalledWith(1020);    

  });

  it("Presssing Enter key immediately changes the value and unfocuses the input field", async () => {
    const { user } = setup(<NumberInputField {...defaultProps} />);
    const input = screen.getByTestId("number-input-field");

    await user.type(input, "2000{enter}");
    expect(defaultProps.onChange).toHaveBeenCalledWith(2000);
    expect(input).not.toHaveFocus();
  });

  it("Pressing Escape reverts to the original value and removes focus", async () => {
    const { user } = setup(<NumberInputField {...defaultProps} />);
    const input = screen.getByTestId("number-input-field");

    await user.type(input, "300{esc}")

    expect(input).toHaveValue(defaultProps.defaultValue);
  });

  it("Leading zeros are automatically removed", async () => {
    const { user } = setup(<NumberInputField {...defaultProps} />);
    const input = screen.getByTestId("number-input-field");

    await user.type(input, "000300{enter}")
    expect(input).toHaveValue(300);
  });

  it("Negative values are automatically adjusted to the minimum allowed value", async () => {
    const { user } = setup(<NumberInputField {...defaultProps} />);
    const input = screen.getByTestId("number-input-field");

    await user.type(input, "-100{enter}")
    expect(input).toHaveValue(defaultProps.min);
  });

  it("Decimal values are automatically rounded to the nearest integer and nearest step", async () => {
    const { user } = setup(<NumberInputField {...defaultProps} />);
    const input = screen.getByTestId("number-input-field");

    await user.type(input, "10.5{enter}")
    expect(input).toHaveValue(10);

    await user.type(input, "15.1{enter}")
    expect(input).toHaveValue(20);
  });

  it("Invalid inputs (non-numeric) revert to the previous valid value", async () => {
    const { user } = setup(<NumberInputField {...defaultProps} />);
    const input = screen.getByTestId("number-input-field");

    await user.type(input, "non-numeric{enter}")
    expect(input).toHaveValue(defaultProps.defaultValue);
  });

  it("value are always multiples of 10ms", async () => {
    const { user } = setup(<NumberInputField {...defaultProps} />);
    const input = screen.getByTestId("number-input-field");

    await user.type(input, "15{enter}")
    expect(input).toHaveValue(20);

    await user.type(input, "131{enter}")
    expect(input).toHaveValue(130);
  });
});
