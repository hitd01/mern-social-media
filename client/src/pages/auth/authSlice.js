import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as authApi from '../../api/authApi';
import * as userApi from '../../api/userApi';
import setAuthToken from '../../utils/setAuthToken';

const initialState = {
    authData: localStorage.getItem('profile')
        ? JSON.parse(localStorage.getItem('profile'))
        : null,
    authLoading: 'idle',
    error: false,
    updateLoading: 'idle',
};

export const signup = createAsyncThunk('auth/signUp', async (formData) => {
    try {
        const { data } = await authApi.signup(formData);
        return data;
    } catch (error) {
        alert(error?.response?.data?.message);
        return error?.response?.data;
    }
});

export const login = createAsyncThunk('auth/signUp', async (formData) => {
    try {
        const { data } = await authApi.login(formData);
        return data;
    } catch (error) {
        alert(error?.response?.data?.message);
        return error?.response?.data;
    }
});

export const followUser = createAsyncThunk(
    'auth/followUser',
    async (followData) => {
        try {
            const { followUserId, currentUserId } = followData;
            const { data } = await userApi.followUser(followUserId, {
                _id: currentUserId,
            });
            return { ...data, followUserId };
        } catch (error) {
            alert(error?.response?.data?.message);
            return error?.response?.data;
        }
    }
);

export const unfollowUser = createAsyncThunk(
    'auth/unfollowUser',
    async (unfollowData) => {
        try {
            const { followUserId, currentUserId } = unfollowData;
            const { data } = await userApi.unfollowUser(followUserId, {
                _id: currentUserId,
            });
            return { ...data, followUserId };
        } catch (error) {
            alert(error?.response?.data?.message);
            return error?.response?.data;
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.authData = null;
            setAuthToken();
            localStorage.clear('profile');
        },
    },
    extraReducers: {
        // signup
        [signup.pending]: (state, action) => {
            state.authLoading = 'pending';
        },
        [signup.fulfilled]: (state, action) => {
            if (action.payload.success) {
                const { user, token } = action.payload;
                localStorage.setItem(
                    'profile',
                    JSON.stringify({ user, token })
                );
                setAuthToken(token);
                state.authData = { user, token };
            }
            state.authLoading = 'success';
        },
        [signup.rejected]: (state, action) => {
            state.authLoading = 'failed';
        },
        // login
        [login.pending]: (state, action) => {
            state.authLoading = 'pending';
        },
        [login.fulfilled]: (state, action) => {
            if (action.payload?.success) {
                const { user, token } = action.payload;
                localStorage.setItem(
                    'profile',
                    JSON.stringify({ user, token })
                );
                setAuthToken(token);
                state.authData = { user, token };
            }
            state.authLoading = 'success';
        },
        [login.rejected]: (state, action) => {
            state.authLoading = 'failed';
        },
        // follow user
        [followUser.pending]: (state, action) => {
            state.updateLoading = 'pending';
        },
        [followUser.fulfilled]: (state, action) => {
            if (action.payload?.success) {
                const { followUserId } = action.payload;
                state.authData.user.following.push(followUserId);
                localStorage.setItem('profile', JSON.stringify(state.authData));
            }
            state.updateLoading = 'success';
        },
        [followUser.rejected]: (state, action) => {
            state.updateLoading = 'failed';
        },
        // unfollow user
        [unfollowUser.pending]: (state, action) => {
            state.updateLoading = 'pending';
        },
        [unfollowUser.fulfilled]: (state, action) => {
            if (action.payload?.success) {
                const { followUserId } = action.payload;
                state.authData.user.following =
                    state.authData.user.following.filter(
                        (id) => id !== followUserId
                    );
                localStorage.setItem('profile', JSON.stringify(state.authData));
            }
            state.updateLoading = 'success';
        },
        [unfollowUser.rejected]: (state, action) => {
            state.updateLoading = 'failed';
        },
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
