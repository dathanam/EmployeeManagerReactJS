import React, { useState} from 'react';
import '../Style/Login.css';
import { Link } from "react-router-dom";
import Axios from 'axios'

function Login() {


    const urlLogin = "http://192.168.20.233:3000/auth/login"
    const [dataLogin, setDataLogin] = useState({
        username: "",
        password: "",
        isLogin: localStorage.getItem("accessToken") != null
    })
    function submit(e) {
        e.preventDefault();

        Axios.post(urlLogin, dataLogin)
            .then((res) => {
                localStorage.setItem("accessToken", res.data.accessToken)
                alert("Thành Công");             
            })
            .catch(err => {
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
                            <input onChange={(e) => handle(e)} id="username" value={dataLogin.username} type="text" />
                        </div>
                        <div className="loginInputDev">
                            <label htmlFor="password">Password:</label>
                            <input onChange={(e) => handle(e)} id="password" value={dataLogin.password} type="text" />
                        </div>
                        <div className="loginInputDevBtn">
                            <button type="submit">LOGIN</button>
                            <button type="button">
                                <Link to="/signup" className="nav-link">SIGN UP</Link>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;