import Axios from "axios";

export const axios = Axios.create({
    // baseURL: "https://rn-app-bc1e7.firebaseio.com",
    baseURL: "http://192.168.20.233:4000/",
    // headers: { Auth: "Simple AUTH" },
    timeout: 3000,
});