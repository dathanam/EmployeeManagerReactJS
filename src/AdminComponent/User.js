import React, { useEffect, useState } from 'react';
import '../Style/AdminUser.css'
import { axios } from '../HeaderAPI';

function User() {

    // get user
    const DataLocalStorage = localStorage.getItem("accessToken");

    const [listUser, setListUser] = useState([]);
    const getArr = async () => {
        const response = await axios
            .get("/user", { headers: { "Authorization": `Bearer ${DataLocalStorage}` } })
            .catch((err) => console.log("Error: ", err));
        if (response && response.data) {
            setListUser(response.data)
        }
    }
    useEffect(() => {
        getArr();
    }, []);

    // View chức năng

    function viewTable() {
        const checkRole = localStorage.getItem("role")
        if (checkRole === "0") {
            return(
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">id</div>
                        <div className="col col-3">User Name</div>
                        <div className="col col-2">role</div>
                        <div className="col col-4">email</div>
                    </li>
                    {
                        listUser.map((item) => {
                            return (
                                <li className="table-row">
                                    <div className="col col-1" data-label="Job Id">{item.id}</div>
                                    <div className="col col-3" data-label="Customer Name">{item.username}</div>
                                    <div className="col col-2" data-label="Amount">{item.role}</div>
                                    <div className="col col-4" data-label="Payment Status">{item.email}</div>                                 
                                </li>
                            )
                        })
                    }                
                </ul>
            )
        }
        else {
            return (
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
                                <li className="table-row">
                                    <div className="col col-1" data-label="Job Id">{item.id}</div>
                                    <div className="col col-2" data-label="Customer Name">{item.username}</div>
                                    <div className="col col-1" data-label="Amount">{item.role}</div>
                                    <div className="col col-4" data-label="Payment Status">{item.email}</div>
                                    <div className="col col-1" data-label="Payment Status">
                                        <i onClick={() => {
                                                axios.delete(`user/` + item.id, { headers: { "Authorization": `Bearer ${DataLocalStorage}` } })
                                                    .then(res => {
                                                        getArr();
                                                    })
                                                    .catch(
                                                    )}} class="fas fa-trash-alt"></i>
                                        </div>                               
                                </li>
                            )
                        })
                    }                
                </ul>
            )
        }
    }

    return (
        <div className="adminHome">
            <div className="adminUserTable">
                {
                    viewTable()
                }
            </div>
        </div>
    );
}

export default User;