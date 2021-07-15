import React from 'react';
import '../Style/AdminHeader.css'
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode"

function Header() {

    const DataLocalStorage = localStorage.getItem("accessToken");

    function viewNameUser() {
        if (DataLocalStorage != null) {
            const decode = jwt_decode(DataLocalStorage);
            return (
                <h4><i className="far fa-user"></i> {decode.username}</h4>
            )
        }
        else{
            return (
                <h4><i className="far fa-user"></i> No User</h4>
            )
        }
    }

    return (      
        <div className="adminHeader">
            <div className="adminLogo">
                <img src="https://newwave.vn/wp-content/uploads/2020/02/logo-nws-2_latest.png" alt="logo" />
            </div>

            <div className="navMobileUsername">
                {viewNameUser()}
            </div>

            <label htmlFor="navMobileInput" className="adminNavbarBtn">
                <i className="fas fa-bars"></i>
            </label>
            <input type="checkbox" id="navMobileInput" className="navInput"></input>
            <label htmlFor="navMobileInput" className="adminNavOverlay"></label>
            <div className="adminListNavbar-Mobile">
                <label htmlFor="navMobileInput" className="adminListNavbar-Mobile-Close">
                    <i className="fas fa-times"></i>
                </label>
                <ul>
                    <li>
                        <i className="fas fa-users"></i>
                        <Link to="/admin" className="nav-link">User</Link>
                    </li>
                    <li>
                        <i className="fas fa-layer-group"></i>
                        <Link to="/admin/department" className="nav-link">Department</Link>
                    </li>
                    <li>
                        <i className="far fa-user"></i>
                        <Link to="/admin/employee" className="nav-link">Employee</Link>
                    </li>
                    <li>
                        <i className="fas fa-sign-in-alt"></i>
                        <Link to="/admin/login" className="nav-link">logout</Link>
                    </li>
                </ul>
            </div>



            <div className="adminListNavbar">
                <ul>
                    <li>
                        <Link to="/admin" className="nav-link">User</Link>
                    </li>
                    <li>
                        <Link to="/admin/department" className="nav-link">Department</Link>
                    </li>
                    <li>
                        <Link to="/admin/employee" className="nav-link">Employee</Link>
                    </li>
                    <div className="AdminLog">
                        {viewNameUser()}
                    </div>
                </ul>

            </div>
        </div>
    );
}

export default Header;