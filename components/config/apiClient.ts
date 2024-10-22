import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Cont-Type':'application/json',
    },
})

export default apiClient;