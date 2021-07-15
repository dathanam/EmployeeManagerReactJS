import React, {useState} from 'react';
import '../Style/SignUp.css';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';

function SignUp() {
    const history = useHistory();
    const urlSignUp = "http://192.168.20.233:3000/auth/register"
    const [dataSignUp, setDataSignUp] = useState({
        email: "",
    })
    function submit(e) {
        e.preventDefault();

        Axios.post(urlSignUp, dataSignUp)
        .then((res) => {
            if (res.statusCode === 201) {
                alert("Vui lòng check email");
                history.push('/admin/login')
            }else{
                alert("Tài khoản đã tồn tại");
                setDataSignUp({
                    email: "",
                })
            }
        })
    }

    function handle(e) {
        const newdata = { ...dataSignUp };
        newdata[e.target.id] = e.target.value;
        setDataSignUp(newdata);
    }
    return (
        <div className="signUpPage">
            <div className="SignUp">
                <div className="SignUpLogo">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRTwml7NwMdopeeIeb1hU8scsG3rE0102KsK50-14buI2ZUERO85azqXo9L1YC4C34C-o&usqp=CAU" alt="logo" />
                </div>
                <div className="signUpInput">
                    <form className="signUpForm" onSubmit={(e) => submit(e)}>
                        <div className="signUpInputDev">
                            <label htmlFor="name">email:</label>
                            <input onChange={(e) => handle(e)} value={dataSignUp.email} id="email" type="email" />
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