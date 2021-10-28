import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "Pages/HomePage";
import LoginPage from "Pages/AuthPages/login";
import RegisterPage from "Pages/AuthPages/register";
import ProtectedRoute from "Components/ProtectedRoutes";
import FavouritesPage from "Pages/FilteredPages";

function Routes() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => <ProtectedRoute {...props} Component={HomePage} />}
      />
      <Route
        exact
        path="/favourites"
        render={(props) => <ProtectedRoute {...props} Component={FavouritesPage} />}
      />
      <Route path="/login" component={LoginPage} exact />
      <Route path="/register" component={RegisterPage} exact />
    </Switch>
  );
}

export default Routes;
