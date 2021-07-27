import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

import { useAuth } from "../hooks/useAuth";

export function Routes() {
  const { isSigned } = useAuth();

  if (isSigned) {
    return <AppRoutes />;
  }

  return <AuthRoutes />;
}
