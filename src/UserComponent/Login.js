import React, { useState } from 'react';
import '../UserComponent/UserStyle/Login.css';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { axios } from '../HeaderAPI';

function Login(props) {
    const history = useHistory();
    function checkFristLogin() {
        const UserLoginFrist = localStorage.getItem("loginFrist");
        if (UserLoginFrist === "true") {
            history.push("/admin")
            window.location.reload()
        } else {
            history.push("/changepassword")
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
                localStorage.setItem("time", 3600);
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
                            <input onChange={(e) => handle(e)} id="username" value={dataLogin.username} type="text" required />
                        </div>
                        <div className="loginInputDev">
                            <label htmlFor="password">Password:</label>
                            <input onChange={(e) => handle(e)} id="password" value={dataLogin.password} type="text" required/>
                        </div>
                        <div className="loginInputDevBtn">
                            <button type="button">
                                <Link to="/signup" className="nav-link">SIGN UP</Link>
                            </button>
                            <button>LOGIN</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Login;