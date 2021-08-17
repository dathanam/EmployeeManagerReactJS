import React, { useState } from 'react';
import '../SignUp/SignUp.css';
import { useHistory } from 'react-router-dom';
import api from '../../API'

function SignUp() {
    const history = useHistory();
    const [dataSignUp, setDataSignUp] = useState({
        username: "",
        email: ""
    })
    function submit(e) {
        e.preventDefault();
        api.signup(dataSignUp)
            .then((res) => {
                if (res.status === 201) {
                    if (res.data.statusCode === 200) {
                        alert("Mật khẩu đã được gửi tới " + dataSignUp.email)
                        history.push("/admin")
                    } else {
                        alert("Tài khoản đã tồn tại")
                        setDataSignUp({
                            username: "",
                            email: ""
                        })
                    }
                }
            })
            .catch((err) => {
                alert("Error!")
                setDataSignUp({
                    username: "",
                    email: ""
                })
            })
    }

    function handle(event) {
        const newdata = { ...dataSignUp };
        newdata[event.target.id] = event.target.value;
        setDataSignUp(newdata);
    }
    return (
        <div className="signUpPage">
            <div className="signUp">
                <div className="signUpLogo">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRTwml7NwMdopeeIeb1hU8scsG3rE0102KsK50-14buI2ZUERO85azqXo9L1YC4C34C-o&usqp=CAU" alt="logo" />
                </div>
                <div className="signUpInput">
                    <form className="signUpForm" onSubmit={(e) => submit(e)}>
                        <div className="signUpInputDev">
                            <label htmlFor="username">User Name:</label>
                            <input onChange={handle} value={dataSignUp.username} id="username" type="text" />
                        </div>
                        <div className="signUpInputDev">
                            <label htmlFor="name">Email:</label>
                            <input onChange={handle} value={dataSignUp.email} id="email" type="email" />
                        </div>
                        <div className="signUpInputDevBtn">
                            <button>SIGN UP</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;