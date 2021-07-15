import React, { useEffect, useState } from 'react';
import '../Style/AdminDepartment.css';
import { axios } from '../HeaderAPI';

function Department() {

    // Get Department
    const DataLocalStorage = localStorage.getItem("accessToken");

    const [listDepartment, setListDepartment] = useState([]);

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

    // view table
    function viewTable() {
        const checkRole = localStorage.getItem("role")
        if (checkRole === 0) {
            return (
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">id</div>
                        <div className="col col-3">Department Name</div>
                        <div className="col col-2">Office Phone</div>
                    </li>
                    {
                        listDepartment.map((item) => {
                            return (
                                <li className="table-row">
                                    <div className="col col-1" data-label="Job Id">{item.id}</div>
                                    <div className="col col-3" data-label="Customer Name">{item.name}</div>
                                    <div className="col col-2" data-label="Amount">{item.officePhone}</div>
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
                        <div className="col col-3">Department Name</div>
                        <div className="col col-2">Office Phone</div>
                        <div className="col col-1">action</div>
                    </li>
                    {
                        listDepartment.map((item) => {
                            return (
                                <li className="table-row">
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
                                        }} class="fas fa-trash-alt"></i>
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
        id: ""
    })
    const submitSearch = async () => {
        const id = dataSearch.id;
        const response = await axios
            .get(`/department/` + dataSearch.id, { headers: { "Authorization": `Bearer ${DataLocalStorage}` } })
            .catch((err) => console.log("Error: ", err));
        if (response && response.data) {
            setListDepartment([response.data])
        }
    }
    useEffect(() => {
        submitSearch();
    }, [dataSearch.id]);

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
                        <button>New Department</button>
                    </div>
                    <div className="adminDepertmentSearch">
                        <form onSubmit={(e)=>submitSearch(e)}>
                            <input onChange={(e) => handleSearch(e)} id="id" value={dataSearch.id} type="text" placeholder="Search" className="adminDepertmentSearchInput"></input>
                            <button className="adminDepertmentSearchBtn"><i class="fas fa-search"><label htmlFor="Checkbox"></label></i></button>
                        </form>
                    </div>
                </div>
                {
                    viewTable()
                }
            </div>
        </div>
    );
}

export default Department;