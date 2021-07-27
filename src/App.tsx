import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TimesheetContextProvider } from "./contexts/TimesheetContext";
import { AuthContextProvider } from "./contexts/AuthContext";

import { theme } from "./styles/globalStyles";

import { Routes } from "./routes/index";

export function App() {
  return (
    <AuthContextProvider>
      <TimesheetContextProvider>
        <ThemeProvider theme={theme}>
          <Routes />
          <CssBaseline />
          <ToastContainer limit={3} transition={Slide} />
        </ThemeProvider>
      </TimesheetContextProvider>
    </AuthContextProvider>
  );
}
