import React, {useState, useRef, useEffect} from 'react';
import '../Header/Header.css';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { axios } from '../../HeaderAPI';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function Header() {
    const history = useHistory();

    const [num, setNum] = useState(localStorage.getItem("time"));
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [changePass, setChangePass] = React.useState(null);
    const [changePassword, setDataChangePassword] = useState({
        username: localStorage.getItem("username"),
        oldPass: "",
        newPass: "",
        confirm: ""
    })

    const Logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("loginFrist");
        history.push("/")
        window.location.reload()
    }

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

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // ChangePassword
    const handleClickChangePass = (event) => {
        setChangePass(event.currentTarget);
    };
    const handleCloseChangePass = () => {
        setChangePass(null);
    };

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

    return (
        <div className="adminHeader">
            <div className="adminLogo">
                <img src="https://newwave.vn/wp-content/uploads/2020/02/logo-nws-2_latest.png" alt="logo" />
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
                    {
                        localStorage.getItem("role") === "0" ? '' :  <li><Link to="/signup" className="nav-link">SignUp</Link></li>
                    }
                   
                    <div className="AdminLog">
                        <div className="UserDropdown">
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                <p><i className="far fa-user"></i> {localStorage.getItem("username")}</p>
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