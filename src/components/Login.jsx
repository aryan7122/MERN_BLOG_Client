// src/components/Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login } from '../services/api';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const { user, login: loginUser, logout } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userData = await login(email, password);
            loginUser(userData);
            setMessage('Login successful!');
            setAlertType('success');
            console.log('login');
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Login failed. Please try again.');
            setAlertType('error');
        } finally {
            setLoading(false);
            setTimeout(() => {
                setMessage('');
            }, 5000);
        }
    };

    const handleLogout = () => {
        logout();
        setMessage('Logout successful!');
        setAlertType('success');
        console.log('logout');
        setTimeout(() => {
            setMessage('');
        }, 5000);
    };

    return (
        <div className='w-full h-[90vh] flex items-center justify-center'>
            {message && (
                <Stack
                    sx={{
                        position: 'fixed',
                        top: '10%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        maxWidth: '90%', // Ensure it doesn't go beyond screen width on smaller screens
                        zIndex: 50,
                    }}
                    spacing={2}
                >
                    <Alert severity={alertType} sx={{ width: 'auto' }}>
                        {message}
                    </Alert>
                </Stack>
            )}
            {user ? (
                <button onClick={handleLogout} className='w-full border my-5 bg-slate-950 text-white text-2xl p-3 rounded-lg active:shadow-2xl active:bg-slate-800 hover:shadow-xl'>Logout</button>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="p-10 rounded-lg shadow-none sm:shadow-lg hover:md:shadow-2xl">
                        <h2 className='text-6xl font-bold w-full text-center py-3'>Login</h2>
                        {loading ? (
                            <div className='w-fit h-fit p-10 justify-center items-center flex'>
                                <img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif"
                                    className='w-28 h-28'
                                    alt="Loading" />
                            </div>
                        ) : (
                            <>
                                <div>
                                    <h3 className='text-3xl font-bold py-3'>Email</h3>
                                    <input type="email"
                                        className='border p-3 w-full max-w-full md:w-[300px] rounded-lg active:bg-slate-700 focus:bg-slate-900 text-2xl focus:text-white hover:shadow-xl'
                                        value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div>
                                    <h3 className='text-3xl font-bold py-3'>Password</h3>
                                    <input type="password"
                                        className='border p-3 w-full max-w-full md:w-[300px] rounded-lg active:bg-slate-700 focus:bg-slate-900 text-2xl focus:text-white hover:shadow-xl'
                                        value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <button type="submit"
                                    className='w-full border my-5 bg-slate-950 text-white text-2xl p-3 rounded-lg active:shadow-2xl active:bg-slate-800 hover:shadow-xl'
                                >Login</button>
                                <Link to="/register">Register</Link>
                            </>
                        )}
                    </div>
                </form>
            )}
        </div>
    );
};

export default Login;
