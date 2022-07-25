import axios from 'axios';

const apiUrl =
    process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_DEV_URL
        : process.env.REACT_APP_PRODUCT_URL;
const api = axios.create({ baseURL: `${apiUrl}` });

export const signup = (formData) => api.post(`/auth/register`, formData);

export const login = (formData) => api.post(`/auth/login`, formData);
