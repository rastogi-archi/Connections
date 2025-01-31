import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    isLoading: true,
    isAuthenticated: false,
    user: null
}

export const registerUser = createAsyncThunk(
    "/auth/register",
    async (FormData) => {
        const response = await axios.post(
            "http://localhost:5000/api/auth/register",
            FormData,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        return response.data;
    }
)

export const loginUser = createAsyncThunk(
    "/auth/login",
    async (FormData) => {
        const response = await axios.post(
            "http://localhost:5000/api/auth/login",
            FormData,
            {
                withCredentials: true
            }
        )
        return response.data;
    }
)

export const logoutUser = createAsyncThunk(
    "/auth/logout",
    async () => {
        const response = await axios.post(
            "http://localhost:5000/api/auth/logout",
            {},
            {
                withCredentials: true
            }
        )
        return response.data;
    }
)

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            });
    }
})

export default AuthSlice.reducer