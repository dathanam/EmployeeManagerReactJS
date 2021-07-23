import React, { useEffect, useState } from 'react';
import '../Style/AdminDepartment.css';
import { axios } from '../HeaderAPI';
function Department() {

    // Get Department
    const DataLocalStorage = localStorage.getItem("accessToken");
    const [departmentname, setDepartmentname] = useState([]);
    const [departmentID, setDepartmentID] = useState([]);
    const [listDepartment, setListDepartment] = useState([]);
    const [oneDepartment, setOneDepartment] = useState([]);
    const [department, setDepartment] = useState([]);
    const [pageStart, setpageStart] = useState({
        start: 1
    });
    const [sumPage, setSumPage] = useState({
        sumPage: 1
    });
    const getArr = async () => {
        const response = await axios
            .get("/department/paginate?page=" + pageStart.start + "&limit=5", { headers: { "Authorization": `Bearer ${DataLocalStorage}` } })
            .catch((err) => console.log("Error: ", err));
        if (response && response.data) {
            setListDepartment(response.data.items)
            setDepartment(response.data.items)
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

    //////// view table
    function viewTable() {
        const checkRole = localStorage.getItem("role")
        if (checkRole === "0") {
            return (
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">i</div>
                        <div className="col col-3">Department Name</div>
                        <div className="col col-2">Office Phone</div>
                    </li>
                    {
                        department.map((item) => {
                            return (
                                <li className="table-row" key={item.id}>
                                    <div className="col col-1" data-label="Job Id">{item.id}</div>
                                    <div className="col col-3" data-label="Customer Name">
                                        <button className="nameDepartmentBtn" data-toggle="modal" data-target="#detailModail"
                                            onClick={() => {
                                                setOneDepartment(item)
                                            }}
                                        >{item.nameDepartment}</button>
                                    </div>
                                    <div className="col col-2" data-label="Amount">{item.officePhone}</div>
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
                        <div className="col col-3">Department Name</div>
                        <div className="col col-2">Office Phone</div>
                        <div className="col col-2">action</div>
                    </li>
                    {
                        department.map((item) => {
                            return (
                                <li className="table-row" key={item.id}>
                                    <div className="col col-1" data-label="Job Id">{item.id}</div>
                                    <div className="col col-3" data-label="Customer Name">
                                        <button className="nameDepartmentBtn" data-toggle="modal" data-target="#detailModail"
                                            onClick={() => {
                                                setOneDepartment(item)
                                            }}
                                        >{item.nameDepartment}</button>
                                    </div>
                                    <div className="col col-2" data-label="Amount">{item.officePhone}</div>
                                    <div className="col col-2" data-label="Payment Status">

                                        <button className="nameDepartmentBtn" data-toggle="modal" data-target="#modalEmployeeDepartment"
                                            onClick={() => {
                                                setDepartmentname(item.nameDepartment)
                                                getlistEmployeeDepartment(item.id);
                                            }}
                                        ><i className="fas fa-eye"></i></button>

                                        <button className="nameDepartmentBtn" data-toggle="modal" data-target="#editDepartment"
                                            onClick={() => {
                                                setDepartmentID(item.id)
                                                setDepartmentEdit(item)
                                            }}
                                        ><i className="fas fa-edit"></i></button>

                                        <i onClick={() => {
                                            axios.delete(`department/` + item.id, { headers: { "Authorization": `Bearer ${DataLocalStorage}` } })
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


    ////Search Department by name
    const [dataSearch, setDataSearch] = useState({
        search: ""
    })
    const submitSearch = () => {
        if (dataSearch.search === "") {
            getArr();
        } else {
            let filterDepartment = listDepartment.filter(function (filter, index, array) {
                return filter.nameDepartment === dataSearch.search
            })
            setDepartment([...filterDepartment])
        }
    }

    useEffect(() => {
        submitSearch();
    }, [dataSearch.search]);

    function handleSearch(e) {
        const newdata = { ...dataSearch };
        newdata[e.target.id] = e.target.value;
        setDataSearch(newdata);
    }

    ///// Create New

    const [dataCreateNew, setDataCreateNew] = useState({
        nameDepartment: "",
        officePhone: "(+84)",
    })

    function submitCreateNew(e) {
        e.preventDefault();
        axios.post("/department", dataCreateNew, { headers: { "Authorization": `Bearer ${DataLocalStorage}` } })
            .then((res) => {
                setDataCreateNew({
                    nameDepartment: "",
                    officePhone: "",
                })
                getArr();
                window.location.reload();
            })
            .catch(err => {
                setDataCreateNew({
                    nameDepartment: "",
                    officePhone: "",
                })
                alert("Error")
            })
    }

    function handleCreateNew(e) {
        const newdata = { ...dataCreateNew };
        newdata[e.target.id] = e.target.value;
        setDataCreateNew(newdata);
    }

    // Get Employee Department
    const [listEmployeeDepartment, setListEmployeeDepartment] = useState([{
        departmentname: "",
    }]);

    const getlistEmployeeDepartment = async (id) => {
        const response = await axios
            .get(`/department/managerId/` + id, { headers: { "Authorization": `Bearer ${DataLocalStorage}` } })
            .catch((err) => console.log("Error: ", err));
        if (response && response.data) {
            console.log(response)
            setListEmployeeDepartment(response.data)
        }
    }
    useEffect(() => {
        getlistEmployeeDepartment();
    }, []);

    //// Edit Department
    const [departmentEdit, setDepartmentEdit] = useState([{
        nameDepartment: "",
        officePhone: "",
    }]);
    function handleEditDepartment(e) {
        const newdata = { ...departmentEdit };
        newdata[e.target.id] = e.target.value;
        setDepartmentEdit(newdata);
    }
    function submitEditDepartment(e) {
        e.preventDefault();
        axios.put("/department/" + departmentID, departmentEdit, { headers: { "Authorization": `Bearer ${DataLocalStorage}` } })
            .then((res) => {
                setDataCreateNew({
                    nameDepartment: "",
                    officePhone: "",
                })
                getArr()
                window.location.reload()
            })
            .catch(err => {
                setDataCreateNew({
                    nameDepartment: "",
                    officePhone: "",
                })
                alert("Error")
            })
    }
    return (
        <div className="adminDepertment">
            <div className="adminDepertmentTable">
                <div className="adminDepertmentFunction">
                    <div className="adminDepertmentCreateNew">
                        <button data-toggle="modal" data-target="#myModal" >New Department</button>
                    </div>
                    <div className="adminDepertmentSearch">
                        <button onClick={() => {
                            setDataSearch({
                                search: ""
                            })
                            getArr();
                        }} className="adminDepertmentSearchBtn"><i className="fas fa-reply-all">All</i></button>
                        <input onChange={(e) => handleSearch(e)} id="search" value={dataSearch.search} type="text" placeholder="name..." className="adminDepertmentSearchInput"></input>
                        {/* <button onClick={() => {
                            submitSearch();
                            setDataSearch({
                                search: ""
                            })
                        }} className="adminDepertmentSearchBtn"><i className="fas fa-search"></i></button> */}

                    </div>
                </div>
                {
                    viewTable()
                }
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
            {/* Create New */}
            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">New Department</h4>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => submitCreateNew(e)}>
                                <div className="createDepartment">
                                    <label htmlFor="name">Name: </label>
                                    <input onChange={(e) => handleCreateNew(e)} id="nameDepartment" value={dataCreateNew.nameDepartment} type="text"></input>
                                </div>

                                <div className="createDepartment">
                                    <label htmlFor="officePhone">Office Phone: </label>
                                    <input onChange={(e) => handleCreateNew(e)} id="officePhone" value={dataCreateNew.officePhone} type="text"></input>
                                </div>
                                <div className="createDepartmentBtn">
                                    <button type="button" className="btn btn-close" data-dismiss="modal">Close</button>
                                    <button className="btn btn-save">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Department Detail */}
            <div className="modal fade" id="detailModail" role="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Department Detail</h4>
                        </div>
                        <div className="modal-body">
                            <div className="createDepartment">
                                <label htmlFor="name">Id: </label>
                                <h3>{oneDepartment.id}</h3>
                            </div>
                            <div className="createDepartment">
                                <label htmlFor="name">Name: </label>
                                <h3>{oneDepartment.nameDepartment}</h3>
                            </div>

                            <div className="createDepartment">
                                <label htmlFor="officePhone">Office Phone: </label>
                                <h3>{oneDepartment.officePhone}</h3>
                            </div>
                            <div className="createDepartmentBtn">
                                <button type="button" className="btn btn-close" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Employee in Department*/}
            <div className="modal fade" id="modalEmployeeDepartment" role="modal">
                <div className="modal-dialog-employee">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Employee in {departmentname}</h4>
                        </div>
                        <div className="modal-body-EmployeeInDepartment">
                            <ul className="responsive-table">
                                <li className="table-header">
                                    <div className="col coll-1">id</div>
                                    <div className="col coll-3">Name Employee</div>
                                    <div className="col coll-3">Photo</div>
                                    <div className="col coll-1">Job Title</div>
                                    <div className="col coll-2">Cell Phone</div>
                                    <div className="col coll-3">email</div>
                                </li>
                                {
                                    listEmployeeDepartment.map((item) => {
                                        return (
                                            <li className="table-row" key={item.id}>
                                                <div className="col coll-1" data-label="Job Id">{item.id}</div>
                                                <div className="col coll-3" data-label="Job Id">{item.nameEmployee}</div>
                                                <div className="col coll-3" data-label="Job Id"><img className="employeeDepartmentImg" src={"https://nws-management.herokuapp.com/employee/" + item.photo} /></div>
                                                <div className="col coll-1" data-label="Job Id">{item.jobTitle}</div>
                                                <div className="col coll-2" data-label="Job Id">{item.cellPhone}</div>
                                                <div className="col coll-3" data-label="Job Id">{item.email}</div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className="createDepartmentBtn">
                                <button type="button" className="btn btn-close" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Department */}
            <div className="modal fade" id="editDepartment" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Edit</h4>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => submitEditDepartment(e)}>
                                <div className="createDepartment">
                                    <label htmlFor="nameDepartment">Name: </label>
                                    <input onChange={(e) => handleEditDepartment(e)} id="nameDepartment" value={departmentEdit.nameDepartment} type="text"></input>
                                </div>

                                <div className="createDepartment">
                                    <label htmlFor="officePhone">Office Phone: </label>
                                    <input onChange={(e) => handleEditDepartment(e)} id="officePhone" value={departmentEdit.officePhone} type="text"></input>
                                </div>
                                <div className="createDepartmentBtn">
                                    <button type="button" className="btn btn-close" data-dismiss="modal">Close</button>
                                    <button className="btn btn-save">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Department;