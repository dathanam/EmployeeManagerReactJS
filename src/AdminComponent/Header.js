import React, { useRef, useState, useEffect } from 'react';
import '../Style/AdminHeader.css'
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode"
import { useHistory } from 'react-router-dom';

function Header() {
    const history = useHistory();
    const DataLocalStorage = localStorage.getItem("accessToken");

    function viewNameUser() {
        if (DataLocalStorage != null) {
            const decode = jwt_decode(DataLocalStorage);
            return (
                <h4><i className="far fa-user"></i> {decode.username}</h4>
            )
        }
        else {
            return (
                <h4><i className="far fa-user"></i> No User</h4>
            )
        }
    }

    function Logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("loginFrist");
        localStorage.removeItem("time");
        history.push("/")
        window.location.reload()
    }

    const [num, setNum] = useState(localStorage.getItem("time"));
    let intervalRef = useRef();

    const decreaseNum = () => setNum((prev) => prev - 1);

    useEffect(() => {
        intervalRef.current = setInterval(decreaseNum, 1000);

        return () => clearInterval(intervalRef.current);
    }, []);

    localStorage.setItem("time", num);

    if(num === 60){
        alert("Thời gian còn lại là 1 phút. Vui lòng lưu lại toàn bộ thông tin trong phiên đăng nhập")
    }else if(num === 0){
        alert("Hết phiên đăng nhập")      
        Logout();
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
                        <button className="loggoutBtn" onClick={() =>{Logout()}}>
                            LOGOUT
                        </button>
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
                    <li>
                        <Link to="/admin/signup" className="nav-link">SignUp</Link>
                    </li>
                    <div className="AdminLog">
                        {viewNameUser()}
                    </div>
                    <li>
                        <button className="loggoutBtn" onClick={() =>{Logout()}}>
                            <i class="fas fa-sign-out-alt"></i>
                        </button>

                    </li>

                </ul>

            </div>
        </div>
    );
}

export default Header;