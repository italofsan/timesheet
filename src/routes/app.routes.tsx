import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Home } from "../views/Home";
import UserLayout from "../components/UserLayout";

export function AppRoutes() {
  return (
    <Router>
      <UserLayout>
        <Switch>
          <Route path='/app' exact component={Home} />
          <Redirect to={{ pathname: "/app" }} />
        </Switch>
      </UserLayout>
    </Router>
  );
}
