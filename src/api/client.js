import axios from 'axios';

const client = axios.create({
    baseURL: 'http://app.kibrito.com:8054',
});

client.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default client;
