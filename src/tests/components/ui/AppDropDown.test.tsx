import { AppDropDown } from "@/components/ui/AppDropDown";
import { fireEvent, render, screen } from "@testing-library/react";

const options = [
  {
    label: "🌐 facebook",
    value: "facebook",
  },
  {
    label: (
      <>
        <div> 👑 Instagram</div>
      </>
    ),
    value: "Instagram",
  },
  {
    label: (
      <>
        <div> 🎵 Youtube</div>
      </>
    ),
    value: "Youtube",
  },
];

describe("Testing Component <AppDropDown/>", () => {
  test("should display a modal with the option labels if you click on it", () => {
    render(<AppDropDown options={options} />);
    const appDrop = screen.getByTestId("AppDropDown-test");

    fireEvent.click(appDrop);

    const option1 = screen.getByText("🌐 facebook");
    const option2 = screen.getByText("👑 Instagram");

    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  // test("Should display only the option selected", () => {
  //   render(<AppDropDown options={options} />);
  //   const appDrop = screen.getByTestId("AppDropDown-test");

  //   fireEvent.click(appDrop);

  //   const option1 = screen.getByText("🌐 facebook");
  //   const option2 = screen.getByText("👑 Instagram");

  //   fireEvent.click(option2);

  //   expect(option1).not.toBeInTheDocument();
  //   expect(screen.getByText("👑 Instagram")).toBeInTheDocument();
  // });
});
