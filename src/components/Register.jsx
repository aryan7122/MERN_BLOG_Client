// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(email, password, role);
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <div className='w-full h-[90vh] flex items-center justify-center'>
            <form onSubmit={handleSubmit}>
                <div className="p-10 rounded-lg shadow-lg hover:shadow-2xl">
                    <h2 className='text-6xl font-bold w-full text-center py-3 '>Register</h2>
                    <div>
                        <h3 className='text-3xl font-bold py-3'>Email</h3>
                        <input type="email"
                            className='border p-3 w-[300px] rounded-lg active:bg-slate-700 focus:bg-slate-900 text-2xl focus:text-white hover:shadow-xl'
                            value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <h3 className='text-3xl font-bold py-3'>Password</h3>
                        <input type="password"
                            className='border p-3 w-[300px] rounded-lg active:bg-slate-700 focus:bg-slate-900 text-2xl focus:text-white hover:shadow-xl'
                            value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div>
                        <h3 className='text-3xl font-bold py-3'>Role</h3>
                        <select className='border p-3 w-[300px] rounded-lg active:bg-slate-700 focus:bg-slate-900 text-2xl focus:text-white hover:shadow-xl'
                            value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit"
                        className='w-full border my-5 bg-slate-950 text-white text-2xl p-3 rounded-lg active:shadow-2xl active:bg-slate-800 hover:shadow-xl'
                    >Register</button>
                    <Link to="/login">login</Link>

                </div>
            </form>
        </div>
    );
};

export default Register;
