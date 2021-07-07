import React from 'react';
import '../Style/AdminFooter.css';

function Footer() {
    return (
        <>
        <div className="adminFooter">
            <div className="adminFooterLogo">
                <img src="https://inbienquangcao.vn/wp-content/uploads/2020/11/Logo-qua%CC%82n-%C4%91o%CC%A3%CC%82i-nha%CC%82n-da%CC%82n-Vie%CC%A3%CC%82t-Nam-nga%CC%80y-nay.png" alt="logo" />
                <h2>NEWWAVE SOLUTIONS</h2>
            </div>
            <div className="adminFooterText">
                <h4 className="address"> <i class="fal fa-map-marker-alt"></i> 7th Floor, MITEC building, Yen Hoa, Hanoi, Vietnam</h4>
                <h4> <i class="fas fa-phone-office"></i> +8424.6663.5848</h4>
                <h4> <i class="fas fa-phone"></i> 0382.116.330</h4>
                <h4 className="adminFooterText_Web"> <i class="fab fa-google"></i> newwave.com.vn</h4>
            </div>
            <div className="adminFooterIcon">
                <div className="adminFooterIconBtn">
                    <button>LOGOUT</button>
                </div>

            </div>
        </div>


        {/* Mobile */}
        <div className="adminFooter-Mobile">
            
            <div className="adminFooterLogo-Mobile">
                <img src="https://inbienquangcao.vn/wp-content/uploads/2020/11/Logo-qua%CC%82n-%C4%91o%CC%A3%CC%82i-nha%CC%82n-da%CC%82n-Vie%CC%A3%CC%82t-Nam-nga%CC%80y-nay.png" alt="logo" />
                <h2>NEWWAVE SOLUTIONS</h2>
            </div>
            <div className="adminFooterIcon-Mobile">
                <div className="adminFooterIconBtn-Mobile">
                    <button>LOGOUT</button>
                </div>
            </div>
            <div className="adminFooterText-Mobile">
                <h4> <i class="fal fa-map-marker-alt"></i> 7th Floor, MITEC building, Yen Hoa, Hanoi, Vietnam</h4>
                <h4> <i class="fas fa-phone-office"></i> +8424.6663.5848</h4>
                <h4> <i class="fas fa-phone"></i> 0382.116.330</h4>
                <h4 className="adminFooterText-Mobile_Web"> <i class="fab fa-google"></i> newwave.com.vn</h4>
                <br />
            </div>
            
        </div>
        </>
    );
}

export default Footer;