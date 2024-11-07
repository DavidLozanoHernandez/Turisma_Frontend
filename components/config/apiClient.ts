import axios from "axios";

const apiClient = axios.create({
    //baseURL: 'http:localhost:3000',
    baseURL: 'http:/172.16.24.185:3000',
    headers: {
        'Content-Type':'application/json',
    },
})

export default apiClient;