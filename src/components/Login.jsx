// src/components/Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login } from '../services/api';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, login: loginUser, logout } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(email, password);
            loginUser(userData);
            console.log('login');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleLogout = () => {
        logout();
        console.log('logout');
    };

    return (
        <div className=' w-full h-[90vh] flex items-center justify-center  '>
            {user ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <form onSubmit={handleSubmit}>
                        <div className=" p-10 rounded-lg shadow-lg hover:shadow-2xl">
                            <h2 className='text-6xl font-bold w-full  text-center py-3  '>Login</h2>
                            <div>
                                <h3 className='text-3xl font-bold py-3'>Email</h3>
                                <input type="email"
                                    className='border p-3 w-[300px] rounded-lg active:bg-slate-700 focus:bg-slate-900 text-2xl focus:text-white  hover:shadow-xl'
                                    value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div>
                                <h3 className='text-3xl font-bold py-3'>Password</h3>
                                <input type="password"
                                    className='border p-3 w-[300px] rounded-lg active:bg-slate-700 focus:bg-slate-900 text-2xl focus:text-white  hover:shadow-xl'
                                    value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit"
                                className='w-full border my-5 bg-slate-950 text-white text-2xl p-3 rounded-lg active:shadow-2xl active:bg-slate-800 hover:shadow-xl'
                            >Login</button>
                            <Link to="/register">Register</Link>
                   </div>
                </form>
            )}
        </div>
    );
};

export default Login;
