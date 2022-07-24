import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as authApi from '../../api/authApi';

const initialState = {
    authData: localStorage.getItem('profile')
        ? JSON.parse(localStorage.getItem('profile'))
        : null,
    authLoading: 'idle',
    error: false,
    updateLoading: false,
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

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.authData = null;
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
                state.authData = { user, token };
            }
            state.authLoading = 'success';
        },
        [signup.rejected]: (state, action) => {
            state.authLoading = 'failed';
        },
        // logins
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
                state.authData = { user, token };
            }
            state.authLoading = 'success';
        },
        [login.rejected]: (state, action) => {
            state.authLoading = 'failed';
        },
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
