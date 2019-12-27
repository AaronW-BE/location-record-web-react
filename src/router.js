import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Index from './pages/index/index';
import Login from './pages/login/login';
import NotFound from "./pages/error/404";

const router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Index}/>
            <Route exact path="/login" component={Login}/>
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
);

export default router;