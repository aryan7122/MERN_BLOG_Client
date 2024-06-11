import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './slices/apiSlice';

const store = configureStore({
    reducer: {
        api: apiReducer,
    },
});

export default store;
