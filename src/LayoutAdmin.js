import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './AdminComponent/Header';
import User from './AdminComponent/User';
import Footer from './AdminComponent/Footer';
import Department from './AdminComponent/Department';

function LayoutAdmin() {
    return (
        <div>
            <Router>
                <Header />
                <Switch>
                    <Route path="/admin" exact component={User} />
                    <Route path="/admin/department" component={Department} />
                </Switch>
                <Footer />
            </Router>
        </div>
    );
}

export default LayoutAdmin;