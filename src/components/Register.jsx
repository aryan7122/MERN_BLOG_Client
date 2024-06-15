// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState('User');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(name, email, password, role);
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full h-[90vh] flex items-center justify-center'>
            <form onSubmit={handleSubmit}>
                <div className="p-5 sm:p-10rounded-lg shadow-none sm:shadow-lg hover:md:shadow-2xl">
                    <h2 className='text-4xl sm:text-6xl font-bold w-full text-center py-3'>Register</h2>
                    {loading ?
                        (
                            <div className='w-fit h-fit p-10 justify-center items-center flex'>
                                <img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif"
                                    className='w-16 h-16 sm:w-28 sm:h-28'
                                    alt="" />
                            </div>
                        ) : (
                            <>
                                <div>
                                    <h3 className='text-xl sm:text-3xl font-bold py-3'>Name</h3>
                                    <input type="text"
                                        className='border p-2 sm:p-3 w-[250px] sm:w-[300px] rounded-lg active:bg-slate-700 focus:bg-slate-900 text-xl sm:text-2xl focus:text-white hover:shadow-xl'
                                        value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div>
                                    <h3 className='text-xl sm:text-3xl font-bold py-3'>Email</h3>
                                    <input type="email"
                                        className='border p-2 sm:p-3 w-[250px] sm:w-[300px] rounded-lg active:bg-slate-700 focus:bg-slate-900 text-xl sm:text-2xl focus:text-white hover:shadow-xl'
                                        value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div>
                                    <h3 className='text-xl sm:text-3xl font-bold py-3'>Password</h3>
                                    <input type="password"
                                        className='border p-2 sm:p-3 w-[250px] sm:w-[300px] rounded-lg active:bg-slate-700 focus:bg-slate-900 text-xl sm:text-2xl focus:text-white hover:shadow-xl'
                                        value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div>
                                    <h3 className='text-xl sm:text-3xl font-bold py-3'>Role</h3>
                                    <select className='border p-2 sm:p-3 w-[250px] sm:w-[300px] rounded-lg active:bg-slate-700 focus:bg-slate-900 text-xl sm:text-2xl focus:text-white hover:shadow-xl'
                                        value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="User">User</option>
                                        <option value="Author">Author</option>
                                        {/* <option value="Admin">Admin</option> */}
                                    </select>
                                </div>
                                <button type="submit"
                                    className='w-full border my-5 bg-slate-950 text-white text-xl sm:text-2xl p-2 sm:p-3 rounded-lg active:shadow-2xl active:bg-slate-800 hover:shadow-xl'
                                >Register</button>
                                <Link to="/login" className='text-sm sm:text-base'>login</Link>
                            </>
                        )}
                </div>
            </form>
        </div>

    );
};

export default Register;
