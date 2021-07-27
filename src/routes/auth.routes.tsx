import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Home } from "../pages/Home";

export function AuthRoutes() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Redirect to={{ pathname: "/" }} />
      </Switch>
    </Router>
  );
}
