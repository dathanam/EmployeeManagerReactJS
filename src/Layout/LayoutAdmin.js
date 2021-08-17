import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from '../Layout/Header/Header.jsx';
import User from '../Component/User/User.jsx';
import Department from '../Component/Department/Department.jsx';
import Employee from '../Component/Employee/Employee.jsx';
import NewEmployee from '../Component/Employee/CreateEmployee.jsx';
import SignUp from '../Auth/SignUp/SignUp.jsx';

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
                    <Route path="/signup" component={SignUp} />
                </Switch>
            </Router>
        </div>
    );
}

export default LayoutAdmin;