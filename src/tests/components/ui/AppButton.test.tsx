import { fireEvent, render, screen } from "@testing-library/react";

import {
  AppButton,
  PRIMARY_CLASS,
  SECONDARY_CLASS,
} from "@components/ui/AppButton";

describe("<AppButton/>", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Should render a button element", () => {
    render(<AppButton data-testid="AppButton-test" />);
    const appButton = screen.getByTestId("AppButton-test");

    expect(appButton).toBeInstanceOf(HTMLButtonElement);
  });

  test("Should permit add children props", () => {
    render(
      <AppButton data-testid="AppButton-test">
        <span> Test Button </span>
      </AppButton>,
    );
    const appButton = screen.getByTestId("AppButton-test");

    expect(appButton).toHaveTextContent("Test Button");
  });

  test("Should permit add button properties", () => {
    const handleClick = vi.fn();

    render(
      <AppButton data-testid="AppButton-test" onClick={handleClick}>
        Test
      </AppButton>,
    );
    const appButton = screen.getByTestId("AppButton-test");

    fireEvent.click(appButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("should apply correct className for 'secondary' variant", () => {
    render(
      <AppButton data-testid="AppButton-test" variant={"secondary"}>
        Variant
      </AppButton>,
    );
    const appButton = screen.getByTestId("AppButton-test");

    const variantSecondary = SECONDARY_CLASS;

    expect(appButton).toHaveClass(variantSecondary, { exact: true });
  });

  test("should apply correct className for 'primary' variant", () => {
    render(
      <AppButton data-testid="AppButton-test" variant={"primary"}>
        Variant
      </AppButton>,
    );
    const appButtonPrimary = screen.getByTestId("AppButton-test");

    const variantPrimary = PRIMARY_CLASS;
    expect(appButtonPrimary).toHaveClass(variantPrimary, { exact: true });
  });
});
