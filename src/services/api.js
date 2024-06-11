// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const register = async (email, password, role) => {
    const response = await axios.post(`${API_URL}/register`, { email, password, role });
    return response.data;
};

const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log(' response.data.status', response.data.status)
    console.log(' response.data.message', response.data.message)
    console.log(' response.data.email', response.data.email)
    console.log(' response.data.roles', response.data.roles)
    console.log(' response.data', response)
    return response;
};



export { register, login };
