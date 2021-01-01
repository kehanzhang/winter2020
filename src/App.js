import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dash from "./components/pages/Register";
import NavBar from "./components/layout/NavBar";
import { AuthProvider } from "./components/Auth";

const App = () => {
  return (
    <AuthProvider>
      <Router>
			<NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
					<Route exact path="/dashboard" component={Dash} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
