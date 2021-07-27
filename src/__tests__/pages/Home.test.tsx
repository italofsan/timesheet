import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Home } from "../../pages/Home";
import { AuthContext } from "../../contexts/AuthContext";

afterEach(cleanup);

function renderHome(contextProps: any) {
  return render(
    <AuthContext.Provider value={contextProps}>
      <Home />
    </AuthContext.Provider>
  );
}

let contextValue = {
  user: {},
  signInWithGoogle: jest.fn(),
  signOut: jest.fn(),
  isSigned: false,
  setIsSigned: jest.fn(),
};

describe("Home page component", () => {
  it("renders correctly", () => {
    render(<Home />);

    expect(screen.getByText("Login With Google")).toBeInTheDocument();

    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should login function have been called", () => {
    renderHome(contextValue);
    const signInWithGoogleMocked = contextValue.signInWithGoogle;

    const loginButton = screen.getByRole("loginButton") as HTMLButtonElement;
    userEvent.click(loginButton);

    expect(signInWithGoogleMocked).toHaveBeenCalled();
  });
});
