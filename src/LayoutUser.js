import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './AdminComponent/Login'
import SignUp from './AdminComponent/SignUp';
import Header from './UserComponent/Header';
import Footer from './UserComponent/Footer';
import Home from './UserComponent/Home';

function LayoutUser() {
    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/admin/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default LayoutUser;