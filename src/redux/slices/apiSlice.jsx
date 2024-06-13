import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    username: null,
    user: null,
    userRole: null,
    userEmail: null,
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
        setPosts(state, action) { // Add a new reducer to update posts array
            state.posts = action.payload;
        },
        
    },
});

export const { login, logout, setUserRole, setPosts } = apiSlice.actions;
export default apiSlice.reducer;
