import axios from 'axios';

const apiUrl =
    process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_DEV_URL
        : process.env.REACT_APP_PRODUCT_URL;

const api = axios.create({
    baseURL: `${apiUrl}`,
    headers: {
        Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('profile'))?.token,
    },
});

export const getUser = (userId) => api.get(`/user/${userId}`);
export const updateUser = (id, formData) => api.put(`/user/${id}`, formData);
export const getAllUsers = () => api.get('/user');
export const followUser = (id, data) => api.put(`/user/${id}/follow`, data);
export const unfollowUser = (id, data) => api.put(`/user/${id}/unfollow`, data);
