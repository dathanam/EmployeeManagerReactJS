import React, { useEffect, useState } from 'react';
import '../Style/Employee.css';
import { axios } from '../HeaderAPI';

function Employee() {
    const DataLocalStorage = localStorage.getItem("accessToken");

    const [listEmployee, setListEmployee] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [oneEmployee, setOneEmployee] = useState({});
    const [pageStart, setpageStart] = useState({
        start: 1,
        startSearch: 1
    });
    console.log(pageStart)

    const [sumPage, setSumPage] = useState({
        sumPage: 1,
        sumpageSearch: 1
    });

    const getArr = async () => {
        const response = await axios
            .get("/employee/paginate?page=" + pageStart.start + "&limit=5", { headers: { "Authorization": `Bearer ${DataLocalStorage}` } })
            .catch((err) => console.log("Error: ", err));
        if (response && response.data) {
            setListEmployee(response.data.items)
            setEmployee(response.data.items)
            if (response.data.meta.totalItems % 5 != 0) {
                setSumPage({
                    sumPage: Math.floor(response.data.meta.totalItems / 5) + 1
                })
            } else {
                setSumPage({
                    sumPage: Math.floor(response.data.meta.totalItems / 5)
                })
            }
        }
    }
    useEffect(() => {
        getArr();
    }, [pageStart.start]);

    ////// view table
    function viewTable() {
        const checkRole = localStorage.getItem("role")
        if (checkRole === "0") {
            return (
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">id</div>
                        <div className="col col-2">Employee Name</div>
                        <div className="col col-2">Photo</div>
                        <div className="col col-2">Job Title</div>
                        <div className="col col-2">Phone</div>
                        <div className="col col-3">Email</div>
                        <div className="col col-2">action</div>
                    </li>
                    {
                        employee.map((item) => {
                            return (
                                <li className="table-row" key={item.id}>
                                    <div className="col col-1">{item.id}</div>
                                    <div className="col col-2">{item.nameEmployee}</div>
                                    <div className="col col-2">
                                        <img className="employeeDepartmentImg" src={"http://192.168.20.233:4000/employee/" + item.photo} />
                                    </div>
                                    <div className="col col-2">{item.jobTitle}</div>
                                    <div className="col col-2">{item.cellPhone}</div>
                                    <div className="col col-3">{item.email}</div>
                                    <div className="col col-2">
                                        <button className="nameEmployeeBtn" data-toggle="modal" data-target="#modalEmployeeEmployee"
                                        // onClick={() => {
                                        //     setEmployeename(item.nameEmployee)
                                        //     getlistEmployeeEmployee(item.id);
                                        // }}
                                        ><i className="fas fa-eye"></i></button>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            )
        } else {
            return (
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">id</div>
                        <div className="col col-2">Employee Name</div>
                        <div className="col col-2">Photo</div>
                        <div className="col col-2">Job Title</div>
                        <div className="col col-2">Phone</div>
                        <div className="col col-3">Email</div>
                        <div className="col col-2">action</div>
                    </li>
                    {
                        employee.map((item) => {
                            return (
                                <li className="table-row" key={item.id}>
                                    <div className="col col-1">{item.id}</div>
                                    <div className="col col-2">{item.nameEmployee}</div>
                                    <div className="col col-2">
                                        <img className="employeeDepartmentImg" src={"http://192.168.20.233:4000/employee/" + item.photo} />
                                    </div>
                                    <div className="col col-2">{item.jobTitle}</div>
                                    <div className="col col-2">{item.cellPhone}</div>
                                    <div className="col col-3">{item.email}</div>
                                    <div className="col col-2">
                                        <button className="nameEmployeeBtn" data-toggle="modal" data-target="#detailModail"
                                            onClick={() => {
                                                setOneEmployee(item)
                                            }}
                                        ><i className="fas fa-eye"></i></button>

                                        <button className="nameEmployeeBtn" data-toggle="modal" data-target="#editEmployee"
                                        // onClick={() => {
                                        //     setEmployeeID(item.id)
                                        //     setEmployeeEdit(item)
                                        // }}
                                        ><i className="fas fa-edit"></i></button>

                                        <i onClick={() => {
                                            axios.delete(`employee/` + item.id, { headers: { "Authorization": `Bearer ${DataLocalStorage}` } })
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
            )
        }
    }

    // Search by name
    const [dataSearch, setDataSearch] = useState({
        search: ""
    })
    
    const getArrSearch = async () => {
        const response = await axios
            .get('employee/paginate?page=' + pageStart.startSearch + "&limit=5&nameEmployee="+dataSearch.search, { headers: { "Authorization": `Bearer ${DataLocalStorage}` } })
            .catch((err) => console.log("Error: ", err));
        if (response && response.data) {
            console.log(response)
            setDataSearch({
                search: ""
            })
            setEmployee(response.data.items)
            // if (response.data.meta.totalItems % 5 != 0) {
            //     setSumPage({
            //         sumPage: Math.floor(response.data.meta.totalItems / 5) + 1
            //     })
            // } else {
            //     setSumPage({
            //         sumPage: Math.floor(response.data.meta.totalItems / 5)
            //     })
            // }
        }
    }
    useEffect(() => {
        getArrSearch();
    }, []);


    function handleSearch(e) {
        const newdata = { ...dataSearch };
        newdata[e.target.id] = e.target.value;
        setDataSearch(newdata);
    }

    return (
        <div className="adminEmployee">
            <div className="adminEmployeeTable">
                <div className="adminEmployeeFunction">
                    <div className="adminEmployeeCreateNew">
                        <button data-toggle="modal" data-target="#myModal">New Employee</button>
                    </div>
                    <div className="adminEmployeeSearch">
                        <form onSubmit={(e) => getArrSearch(e)}>
                            <button type="button"
                                onClick={() => {
                                    setDataSearch({
                                        search: ""
                                    })
                                    getArr();
                                }}
                                className="adminEmployeeSearchBtn"><i className="fas fa-reply-all">All</i></button>

                            <input onChange={(e) => handleSearch(e)} id="search" value={dataSearch.search} type="text" placeholder="name..." className="adminEmployeeSearchInput"></input>
                            <button type="submit" className="adminEmployeeSearchBtn"><i className="fas fa-search"></i></button>
                        </form>
                    </div>
                </div>
                {
                    viewTable()
                }
                <div className="phanTrangBtn">
                    <button onClick={() => {
                        if (pageStart.start > 1) {
                            setpageStart({
                                start: pageStart.start - 1,
                                startSearch: pageStart.startSearch - 1
                            })
                        }
                    }}>Prev</button>
                    <button onClick={() => {
                        if (pageStart.start < sumPage.sumPage) {
                            setpageStart({
                                start: pageStart.start + 1,
                                startSearch: pageStart.startSearch + 1
                            })
                        }
                    }}>Next</button>
                </div>
            </div>

            {/* Department Detail */}
            <div className="modal fade" id="detailModail" role="modal">
                <div className="modal-dialog modal-dialog-em">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Employee Detail</h4>
                        </div>
                        <div className="modal-body">
                            <div className="modalEmployeeImg">
                                <img className="employeeDepartmentImgDetail" src={"http://192.168.20.233:4000/employee/" + oneEmployee.photo} />
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
        </div>
    );
}

export default Employee;