import axios from "axios";

const instance = axios.create({
    baseURL: "http://192.168.0.30:8080/api",
    headers: {
        // 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});

export default instance;