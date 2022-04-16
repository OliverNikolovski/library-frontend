import axios from "axios";

const instance = axios.create({
    baseURL: "https://library-emt-heroku.herokuapp.com/api",
    headers: {
        // 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});

export default instance;