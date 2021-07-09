import React, { useState } from 'react';
import '../UserComponent/UserStyle/Header.css';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { useHistory } from "react-router-dom";

function Header() {
    const history = useHistory();
    const [redirect, setRedirect] = useState({
        redirect: true
    })

    let isLogin = localStorage.getItem("accessToken");
    // if (isLogin != null) {
    //     setRedirect({
    //         redirect: true
    //     })
    // }

    function checkkIsLogin() {
        if (redirect) {
            console.log("null");
            return <Redirect to="/admin/login" />;
            // history.push("/admin/login")
        }
        else
        console.log("Cos")
            return <Redirect to="/admin/login" />;
        // history.push("/admin")
    }

    return (
        <div className="userHeader">
            <div className="userLogo">
                <img src="https://newwave.vn/wp-content/uploads/2020/02/logo-nws-2_latest.png" alt="logo" />
            </div>

            <label htmlFor="navMobileInput" className="userNavbarBtn">
                <i className="fas fa-bars"></i>
            </label>
            <input type="checkbox" id="navMobileInput" className="navInput"></input>
            <label htmlFor="navMobileInput" className="userNavOverlay"></label>
            <div className="userListNavbar-Mobile">
                <label htmlFor="navMobileInput" className="userListNavbar-Mobile-Close">
                    <i className="fas fa-times"></i>
                </label>
                <label htmlFor="navMobileInput">
                    <ul>
                        <li>
                            <i className="fas fa-home"></i>
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li>
                            <i className="fab fa-product-hunt"></i>
                            <Link to="/user/department" className="nav-link">Product</Link>
                        </li>
                        <li>
                            <i className="fas fa-address-card"></i>
                            <Link to="/user/employee" className="nav-link">About Us</Link>
                        </li>
                        <li>
                            <i className="fas fa-sign-in-alt"></i>
                            <button onClick={checkkIsLogin}>Loginnn</button>
                            <Link to="/login" className="nav-link">login</Link>
                        </li>
                        <button onClick={checkkIsLogin}>Loginnn</button>
                    </ul>
                </label>
            </div>



            <div className="userListNavbar">
                <ul>
                    <li>
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li>
                        <Link to="/user/department" className="nav-link">Product</Link>
                    </li>
                    <li>
                        <Link to="/user/employee" className="nav-link">About us</Link>
                    </li>
                    <li>
                        <Link to="/login" className="nav-link">Login</Link>
                        <button onClick={checkkIsLogin}>Loginnn</button>
                    </li>
                </ul>

            </div>
        </div>
    );
}

export default Header;