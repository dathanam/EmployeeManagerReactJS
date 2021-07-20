import React from 'react';
import '../UserComponent/UserStyle/Footer.css';
import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <div className="userFooter">
                <div className="userFooterLogo">
                    <img src="https://newwave.vn/wp-content/uploads/2020/02/logo-nws-2_latest.png" alt="logo" />
                </div>
                <div className="userFooterText">
                    <h4 className="address"> <i className="fal fa-map-marker-alt"></i> 7th Floor, MITEC building, Yen Hoa, Hanoi, Vietnam</h4>
                    <h4 className="userFooterText_Web"> <i className="fab fa-google"></i> newwave.com.vn</h4>
                </div>
                <div className="userFooterIcon">
                    <div className="userFooterIconBtn">
                        <button>
                            <Link to="/signup" className="nav-link">SIGN UP</Link>
                        </button>
                    </div>
                </div>
            </div>


            {/* Mobile */}
            <div className="userFooter-Mobile">

                <div className="userFooterLogo-Mobile">
                    <img src="https://newwave.vn/wp-content/uploads/2020/02/logo-nws-2_latest.png" alt="logo" />
                    <h2>NEWWAVE SOLUTIONS</h2>
                </div>
                <div className="userFooterIcon-Mobile">
                    <div className="userFooterIconBtn-Mobile">
                        <button>
                            <Link to="/signup" className="nav-link">SIGN UP</Link>
                        </button>
                    </div>
                </div>
                <div className="userFooterText-Mobile">
                    <h4> <i className="fal fa-map-marker-alt"></i> 7th Floor, MITEC building, Yen Hoa, Hanoi, Vietnam</h4>
                    <h4> <i className="fas fa-phone-office"></i> +8424.6663.5848</h4>
                    <h4> <i className="fas fa-phone"></i> 0382.116.330</h4>
                    <h4 className="userFooterText-Mobile_Web"> <i className="fab fa-google"></i> newwave.com.vn</h4>
                    <br />
                </div>

            </div>
        </>
    );
}

export default Footer;