import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import { TimesheetContextProvider } from "../../contexts/TimesheetContext";
import { AuthContextProvider } from "../../contexts/AuthContext";

import { TimesheetTable } from "../../components/TimesheetTable";

describe("Timesheet Component", () => {
  it("renders correctly", () => {
    render(
      <AuthContextProvider>
        <TimesheetContextProvider>
          <TimesheetTable />
        </TimesheetContextProvider>
      </AuthContextProvider>
    );
    expect(screen.getByText("Date")).toBeInTheDocument();
  });

  const tree = renderer
    .create(
      <AuthContextProvider>
        <TimesheetContextProvider>
          <TimesheetTable />
        </TimesheetContextProvider>
      </AuthContextProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
