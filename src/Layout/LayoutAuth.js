import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from '../Auth/Login/Login.jsx';
import SignUp from '../Auth/SignUp/SignUp.jsx';
import ChangePass from '../Auth/ChangePassword/ChangePassword.jsx';

function LayoutAuth() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/changepassword" component={ChangePass} />
                </Switch>
            </Router>
        </div>
    );
}

export default LayoutAuth;