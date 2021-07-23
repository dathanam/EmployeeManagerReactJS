import React, { useRef, useState, useEffect } from 'react';
import '../Style/AdminFooter.css';
import { useHistory } from 'react-router-dom';
import Login from '../UserComponent/Login';

function Footer() {
    const history = useHistory();

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

    if(num === 60){
        alert("Thời gian còn lại là 1 phút. Vui lòng lưu lại toàn bộ thông tin trong phiên đăng nhập")
    }else if(num === 0){
        alert("Hết phiên đăng nhập")      
        Logout();
    }
    return (
        <>
            <div className="adminFooter">
                <div className="adminFooterLogo">
                    <img src="https://newwave.vn/wp-content/uploads/2020/02/logo-nws-2_latest.png" alt="logo" />
                </div>
                <div className="adminFooterText">
                    <h4 className="address"> <i className="fal fa-map-marker-alt"></i> 7th Floor, MITEC building, Yen Hoa, Hanoi, Vietnam</h4>
                    <h4 className="adminFooterText_Web"> <i className="fab fa-google"></i> newwave.com.vn</h4>
                </div>
                <div className="adminFooterIcon">
                    <div className="adminFooterIconBtn">
                        <button onClick={Logout}>LOGOUT</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;