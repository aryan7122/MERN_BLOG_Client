// src/redux/slice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    username: null,
    user: null,
    userRole: null,
    userEmail: null,
    loading: false, // Add loading state
};

const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.username = action.payload.username;
            state.userEmail = action.payload.userEmail;
            state.userRole = action.payload.userRole;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout(state) {
            state.isLoggedIn = false;
            state.username = null;
            state.user = null;
            state.userRole = null;
            localStorage.removeItem('user');
        },
        setUserRole(state, action) {
            state.userRole = action.payload;
        },
        setPosts(state, action) {
            state.posts = action.payload;
        },
        setLoading(state, action) { // Add a new reducer to manage loading state
            state.loading = action.payload;
        },
    },
});

export const { login, logout, setUserRole, setPosts, setLoading } = apiSlice.actions;
export default apiSlice.reducer;
