import React, { useEffect, useState } from 'react';
import '../Employee/Employee.css';
import { useHistory } from "react-router-dom";
import api from '../../API';

function Employee() {
    const history = useHistory();

    const [listEmployee, setListEmployee] = useState([]);
    const [oneEmployee, setOneEmployee] = useState({});
    const [pageStart, setpageStart] = useState({
        start: 1
    });

    const [sumPage, setSumPage] = useState({
        sumPage: 1,
    });

    const [listDepartment, setListDepartment] = useState([]);

    const [dataSearch, setDataSearch] = useState({
        search: ""
    })

    const [objectURL, setObjectURL] = useState({
        post: "",
        url: ""
    });

    const [dataEdit, setDataEdit] = useState({
        nameEmployee: "",
        photo: "",
        jobTitle: "",
        cellPhone: "(+84)",
        email: "",
        managerId: "",
        id: ""
    })

    const getArr = async () => {
        const response = await api.getEmployee(pageStart.start)
        if (response && response.data) {
            setListEmployee(response.data.items)
            if (response.data.meta.totalItems % 5 !== 0) {
                setSumPage({
                    sumPage: Math.floor(response.data.meta.totalItems / 5) + 1,
                })
            } else {
                setSumPage({
                    sumPage: Math.floor(response.data.meta.totalItems / 5),
                })
            }
        }
    }
    useEffect(() => {
        getArr();
    }, [pageStart.start]);

    //Get Department
    const getListDepartment = async () => {
        const response = await api.getDepartment()
        if (response && response.data) {
            setListDepartment(response.data)
        }
    }
    useEffect(() => {
        getListDepartment();
    }, []);

    // Search by name
    const getArrSearch = async () => {
        const response = await api.searchEmployee(dataSearch.search)
        if (response && response.data) {
            setListEmployee(response.data.items)
        }
    }
    useEffect(() => {
        getArrSearch();
    }, [dataSearch.search]);

    function handleSearch(event) {
        const newdata = { ...dataSearch };
        newdata[event.target.id] = event.target.value;
        setDataSearch(newdata);
    }

    //Edit
    function submitEditEmployee(e) {
        e.preventDefault();
        var formdata = new FormData();
        formdata.append("nameEmployee", dataEdit.nameEmployee);
        formdata.append("jobTitle", dataEdit.jobTitle);
        formdata.append("cellPhone", dataEdit.cellPhone);
        formdata.append("email", dataEdit.email);
        formdata.append("managerId", dataEdit.managerId);
        if (objectURL.post !== "") {
            formdata.append("photo", objectURL.post, "employee.jpg");
        }
        api.putEmployee(dataEdit.id, formdata)
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.statusCode === 200) {
                        getArr()
                        window.location.reload()
                    }
                }
                else {
                    alert("Error")
                }
            })
    }
    function handleEditEmployee(event) {
        const newdata = { ...dataEdit };
        newdata[event.target.id] = event.target.value;
        setDataEdit(newdata);
    }

    return (
        <div className="adminEmployee">
            <div className="adminEmployeeTable">
                <div className="adminEmployeeFunction">
                    <div className="adminEmployeeCreateNew">
                        <button data-toggle="modal" data-target="#myModal"
                            onClick={() => {
                                history.push("/admin/newemployee")
                            }}
                        >New Employee</button>
                        <div>
                            <button type="button"
                                onClick={() => {
                                    setDataSearch({
                                        search: ""
                                    })
                                }}
                                className="adminEmployeeSearchBtn"><i className="fas fa-reply-all">All</i></button>
                        </div>
                    </div>
                    <div className="adminEmployeeSearch">
                        <form onSubmit={(e) => getArrSearch(e)}>
                            <input onChange={handleSearch} id="search" value={dataSearch.search} type="text" placeholder="name..." className="adminEmployeeSearchInput"></input>
                        </form>
                    </div>

                </div>
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">id</div>
                        <div className="col col-2">Employee Name</div>
                        <div className="col col-2">Photo</div>
                        <div className="col col-1">Job Title</div>
                        <div className="col col-2">Phone</div>
                        <div className="col col-3">Email</div>
                        <div className="col col-1">action</div>
                    </li>
                    {
                        listEmployee.map((item) => {
                            return (
                                <li className="table-row" key={item.id}>
                                    <div className="col col-1">{item.id}</div>
                                    <div className="col col-2">{item.nameEmployee}</div>
                                    <div className="col col-2">
                                        <img className="employeeDepartmentImg" src={"https://nws-management.herokuapp.com/employee/" + item.photo} />
                                    </div>
                                    <div className="col col-1">{item.jobTitle}</div>
                                    <div className="col col-2">{item.cellPhone}</div>
                                    <div className="col col-3">{item.email}</div>
                                    <div className="col col-1">
                                        <button className="nameEmployeeBtn" data-toggle="modal" data-target="#detailModail"
                                            onClick={() => {
                                                setOneEmployee(item)
                                            }}
                                        ><i className="fas fa-eye"></i></button>
                                        {
                                            localStorage.getItem("role") === "0" ? '' :
                                                <>
                                                    <button className="nameEmployeeBtn" data-toggle="modal" data-target="#editEmployee"
                                                        onClick={() => {
                                                            setDataEdit(item)
                                                            setObjectURL({
                                                                post: "",
                                                                url: item.photo
                                                            })
                                                        }}
                                                    ><i className="fas fa-edit"></i></button>

                                                    <i onClick={() => {
                                                        api.deleteEmployee(item.id)
                                                            .then(res => {
                                                                getArr();
                                                            })
                                                            .catch(
                                                            )
                                                    }} className="fas fa-trash-alt"></i>
                                                </>
                                        }
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="phanTrangBtn">
                    <button onClick={() => {
                        if (pageStart.start > 1) {
                            setpageStart({
                                start: pageStart.start - 1
                            })
                        }
                    }}>Prev</button>
                    <button onClick={() => {
                        if (pageStart.start < sumPage.sumPage) {
                            setpageStart({
                                start: pageStart.start + 1
                            })
                        }
                    }}>Next</button>
                </div>
            </div>

            {/* Employee Detail */}
            <div className="modal fade" id="detailModail" role="modal">
                <div className="modal-dialog modal-dialog-em">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Employee Detail</h4>
                        </div>
                        <div className="modal-body">
                            <div className="modalEmployeeImg">
                                <img className="employeeDepartmentImgDetail" src={"https://nws-management.herokuapp.com/employee/" + oneEmployee.photo} />
                            </div>
                            <div className="modalEmployBody">
                                <div className="loginInputDev">
                                    <label htmlFor="username">id</label>
                                    <h4>{oneEmployee.id}</h4>
                                </div>
                                <div className="loginInputDev">
                                    <label htmlFor="username">name</label>
                                    <h4>{oneEmployee.nameEmployee}</h4>
                                </div>
                                <div className="loginInputDev">
                                    <label htmlFor="username">Job Title</label>
                                    <h4>{oneEmployee.jobTitle}</h4>
                                </div>
                                <div className="loginInputDev">
                                    <label htmlFor="username">phone</label>
                                    <h4>{oneEmployee.cellPhone}</h4>
                                </div>
                                <div className="loginInputDev">
                                    <label htmlFor="username">email</label>
                                    <h4>{oneEmployee.cellPhone}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Employee Edit */}
            <div className="modal fade" id="editEmployee" role="modal">
                <div className="modal-dialog modal-dialog-em">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Edit</h4>
                        </div>
                        <div className="modal-body">
                            <form className="newEmployeeForm" onSubmit={(e) => submitEditEmployee(e)}>
                                <div className="newEmployeeBody">
                                    <div className="newEmployeeImg">
                                        <label htmlFor="image_uploads" className="imageUploadButton">Choose images</label>
                                        <br />
                                        <input id="image_uploads" type="file" className="image_uploads-input" onChange={(e) => setObjectURL({
                                            post: e.target.files[0],
                                            url: URL.createObjectURL(e.target.files[0]),
                                        })}></input>
                                        {
                                            objectURL.post === "" ?   
                                            <img className="img-fluid" src={"https://nws-management.herokuapp.com/employee/" + objectURL.url} alt="Cake" width="150" height="150" />
                                            : <img className="img-fluid" src={objectURL.url} alt="Cake" width="150" height="150" />
                                        }
                                    </div>
                                    <div className="newEmployeeText">
                                        <div className="newEmployeeTextBody">
                                            <div className="newEmployeeDev">
                                                <label htmlFor="nameEmployee">Name:</label>
                                                <input onChange={handleEditEmployee} id="nameEmployee" value={dataEdit.nameEmployee} type="text" required />
                                            </div>
                                            <div className="newEmployeeDev">
                                                <label htmlFor="jobTitle">Job Title:</label>
                                                <input onChange={handleEditEmployee} id="jobTitle" value={dataEdit.jobTitle} type="text" required />
                                            </div>
                                            <div className="newEmployeeDev">
                                                <label htmlFor="cellPhone">Phone:</label>
                                                <input onChange={handleEditEmployee} id="cellPhone" value={dataEdit.cellPhone} type="text" required />
                                            </div>
                                            <div className="newEmployeeDev">
                                                <label htmlFor="email">Email:</label>
                                                <input onChange={handleEditEmployee} id="email" value={dataEdit.email} type="text" required />
                                            </div>
                                            <div className="newEmployeeDev">
                                                <label htmlFor="managerId">Manager Id:</label>
                                                <select onChange={handleEditEmployee} id="managerId" value={dataEdit.managerId} required>
                                                    {
                                                        listDepartment.map((item) => {
                                                            return (
                                                                <option className="optionInput" value={item.id}>{item.nameDepartment}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="newEmployeeButton">
                                                <button type="button" data-dismiss="modal">Cancel</button>
                                                <button>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Employee;