import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as authApi from '../../api/authApi';

const initialState = {
    authData: null,
    authLoading: 'idle',
    error: false,
    updateLoading: false,
};

export const signup = createAsyncThunk('auth/signUp', async (formData) => {
    try {
        const { data } = await authApi.signup(formData);
        return data;
    } catch (error) {
        alert(error.response.data.message);
        return error.response.data;
    }
});

export const login = createAsyncThunk(
    'auth/signUp',
    async (formData, { extra }) => {
        try {
            const { data } = await authApi.login(formData);
            return data;
        } catch (error) {
            alert(error.response.data.message);
            return error.response.data;
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        // signup
        [signup.pending]: (state, action) => {
            state.authLoading = 'pending';
        },
        [signup.fulfilled]: (state, action) => {
            console.log(action.payload);
            if (action.payload.success) {
                const { user, token } = action.payload;
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
            if (action.payload.success) {
                const { user, token } = action.payload;
                state.authData = { user, token };
            }
            state.authLoading = 'success';
        },
        [login.rejected]: (state, action) => {
            state.authLoading = 'failed';
        },
    },
});

export default authSlice.reducer;
