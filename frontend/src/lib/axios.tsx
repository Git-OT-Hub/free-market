import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:80',
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    withXSRFToken: true,
});

export default http;