import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as uploadApi from '../../api/uploadApi';
import * as postApi from '../../api/postApi';

const initialState = {
    posts: [],
    postLoading: 'idle',
    imageLoading: 'idle',
    error: false,
    postUploading: 'idle',
};

export const uploadImage = createAsyncThunk(
    'posts/uploadImage',
    async (dataUpload) => {
        try {
            const { data } = await uploadApi.uploadImage(dataUpload);
            return data;
        } catch (error) {
            alert(error?.response?.data?.message);
            return error?.response?.data;
        }
    }
);

export const uploadPost = createAsyncThunk(
    'posts/uploadPost',
    async (dataUpload) => {
        try {
            const { data } = await uploadApi.uploadPost(dataUpload);
            return data;
        } catch (error) {
            alert(error?.response?.data?.message);
            return error?.response?.data;
        }
    }
);

export const getTimelinePosts = createAsyncThunk(
    'posts/getTimelinePosts',
    async (id) => {
        try {
            const { data } = await postApi.getTimelinePosts(id);
            return data;
        } catch (error) {
            alert(error?.response?.data?.message);
            return error?.response?.data;
        }
    }
);

export const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        // upload image
        [uploadImage.pending]: (state, action) => {
            state.imageLoading = 'pending';
        },
        [uploadImage.fulfilled]: (state, action) => {
            state.imageLoading = 'success';
        },
        [uploadImage.rejected]: (state, action) => {
            state.imageLoading = 'failed';
        },
        // upload post
        [uploadPost.pending]: (state, action) => {
            state.postLoading = 'pending';
        },
        [uploadPost.fulfilled]: (state, action) => {
            if (action.payload.success) {
                const { post } = action.payload;
                state.posts.push(post);
            }
            state.postLoading = 'success';
        },
        [uploadPost.rejected]: (state, action) => {
            state.postLoading = 'failed';
        },
        // get timeline posts
        [getTimelinePosts.pending]: (state, action) => {
            state.postLoading = 'pending';
        },
        [getTimelinePosts.fulfilled]: (state, action) => {
            if (action.payload.success) {
                const { posts } = action.payload;
                state.posts = posts;
            }
            state.postLoading = 'success';
        },
        [getTimelinePosts.rejected]: (state, action) => {
            state.postLoading = 'failed';
        },
    },
});

export default postsSlice.reducer;
