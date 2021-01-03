import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import DashboardTest from "./components/pages/DashboardTest";
import ProfilePage from "./components/pages/ProfilePage";
import Map from "./components/pages/Map";
import Marker from "./components/layout/Marker";
import { AuthProvider } from "./components/Auth";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={DashboardTest} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/map" component={Map} />
          <Route exact path="/marker" component={Marker} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
