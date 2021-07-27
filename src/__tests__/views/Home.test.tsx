import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import { TimesheetContextProvider } from "../../contexts/TimesheetContext";
import { AuthContextProvider } from "../../contexts/AuthContext";

import { Home } from "../../views/Home";

describe("Home Component", () => {
  it("renders correctly", () => {
    render(
      <AuthContextProvider>
        <TimesheetContextProvider>
          <Home />
        </TimesheetContextProvider>
      </AuthContextProvider>
    );

    expect(screen.getByText("+ Add")).toBeInTheDocument();

    const tree = renderer
      .create(
        <AuthContextProvider>
          <TimesheetContextProvider>
            <Home />
          </TimesheetContextProvider>
        </AuthContextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
