import React, { useEffect, useState } from 'react';
import '../Style/AdminDepartment.css';
import { axios } from '../HeaderAPI';

function Department() {

    // Get Department
    const DataLocalStorage = localStorage.getItem("accessToken");

    const [listDepartment, setListDepartment] = useState([]);

    let department = [...listDepartment]


    const getArr = async () => {
        const response = await axios
            .get("/department", { headers: { "Authorization": `Bearer ${DataLocalStorage}` } })
            .catch((err) => console.log("Error: ", err));
        if (response && response.data) {
            setListDepartment(response.data)
        }
    }
    useEffect(() => {
        getArr();
    }, []);

    //////// view table
    function viewTable() {
        const checkRole = localStorage.getItem("role")
        if (checkRole === 0) {
            return (
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">id</div>
                        <div className="col col-3">Department Name</div>
                        <div className="col col-2">Office Phone</div>
                        <div className="col col-1">action</div>
                    </li>
                    {
                        department.map((item) => {
                            return (
                                <li className="table-row" key={item.id}>
                                    <div className="col col-1" data-label="Job Id">{item.id}</div>
                                    <div className="col col-3" data-label="Customer Name">{item.name}</div>
                                    <div className="col col-2" data-label="Amount">{item.officePhone}</div>
                                    <div className="col col-1" data-label="Payment Status">
                                        <i className="fas fa-eye"></i>
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
                        <div className="col col-3">Department Name</div>
                        <div className="col col-2">Office Phone</div>
                        <div className="col col-1">action</div>
                    </li>
                    {
                        department.map((item) => {
                            return (
                                <li className="table-row" key={item.id}>
                                    <div className="col col-1" data-label="Job Id">{item.id}</div>
                                    <div className="col col-3" data-label="Customer Name">{item.name}</div>
                                    <div className="col col-2" data-label="Amount">{item.officePhone}</div>
                                    <div className="col col-1" data-label="Payment Status">
                                        <i onClick={() => {
                                            axios.delete(`department/` + item.id, { headers: { "Authorization": `Bearer ${DataLocalStorage}` } })
                                                .then(res => {
                                                    getArr();
                                                })
                                                .catch(
                                                )
                                        }} className="fas fa-trash-alt"></i>
                                        <i className="fas fa-eye"></i>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }
    }

    const [dataSearch, setDataSearch] = useState({
        search: ""
    })
    const submitSearch = () => {
        if (dataSearch.search === "") {
            getArr();
        } else {
            let filterDepartment = listDepartment.filter(function (filter, index, array) {
                return filter.name === dataSearch.search
            })
            department = filterDepartment
        }
    }

    function handleSearch(e) {
        const newdata = { ...dataSearch };
        newdata[e.target.id] = e.target.value;
        setDataSearch(newdata);
    }



    return (
        <div className="adminDepertment">
            <div className="adminDepertmentTable">
                <div className="adminDepertmentFunction">
                    <div className="adminDepertmentCreateNew">
                        <button data-toggle="modal" data-target="#myModal">New Department</button>
                    </div>
                    <div className="adminDepertmentSearch">
                        <button onClick={() => {
                            getArr();
                        }} className="adminDepertmentSearchBtn"><i className="fas fa-reply-all">All</i></button>
                        <input onChange={(e) => handleSearch(e)} id="search" value={dataSearch.search} type="text" placeholder="name..." className="adminDepertmentSearchInput"></input>
                        <button onClick={() => {
                            submitSearch();
                        }} className="adminDepertmentSearchBtn"><i className="fas fa-search"></i></button>

                    </div>
                </div>
                {
                    viewTable()
                }
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
                            <form>
                                <div className="createDepartment">
                                    <label htmlFor="name">Name: </label>
                                    <input id="name" type="text"></input>
                                </div>

                                <div className="createDepartment">
                                    <label htmlFor="officePhone">Office Phone: </label>
                                    <input id="officePhone" type="text"></input>
                                </div>
                                <div className="createDepartmentBtn">
                                    <button type="button" className="btn btn-close" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-save" >Save</button>
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