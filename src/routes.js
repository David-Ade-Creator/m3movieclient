import React from 'react';
import { Switch, Route } from "react-router-dom";
import HomePage from 'Pages/HomePage';

function Routes(){
    return (
        <Switch>
            <Route path="/" component={HomePage} exact/>
        </Switch>
    )
}

export default Routes;
