import axios from 'axios';

export default axios.create({
    baseURL: `http://${process.env.BACKEND_IP}:8080`
});