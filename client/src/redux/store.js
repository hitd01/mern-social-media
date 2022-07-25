import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../pages/auth/authSlice';
import postsReducer from '../components/postSide/postSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
    },
});
