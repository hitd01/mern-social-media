import api from './config';

export const uploadImage = (data) => api.post('/upload', data);
export const uploadPost = (data) => api.post('/post', data);
