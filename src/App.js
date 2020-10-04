import React from "react";
import Header from "./Components/Header/Header";
import "./App.css";
import "./firebase/config";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Profile from "./Components/Profile/Profile";
import { UserProvider } from "./firebase/UserProvider";
import Login from "./Components/Login/Login";
import ProfileRedirect from "./router/ProfileRedirect";
import PrivateRoute from "./router/PrivateRoute";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Switch>
            <ProfileRedirect exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/profile/:id" component={Profile} />
            <ProfileRedirect exact path="/login" component={Login} />
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
