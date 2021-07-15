import React, { useState } from 'react';
import '../Style/Login.css';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { axios } from '../HeaderAPI';

function Login(props) {
    const history = useHistory();
    function checkFristLogin() {
        const UserLoginFrist = localStorage.getItem("loginFrist");;
        if (UserLoginFrist === false) {
            toggle();
        } else {
            history.push('/admin')
        }
    }

    const [dataLogin, setDataLogin] = useState({
        username: "",
        password: "",
    })
    function submit(e) {
        e.preventDefault();
        axios.post('/auth/login', dataLogin)
            .then((res) => {
                const decode = jwt_decode(res.data.accessToken);
                localStorage.setItem("accessToken", res.data.accessToken);
                localStorage.setItem("username", decode.username);
                localStorage.setItem("email", decode.email);
                localStorage.setItem("role", decode.role);
                localStorage.setItem("loginFrist", decode.loginFrist);
                checkFristLogin();
            })
            .catch(err => {
                setDataLogin({
                    username: "",
                    password: ""
                })
                alert("UserName Or Password are wrong")
            })
    }

    function handle(e) {
        const newdata = { ...dataLogin };
        newdata[e.target.id] = e.target.value;
        setDataLogin(newdata);
    }

    // change Password
    const [dataChangePassword, setDataChangePassword] = useState({
        username: "",
        oldPass: "",
        newPass: "",
        confirm: ""
    })

    const {
        buttonLabel
    } = props;

    const [modalChangePass, setModalChangePass] = useState(false);
    const toggle = () => setModalChangePass(!modalChangePass);


    function submitChangePassword(e) {
        e.preventDefault();
        axios.post('/api/v1/subcategories/', dataChangePassword)
            .then((res) => {
                console.log(res);
                // if (res.statusText === "OK") {

                // }
            })
    }

    function handleChangePassword(e) {
        const newdata = { ...dataChangePassword };
        newdata[e.target.id] = e.target.value;
        setDataChangePassword(newdata);
    }

    // end change

    return (
        <div className="loginPage">
            <div className="login">
                <div className="loginLogo">
                    <img src="https://pafssh.provirtualmeeting.com/wp-content/uploads/2020/09/login.png" alt="logo" />
                </div>
                <div className="loginInput">
                    <form className="loginForm" onSubmit={(e) => submit(e)}>
                        <div className="loginInputDev">
                            <label htmlFor="username">User Name:</label>
                            <input onChange={(e) => handle(e)} id="username" value={dataLogin.username} type="text" />
                        </div>
                        <div className="loginInputDev">
                            <label htmlFor="password">Password:</label>
                            <input onChange={(e) => handle(e)} id="password" value={dataLogin.password} type="text" />
                        </div>
                        <div className="loginInputDevBtn">
                            <button type="button">
                                <Link to="/admin/signup" className="nav-link">SIGN UP</Link>
                            </button>
                            <button>LOGIN</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Change Password */}
            {/* <div className="changePass">
                <div className="changePassText">
                    <h3>Change Password</h3>
                </div>
                <form>
                    <div className="changePassInput">
                        <br />
                        <input onChange={(e) => handleChangePassword(e)} id="username" value={dataChangePassword.username} type="text" placeholder="User Name" />
                        <input onChange={(e) => handleChangePassword(e)} id="oldPass" value={dataChangePassword.oldPass} type="text" placeholder="Old passWord" />
                        <input onChange={(e) => handleChangePassword(e)} id="newPass" value={dataChangePassword.newPass} type="text" placeholder="New PassWord" />
                        <input onChange={(e) => handleChangePassword(e)} id="confirm" value={dataChangePassword.confirm} type="text" placeholder="Confirm PassWord" />
                        <br />
                    </div>
                    <div className="changePassBtn">                      
                        <button type="button" className="changePassBtnCancel">Cancel</button>
                        <button type="submit" className="changePassBtnSave">Save</button>
                    </div>
                </form>

            </div> */}


            {/* <Modal isOpen={modalChangePass} toggle={toggle} className={buttonLabel}>
                <ModalHeader toggle={toggle} charCode="X"></ModalHeader>
                <ModalBody>
                    <form onSubmit={(e) => submit(e)}>
                        <div>
                            <h3>New SubCategory</h3>
                            <br />
                            <input onChange={(e) => handleChangePassword(e)} id="username" value={dataChangePassword.username} type="text" placeholder="User Name" />
                            <input onChange={(e) => handleChangePassword(e)} id="oldPass" value={dataChangePassword.oldPass} type="text" placeholder="Old passWord" />
                            <input onChange={(e) => handleChangePassword(e)} id="newPass" value={dataChangePassword.newPass} type="text" placeholder="New PassWord" />
                            <input onChange={(e) => handleChangePassword(e)} id="confirm" value={dataChangePassword.confirm} type="text" placeholder="Confirm PassWord" />
                            <br />
                        </div>
                        <br />
                        <button type="submit" className="btnAddSub">Save</button>
                        <button type="button" onClick={toggle}>Cancel</button>
                    </form>
                </ModalBody>
            </Modal> */}
        </div>

    );
}

export default Login;