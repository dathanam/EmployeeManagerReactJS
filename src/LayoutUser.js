import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './UserComponent/Login'
import SignUp from './UserComponent/SignUp';
import Header from './UserComponent/Header';
import Footer from './UserComponent/Footer';
import Home from './UserComponent/Home';
import ChangePassword from './UserComponent/ChangePassword';

function LayoutUser() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route path="/changepassword" component={ChangePassword} />
            </Switch>
            <Footer />
        </Router>
    );
}

export default LayoutUser;