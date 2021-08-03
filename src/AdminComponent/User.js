import React, { useEffect, useState } from 'react';
import '../Style/AdminUser.css'
import { axios } from '../HeaderAPI';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function User() {


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
            return (
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
                                <li className="table-row" key={item.id}>
                                    <div className="col col-1" data-label="Job Id">{item.id}</div>
                                    <div className="col col-3" data-label="Customer Name">{item.username}</div>
                                    <div className="col col-2" data-label="Amount">{
                                        viewRole(item.role)
                                    }</div>
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
                                <li className="table-row" key={item.id}>
                                    <div className="col col-1" data-label="Job Id">{item.id}</div>
                                    <div className="col col-2" data-label="Customer Name">{item.username}</div>
                                    <div className="col col-1" data-label="Amount"> {
                                        viewRole(item.role)
                                    }
                                        {
                                            viewEditEmployee(item.id, item.role, item.username, item.email)
                                        }
                                    </div>
                                    <div className="col col-4" data-label="Payment Status">{item.email}</div>
                                    <div className="col col-1" data-label="Payment Status">
                                        {
                                            viewDelete(item.id, item.username)
                                        }
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }
    }

    const [dataUpdateRole, setDataUpdateRole] = useState({
        id: "",
        username: "",
        email: "",
        role: ""
    })
    function viewDelete(id, name) {
        if (localStorage.getItem("username") === "admin") {
            if (name === "admin") {
                return
            } else {
                return (
                    <i onClick={() => {
                        axios.delete(`user/` + id, { headers: { "Authorization": `Bearer ${DataLocalStorage}` } })
                            .then(res => {
                                getArr();
                            })
                            .catch(
                            )
                    }} className="fas fa-trash-alt"></i>
                )
            }
        } else {
            return (
                <i className="fas fa-lock-alt"></i>
            )
        }
    }
    function viewRole(role) {
        if (role === 1) {
            return (
                <p>Admin</p>
            )
        } else {
            return (
                <p>User</p>
            )
        }
    }

    function viewEditEmployee(id, role, username, email) {
        const checkUsername = localStorage.getItem("username")
        if (checkUsername === "admin") {
            if (role === 0) {
                return (
                    <i onClick={() => {
                        setDataUpdateRole({
                            id: id,
                            username: username,
                            email: email,
                            role: role + 1
                        })
                    }} class="far fa-arrow-alt-circle-up"></i>
                )
            }
            else if (username !== "admin") {
                return (
                    <i onClick={() => {
                        setDataUpdateRole({
                            id: id,
                            username: username,
                            email: email,
                            role: role - 1
                        })
                    }}
                        class="far fa-arrow-alt-circle-down"></i>
                )
            }
        } else {
            return;
        }

    }



    function submit() {
        axios.put('/user/' + dataUpdateRole.id, dataUpdateRole, { headers: { "Authorization": `Bearer ${DataLocalStorage}` } })
            .then((res) => {
                window.location.reload()
            })
            .catch(err => {
                setDataUpdateRole({
                    username: "",
                    email: "",
                    role: ""
                })
            })
    }

    useEffect(() => {
        submit();
    }, [dataUpdateRole.role]);

    return (
        <div className="adminHome">
            <div className="adminUserTable">
                {
                    viewTable()
                }
            </div>
            <div>
                {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Open alert dialog
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Let Google help apps determine location. This means sending anonymous location data to
                            Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog> */}
            </div>
        </div>
    );
}

export default User;