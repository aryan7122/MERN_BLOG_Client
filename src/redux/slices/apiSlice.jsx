import { createSlice } from '@reduxjs/toolkit';

// Initial state for the slice
const initialState = {
    isLoggedIn: false,
    user: null,
    userRole: null,
    // Add other relevant API-related state here
};

const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.userRole = action.payload.userRole;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout(state) {
            state.isLoggedIn = false;
            state.user = null;
            state.userRole = null;
            localStorage.removeItem('user');
        },
        setUserRole(state, action) {
            state.userRole = action.payload;
        },
        // Add other reducers for API interactions
    },
});

// Export the actions created by the slice
export const { login, logout, setUserRole } = apiSlice.actions;

// Export the reducer to be used in the store
export default apiSlice.reducer;
