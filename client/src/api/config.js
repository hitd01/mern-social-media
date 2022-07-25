import axios from 'axios';

const apiUrl =
    process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_DEV_URL
        : process.env.REACT_APP_PRODUCT_URL;

const api = axios.create({
    baseURL: `${apiUrl}`,
});

api.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization =
            'Bearer ' + JSON.parse(localStorage.getItem('profile'))?.token;
    }

    return req;
});

export default api;
