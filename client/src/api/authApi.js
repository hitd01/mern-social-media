import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000' });

export const signup = (formData) => api.post(`/api/auth/register`, formData);

export const login = (formData) => api.post(`/api/auth/login`, formData);
