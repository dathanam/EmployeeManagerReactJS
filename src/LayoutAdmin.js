import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './AdminComponent/Header';
import User from './AdminComponent/User';
import Footer from './AdminComponent/Footer';
import Department from './AdminComponent/Department';
import Employee from './AdminComponent/Employee';
import NewEmployee from './AdminComponent/NewEmployee';
import Test from './AdminComponent/Test';

function LayoutAdmin() {
    return (
        <div>
            <Router>
                <Header />
                <Switch>
                    <Route path="/admin" exact component={User} />
                    <Route path="/admin/department" component={Department} />
                    <Route path="/admin/employee" component={Employee} />
                    <Route path="/admin/newemployee" component={NewEmployee} />
                    <Route path="/admin/test" component={Test} />
                </Switch>
                <Footer />
            </Router>
        </div>
    );
}

export default LayoutAdmin;