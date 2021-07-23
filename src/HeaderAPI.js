import Axios from "axios";

export const axios = Axios.create({
    // baseURL: "https://rn-app-bc1e7.firebaseio.com",
    baseURL: "https://nws-management.herokuapp.com/",
    // headers: { Auth: "Simple AUTH" },
    timeout: 3000,
});