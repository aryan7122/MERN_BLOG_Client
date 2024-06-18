import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // try {
        //     const userData = await login(email, password);
        //     loginUser(userData);
        //     console.log('login');
        // } catch (error) {
        //     console.error('Login error:', error);
        // } finally {
        //     setLoading(false);
        // }
    };
    return (
        <footer className="bg-gray-900 text-white py-8 ">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    {/* Logo and Description */}
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <img src="https://cdn-icons-png.freepik.com/512/6114/6114045.png"
                            className='w-16'
                            alt="" />
                        <p>Aryan Blog's .</p>
                    </div>
                    {/* Navigation Links */}
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/like">My Likes</Link>
                            </li>
                            <li>
                                <Link to="/about">About Us</Link>
                            </li>

                        </ul>
                    </div>
                    {/* Contact Info */}
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <h3 className="text-xl font-semibold mb-2">
                            <Link to="/contact">Contact Us</Link>
                        </h3>
                        <div className="flex mb-2 w-fit  items-center hover:scale-105">
                            <form onSubmit={handleSubmit}>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} 
                                type="email"  placeholder='email@example.com'
                                className='text-xl p-2 outline-none  rounded-l-md text-slate-900  focus:bg-slate-950 focus:text-slate-200'
                                />

                                <button type='submit'
                                    className=' bg-red-700 p-2 text-xl font-bold rounded-r-md active:bg-red-900'>Subscribe</button>
                            </form>
                        </div>
                        <p>1234 Street Name, City, State, 12345</p>
                        <p>Email: info@example.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-6">
                    {/* Social Media Icons */}
                    <div className="flex space-x-4">
                        <a href=" " className="hover:text-gray-400"><FaFacebookF /></a>
                        <a href=" " className="hover:text-gray-400"><FaTwitter /></a>
                        <a href=" " className="hover:text-gray-400"><FaInstagram /></a>
                        <a href=" " className="hover:text-gray-400"><FaLinkedinIn /></a>
                    </div>
                    {/* Copyright */}
                    <p className="text-sm">&copy; 2024 Your Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
