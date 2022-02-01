import React from "react";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import { Redirect } from "react-router-dom";
import "./App.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";
import ChangePassword from "./Components/ChangePassword";
import UserDetails from "./Components/UserDetails";

class App extends React.Component {
  render() {
    const history = createBrowserHistory();
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <PrivateRoute path="/Dashboard/UserDetails" component={UserDetails} />
            <PublicRoute
              restricted={true}
              component={Signup}
              path="/Signup"
              exact
            />
            <PublicRoute restricted={true} component={Login} path="/" exact />
            <PrivateRoute
              component={ChangePassword}
              path="/Dashboard/ChangePassword"
              exact
            />
            <PrivateRoute component={Dashboard} path="/Dashboard" exact />
            <Route render={() => <Redirect to={{ pathname: "/" }} />} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
