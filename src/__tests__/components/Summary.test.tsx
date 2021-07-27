import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";

import { Summary } from "../../components/Summary";

describe("Summary component", () => {
  it("renders correctly", () => {
    render(<Summary />);

    expect(screen.getByText("Total Worked Hours")).toBeInTheDocument();
    expect(screen.getByText("Total Overtime Hours")).toBeInTheDocument();
    expect(screen.getByText("Total Undertime Hours")).toBeInTheDocument();
  });

  const tree = renderer.create(<Summary />).toJSON();
  expect(tree).toMatchSnapshot();
});
