import React from 'react';
import '../UserComponent/UserStyle/Header.css';
import { BrowserRouter as Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

function Header() {

    let userExists = localStorage.getItem("accessToken");
    const history = useHistory();

    let checkkIsLogin = () => {
        if (userExists !== null) {
            history.push("/admin")
        } else {
            history.push("/login")
        }
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
                            <Link to="/user/product" className="nav-link">Product</Link>
                        </li>
                        <li>
                            <i className="fas fa-address-card"></i>
                            <Link to="/user/aboutus" className="nav-link">About Us</Link>
                        </li>
                        <li>
                            <i className="fas fa-sign-in-alt"></i>
                            <button onClick={() => {
                                checkkIsLogin()
                            }}>Login</button>
                        </li>
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
                        <button onClick={() => {
                            checkkIsLogin()
                        }}>Login</button>
                    </li>
                </ul>

            </div>
        </div>
    );
}

export default Header;