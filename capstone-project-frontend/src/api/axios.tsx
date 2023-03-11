import axios from 'axios';

export default axios.create({
    // baseURL: `http://${process.env.BACKEND_IP}:8080`
    baseURL: `http://localhost:8080`
});