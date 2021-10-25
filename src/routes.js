import React from 'react';
import { Switch, Route } from "react-router-dom";
import HomePage from 'Pages/HomePage';
import LoginPage from 'Pages/AuthPages/login';
import RegisterPage from 'Pages/AuthPages/register';

function Routes(){
    return (
        <Switch>
            <Route path="/" component={HomePage} exact/>
            <Route path="/login" component={LoginPage} exact/>
            <Route path="/register" component={RegisterPage} exact/>
        </Switch>
    )
}

export default Routes;
