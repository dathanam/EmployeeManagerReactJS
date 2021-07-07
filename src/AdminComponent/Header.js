import React from 'react';
import '../Style/AdminHeader.css'
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="adminHeader">
            <div className="adminLogo">
                <img src="https://inbienquangcao.vn/wp-content/uploads/2020/11/Logo-qua%CC%82n-%C4%91o%CC%A3%CC%82i-nha%CC%82n-da%CC%82n-Vie%CC%A3%CC%82t-Nam-nga%CC%80y-nay.png" alt="logo" />
            </div>

            <div className="navMobileUsername">
                <h3><i class="far fa-user"></i>UserName</h3>
            </div>

            <label for="navMobileInput" className="adminNavbarBtn">
                <i class="fas fa-bars"></i>
            </label>
            <input type="checkbox" id="navMobileInput" className="navInput"></input>
            <label for="navMobileInput" className="adminNavOverlay"></label>
            <div className="adminListNavbar-Mobile">
                <label for="navMobileInput" className="adminListNavbar-Mobile-Close">
                    <i class="fas fa-times"></i>
                </label>
                <ul>
                    <li>
                        <i class="fas fa-users"></i>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/admin" className="nav-link">User</Link>
                    </li>
                    <li>
                        <i class="fas fa-layer-group"></i>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/admin/department" className="nav-link">Department</Link>
                    </li>
                    <li>
                        <i class="far fa-user"></i>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/admin/employee" className="nav-link">Employee</Link>
                    </li>
                    <li>
                        <i class="fas fa-sign-in-alt"></i>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/admin/login" className="nav-link">logout</Link>
                    </li>
                </ul>
            </div>



            <div className="adminListNavbar">
                <ul>
                    <li>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/admin" className="nav-link">User</Link>
                    </li>
                    <li>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/admin/department" className="nav-link">Department</Link>
                    </li>
                    <li>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/admin/employee" className="nav-link">Employee</Link>
                    </li>
                    <div className="AdminLog">
                        <h3> <i class="far fa-user"></i> User Name</h3>
                    </div>
                </ul>

            </div>
        </div>
    );
}

export default Header;