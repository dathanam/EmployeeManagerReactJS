import React from 'react';
import '../Style/SignUp.css';

function SignUp() {
    return (
        <div className="signUpPage">
            <div className="SignUp">
                <div className="SignUpLogo">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRTwml7NwMdopeeIeb1hU8scsG3rE0102KsK50-14buI2ZUERO85azqXo9L1YC4C34C-o&usqp=CAU" alt="logo" />
                </div>
                <div className="signUpInput">
                    <form className="signUpForm">
                        <div className="signUpInputDev">
                            <label htmlFor="name">name:    </label>
                            <input id="name" type="text" />
                        </div>
                        <div className="signUpInputDev">
                            <label htmlFor="email">Email:    </label>
                            <input id="email" type="text" />
                        </div>
                        <div className="signUpInputDev">
                            <label htmlFor="phoneNumber">Phone Number:    </label>
                            <input id="phoneNumber" type="text" />
                        </div>
                        <div className="signUpInputDev">
                            <label htmlFor="userName">User Name:    </label>
                            <input id="userName" type="text" />
                        </div>
                        <div className="signUpBtn">
                            <div className="signUpInputDevBtn">
                                <button>SIGN UP</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default SignUp;