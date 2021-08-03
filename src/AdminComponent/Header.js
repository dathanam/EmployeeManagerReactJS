import React, { useRef, useState, useEffect } from 'react';
import '../Style/AdminHeader.css'
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode"
import { useHistory } from 'react-router-dom';
import { axios } from '../HeaderAPI';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function Header() {
    const history = useHistory();
    const DataLocalStorage = localStorage.getItem("accessToken");

    function viewNameUser() {
        if (DataLocalStorage != null) {
            const decode = jwt_decode(DataLocalStorage);
            return (
                <p><i className="far fa-user"></i> {decode.username}</p>
            )
        }
        else {
            return (
                <p><i className="far fa-user"></i> No User</p>
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

    if (num === 60) {
        alert("Thời gian còn lại là 1 phút. Vui lòng lưu lại toàn bộ thông tin trong phiên đăng nhập")
    } else if (num === 0) {
        alert("Hết phiên đăng nhập")
        Logout();
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [changePass, setChangePass] = React.useState(null);

    const handleClickChangePass = (event) => {
        setChangePass(event.currentTarget);
    };

    const handleCloseChangePass = () => {
        setChangePass(null);
    };

    const [changePassword, setDataChangePassword] = useState({
        username: localStorage.getItem("username"),
        oldPass: "",
        newPass: "",
        confirm: ""
    })
    function submitChangePass(e) {
        e.preventDefault();
        axios.put("/user/auth/changePassword", changePassword)
            .then((res) => {
                alert("Thay đổi mật khẩu thành công!");
                handleClose();
                handleCloseChangePass();
            })
            .catch(err => {
                setDataChangePassword({
                    username: localStorage.getItem("username"),
                    oldPass: "",
                    newPass: "",
                    confirm: ""
                })
                alert("Error")
            })
    }

    function handleChangePass(e) {
        const newdata = { ...changePassword };
        newdata[e.target.id] = e.target.value;
        setDataChangePassword(newdata);
    }
    function linkSignUp() {
        const checkRole = localStorage.getItem("role")
        if (checkRole === "0") {
            return
        } else {
            return (
                <Link to="/admin/signup" className="nav-link">SignUp</Link>
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
                        <button className="loggoutBtn" onClick={() => { Logout() }}>
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
                        {
                            linkSignUp()
                        }
                    </li>
                    <div className="AdminLog">
                        <div className="UserDropdown">
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                {viewNameUser()}
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem aria-controls="changePass-menu" onClick={handleClickChangePass}>Change Password</MenuItem>
                                <MenuItem onClick={() => {
                                    handleClose();
                                    Logout()
                                }}>Logout</MenuItem>
                            </Menu>
                            <Menu
                                id="changePass-menu"
                                anchorEl={changePass}
                                keepMounted
                                open={Boolean(changePass)}
                                onClose={handleCloseChangePass}
                            >
                                <MenuItem>
                                    <div className="changePasswordInputUser">
                                        <form className="changePasswordForm" onSubmit={(e) => submitChangePass(e)}>
                                            <div className="changePasswordInputDev">
                                                <label htmlFor="username">User Name:</label>
                                                <input value={changePassword.username} type="text" />
                                            </div>
                                            <div className="changePasswordInputDev">
                                                <label htmlFor="password">Old Pass:</label>
                                                <input onChange={(e) => handleChangePass(e)} id="oldPass" value={changePassword.oldPass} type="password" />
                                            </div>
                                            <div className="changePasswordInputDev">
                                                <label htmlFor="password">New Pass:</label>
                                                <input onChange={(e) => handleChangePass(e)} id="newPass" value={changePassword.newPass} type="password" />
                                            </div>
                                            <div className="changePasswordInputDev">
                                                <label htmlFor="password">Confirm:</label>
                                                <input onChange={(e) => handleChangePass(e)} id="confirm" value={changePassword.confirm} type="password" />
                                            </div>
                                            <div className="changePasswordInputDevBtn">
                                                <button type="button" onClick={() => {
                                                    handleClose();
                                                    handleCloseChangePass();
                                                }}>CANCEL</button>
                                                <button>SAVE</button>
                                            </div>
                                        </form>
                                    </div>
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                </ul>

            </div>
        </div>
    );
}

export default Header;