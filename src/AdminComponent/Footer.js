import React from 'react';
import '../Style/AdminFooter.css';
import {useHistory} from 'react-router-dom';

function Footer() {
    const history = useHistory();

    function Logout(){
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("loginFrist");
        history.push("/")
        alert("Logout success")
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


        {/* Mobile */}
        <div className="adminFooter-Mobile">
            
            <div className="adminFooterLogo-Mobile">
                <img src="https://newwave.vn/wp-content/uploads/2020/02/logo-nws-2_latest.png" alt="logo" />
                <h2>NEWWAVE SOLUTIONS</h2>
            </div>
            <div className="adminFooterIcon-Mobile">
                <div className="adminFooterIconBtn-Mobile">
                    <button>LOGOUT</button>
                </div>
            </div>
            <div className="adminFooterText-Mobile">
                <h4> <i className="fal fa-map-marker-alt"></i> 7th Floor, MITEC building, Yen Hoa, Hanoi, Vietnam</h4>
                <h4> <i className="fas fa-phone-office"></i> +8424.6663.5848</h4>
                <h4> <i className="fas fa-phone"></i> 0382.116.330</h4>
                <h4 className="adminFooterText-Mobile_Web"> <i className="fab fa-google"></i> newwave.com.vn</h4>
                <br />
            </div>
            
        </div>
        </>
    );
}

export default Footer;