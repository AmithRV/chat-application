import axios from 'axios';

const public_ip = '192.168.97.125';

const instance = axios.create({
    baseURL: `http://${public_ip}:8000`
});

export default instance