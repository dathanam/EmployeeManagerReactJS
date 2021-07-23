import React, { useState, useEffect } from 'react';
import '../Style/NewEmployee.css'
import { useHistory } from "react-router-dom";
import { axios } from '../HeaderAPI';

function NewEmployee() {
    const history = useHistory();
    const DataLocalStorage = localStorage.getItem("accessToken");

    const [objectURL, setObjectURL] = useState({
        post: "",
        url: ""
    });

    // create
    const [dataCreateEmployee, setDataCreateEmployee] = useState({
        nameEmployee: "",
        photo: "",
        jobTitle: "",
        cellPhone: "(+84)",
        email: "",
        managerId: ""
    })
    function submit(e) {
        e.preventDefault();
        var formdata = new FormData();
        formdata.append("nameEmployee", dataCreateEmployee.nameEmployee);
        formdata.append("jobTitle", dataCreateEmployee.jobTitle);
        formdata.append("cellPhone", dataCreateEmployee.cellPhone);
        formdata.append("email", dataCreateEmployee.email);
        formdata.append("managerId", dataCreateEmployee.managerId);
        formdata.append("photo", objectURL.post, "employee.jpg");
        axios.post('/employee', formdata, { headers: { "Authorization": `Bearer ${DataLocalStorage}` } })
            .then((res) => {
                console.log(res)
                if (res.status === 201) {
                    if (res.data.statusCode === 201) {
                        alert(res.data.message)
                        history.push("/admin/employee")
                    } else if (res.data.statusCode === 400) {
                        alert(res.data.message)
                    } else {
                        setDataCreateEmployee({
                            nameEmployee: "",
                            photo: "",
                            jobTitle: "",
                            cellPhone: "(+84)",
                            email: "",
                            managerId: ""
                        })
                    }
                }
            })
    }

    function handle(e) {
        const newdata = { ...dataCreateEmployee };
        newdata[e.target.id] = e.target.value;
        setDataCreateEmployee(newdata);
    }

    //Get Department
    const [listDepartment, setListDepartment] = useState([]);
    const getListDepartment = async () => {
        const response = await axios
            .get("/department", { headers: { "Authorization": `Bearer ${DataLocalStorage}` } })
            .catch((err) => console.log("Error: ", err));
        if (response && response.data) {
            setListDepartment(response.data)
        }
    }
    useEffect(() => {
        getListDepartment();
    }, []);
    return (
        <div className="newEmployee">
            <form className="newEmployeeForm" onSubmit={(e) => submit(e)}>
                <div className="newEmployeeBody">

                    <div className="newEmployeeImg">
                        <label htmlFor="image_uploads" className="imageUploadButton">Choose images</label>
                        <br />
                        <input id="image_uploads" type="file" className="image_uploads-input" onChange={(e) => setObjectURL({
                            post: e.target.files[0],
                            url: URL.createObjectURL(e.target.files[0]),
                        })}></input>
                        <img className="img-fluid" src={objectURL.url} alt="Cake" width="150" height="150" />
                    </div>
                    <div className="newEmployeeText">
                        <div className="newEmployeeTextBody">
                            <div className="newEmployeeDev">
                                <label htmlFor="nameEmployee">Name:</label>
                                <input onChange={(e) => handle(e)} id="nameEmployee" value={dataCreateEmployee.nameEmployee} type="text" />
                            </div>
                            <div className="newEmployeeDev">
                                <label htmlFor="jobTitle">Job Title:</label>
                                <input onChange={(e) => handle(e)} id="jobTitle" value={dataCreateEmployee.jobTitle} type="text" />
                            </div>
                            <div className="newEmployeeDev">
                                <label htmlFor="cellPhone">Phone:</label>
                                <input onChange={(e) => handle(e)} id="cellPhone" value={dataCreateEmployee.cellPhone} type="text" />
                            </div>
                            <div className="newEmployeeDev">
                                <label htmlFor="email">Email:</label>
                                <input onChange={(e) => handle(e)} id="email" value={dataCreateEmployee.email} type="text" />
                            </div>
                            <div className="newEmployeeDev">
                                <label htmlFor="managerId">Department:</label>
                                <select onChange={(e) => handle(e)} id="managerId" value={dataCreateEmployee.managerId}>
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
                                <button type="button">Cancel</button>
                                <button>Save</button>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
}

export default NewEmployee;