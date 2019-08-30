import React from "react";
import { Switch, Route } from "react-router-dom";

//import the components
import Main from "./components/Main";
import Signin from "./components/Signin";
import Login from "./components/Login";
import Create from "./components/Create";
import Post from "./components/Post";

import Auth from "./components/auth/auth";

const Routes = () => (
   
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/create" component={Auth(Create)} />
            <Route exact path="/post/:id" component={Post} />
        </Switch>
       
) 

export default Routes;