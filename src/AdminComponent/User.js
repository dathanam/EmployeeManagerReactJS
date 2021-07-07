import React from 'react';
import '../Style/AdminUser.css'

function User() {
    return (
        <div className="adminHome">
            <div className="adminUserTable">
                <h2>User</h2>
                <table>
                    <tr>
                        <th>STT</th>
                        <th>Họ tên</th>
                        <th>Ngày sinh</th>
                        <th>Giới tính</th>
                        <th>Quê quán</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Trần Anh Đức</td>
                        <td>03/08/1993</td>
                        <td>Nam</td>
                        <td>Cần Thơ</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Kiều Thị Thu Hằng</td>
                        <td>04/09/1991</td>
                        <td>Nữ</td>
                        <td>Vĩnh Long</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Vương Thị Lê Na</td>
                        <td>06/10/1991</td>
                        <td>Nữ</td>
                        <td>Sóc Trăng</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Dương Kim Thương</td>
                        <td>16/11/1990</td>
                        <td>Nam</td>
                        <td>Trà Vinh</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Mai Đức Hiếu</td>
                        <td>18/06/1989</td>
                        <td>Nam</td>
                        <td>Hậu Giang</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default User;