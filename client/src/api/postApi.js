import api from './config';

export const getTimelinePosts = (id) => api.get(`/post/${id}/timeline`);
export const likePost = (id, userId) => api.put(`post/${id}/like`, { userId });
