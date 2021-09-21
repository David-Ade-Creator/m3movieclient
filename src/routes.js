import React from 'react';
import { Switch, Route } from "react-router-dom";
import { URL } from './Components/Constants';
import MovieHome from './Pages/MoviesPage';
import MovieDetails from './Pages/MoviesPage/details';
import MyList from './Pages/Profile/mylist';
import LoginPage from "./Pages/Auth/login";
import RegisterPage from "./Pages/Auth/register";
import ProtectedRoute from './Components/ProtectedRoute';

function Routes() {
    return (
        <Switch>
            <Route path={URL.SigninPage} component={LoginPage} exact/>
            <Route path={URL.SignupPage} component={RegisterPage} exact/>
            <Route path={URL.HomePage} component={MovieHome} exact/>
            <Route path={URL.DetailPage} component={MovieDetails} exact/>
            <Route
          exact
          path={URL.MyList}
          render={(props) => (
            <ProtectedRoute {...props} Component={MyList} />
          )}
        />
        </Switch>
    )
}

export default Routes
