import axios from "axios";

const API = axios.create({

    baseURL: "https://task-management-sytsem-1.onrender.com/api",

});

export default API;