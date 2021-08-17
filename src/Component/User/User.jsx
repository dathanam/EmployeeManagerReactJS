import React, { useEffect, useState } from 'react';
import '../User/User.css';
import api from "../../API"

function User() {

    const [listUser, setListUser] = useState([]);

    const getArr = async () => {
        const response = await api.getUser()
        if (response && response.data) {
            setListUser(response.data)
        }
    }
    useEffect(() => {
        getArr();
    }, []);

    return (
        <div className="adminHome">
            <div className="adminUserTable">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">id</div>
                        <div className="col col-2">User Name</div>
                        <div className="col col-1">role</div>
                        <div className="col col-4">email</div>
                        <div className="col col-1">action</div>
                    </li>
                    {
                        listUser.map((item) => {
                            return (
                                <li className="table-row" key={item.id}>
                                    <div className="col col-1">{item.id}</div>
                                    <div className="col col-2">{item.username}</div>
                                    <div className="col col-1">{item.role === 0 ? 'User' : 'Admin'}</div>
                                    <div className="col col-4">{item.email}</div>
                                    <div className="col col-1">
                                        <i onClick={() => {
                                            api.deleteUser(item.id)                          
                                                .then(res => {
                                                    getArr();
                                                })
                                                .catch(
                                                )
                                        }} className="fas fa-trash-alt"></i>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default User;