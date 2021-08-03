import React, { useState } from 'react';
import '../UserComponent/UserStyle/ChangePassword.css';
import { useHistory } from "react-router-dom";
import { axios } from '../HeaderAPI';

function ChangePassword() {
    const history = useHistory();
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
                alert("Thay đổi mật khẩu thành công!")
                history.push("/login")
            })
            .catch(err => {
                setDataChangePassword({
                    username: "",
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
        <div className="changePasswordPage">
            <div className="changePassword">
                <div className="changePasswordLogo">
                    <img src="https://silvawebdesigns.com/wp-content/uploads/2020/12/wordpress-hide-or-change-password-protected-page.jpg" alt="logo" />
                </div>
                <div className="changePasswordInput">
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
                            <button>SAVE</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;