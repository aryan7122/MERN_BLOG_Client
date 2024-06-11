// src/context/AuthContext.js

import React, { createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login as loginAction, logout as logoutAction } from '../redux/slices/apiSlice';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isLoggedIn, userRole } = useSelector((state) => state.api);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser && parsedUser.data && parsedUser.data.roles) {
                dispatch(loginAction({ user: parsedUser, userRole: parsedUser.data.roles }));
            }
        }
    }, [dispatch]);

    const login = (userData) => {
        if (userData && userData.data && userData.data.roles) {
            dispatch(loginAction({ user: userData, userRole: userData.data.roles }));
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/');
        } else {
            console.error('Invalid userData structure', userData);
        }
    };

    const logout = () => {
        dispatch(logoutAction());
        navigate('/login');
    };

    const getUserRole = () => userRole;
    const getIsLoggedIn = () => isLoggedIn;

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: getIsLoggedIn, userRole: getUserRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
