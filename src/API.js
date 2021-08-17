import { axios } from './HeaderAPI';

axios.interceptors.request.use(function(config){
    const token = localStorage.getItem("accessToken");
    config.headers.Authorization =  `Bearer ${token}`;

    return config;
  })

export default {
    //Auth
    login:(data) => axios.post('/auth/login', data),
    signup:(data) => axios.post(`auth/register`, data),
    changePass:(data) => axios.put("/user/auth/changePassword", data),
    // User
    getUser:() => axios.get("/user"),
    putUser:(id, data) => axios.put('/user/' + id, data),
    deleteUser:(id) => axios.delete(`user/` + id),

    //employee
    getEmployee:(start) => axios.get("/employee/paginate?page=" + start + "&limit=5"),
    searchEmployee:(data) => axios.get('employee/paginate?page=1&limit=5&nameEmployee=' + data),
    postEmployee:(data) => axios.post('/employee', data),
    putEmployee:(id, data) => axios.put('/employee/' + id, data),
    deleteEmployee:(id) => axios.delete(`employee/` + id),

    //department
    getDepartment:() => axios.get("/department"),
    getDepartmentpaginate:(start) => axios.get("/department/paginate?page=" + start + "&limit=5"),
    postDepartment:(data) => axios.post("/department", data),
    getlistEmployeeDepartment:(id) => axios.get(`/department/managerId/` + id),
    putDepartment:(id, data) => axios.put("/department/" + id, data),
    deleteDepartment:(id) =>  axios.delete(`department/` + id)
}
