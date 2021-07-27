import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";

import UserLayout from "../../components/UserLayout";

describe("UserLayout Component", () => {
  it("renders correctly", () => {
    render(
      <UserLayout>
        <div>Layout rendered</div>
      </UserLayout>
    );

    expect(screen.getByText("Logout")).toBeInTheDocument();

    const tree = renderer
      .create(
        <UserLayout>
          <div>Layout rendered</div>
        </UserLayout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
