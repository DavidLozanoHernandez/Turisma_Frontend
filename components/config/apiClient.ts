import axios from "axios";

const apiClient = axios.create({
    //baseURL: 'http:localhost:3000',
    //baseURL: 'http:192.168.1.71:3000',
    baseURL: 'http:172.16.29.236:3000',
    headers: {
        'Content-Type':'application/json',
    },
})

export default apiClient;