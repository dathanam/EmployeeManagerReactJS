import React from 'react';
import '../Style/Login.css';

function Login() {
    return (
        <div className="loginPage">
            <div className="login">
                <div className="loginLogo">
                    <img src="https://pafssh.provirtualmeeting.com/wp-content/uploads/2020/09/login.png" alt="logo" />
                </div>
                <div className="loginInput">
                    <form className="loginForm">
                        <div className="loginInputDev">
                            <label for="name">User Name:</label>
                            <input id="name" type="text" />
                        </div>
                        <div className="loginInputDev">
                            <label for="password">Password:</label>
                            <input id="password" type="text" />
                        </div>
                        <div className="loginInputDev">
                            <label for="confirmPassword">Confirm Password:</label>
                            <input id="confirmPassword" type="text" />
                        </div>
                    </form>
                </div>
                <div className="loginBtn">
                    <div className="loginInputDevBtn">
                        <button>LOGIN</button>
                        <button>SIGN UP</button>
                    </div>
                </div>

                <div className="loginBtn_Mobile">
                    <div className="loginInputDevBtn">
                        <button>LOGIN</button>
                    </div>
                    <div className="loginInputDevBtn">
                        <button>SIGN UP</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;