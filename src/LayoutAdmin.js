import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './AdminComponent/Header';
import User from './AdminComponent/User';
import Footer from './AdminComponent/Footer';
import SignUp from './AdminComponent/SignUp';
import Login from './AdminComponent/Login';

function LayoutAdmin() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/admin" exact component={User} />
                <Route path="/admin/signup" component={SignUp} />
                <Route path="/admin/login" component={Login} />
            </Switch>
            <Footer />
        </Router>
    );
}

export default LayoutAdmin;