import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiLogOut, FiEdit, FiMenu, FiLogIn } from 'react-icons/fi'; // Importing necessary icons

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/apiSlice';

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuNav, setIsMenuNav] = useState(false);
    const dispatch = useDispatch();
    const { isLoggedIn, userRole } = useSelector((state) => state.api);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const toggleNav = () => {
        setIsMenuNav(!isMenuNav);
    };

    const handleLogout = () => {
        dispatch(logout());
        setIsMenuOpen(false);
    };

    return (
        <header className='flex sticky z-30 items-center justify-between w-full h-16 px-4 bg-white  drop-shadow-sm  text-slate-800 font-medium  top-0  bg-transparent backdrop-blur'>
            {/* Logo */}
            <div className='text-2xl font-bold'>
                <Link to="/">
                    <span className='flex justify-center items-center'>
                        <h1 className='pl-2 w-fit'>
                            <span className='hover:border-b-2 hover:pb-1 pr-2'>Aryan</span>Blog
                        </h1>
                    </span>
                </Link>
            </div>



            {/* Navigation Links */}
            <nav className={` lg:flex  ${isMenuNav ? 'flex ml-[-15px]  justify-center mt-20 absolute w-full h-screen text-center pl-[-20%]  z-[99999px] items-center   drop-shadow-lg  text-slate-100  font-medium  top-0  bg-slate-900' : 'hidden'}`}>
                <ul className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 gap-5'>
                    <li className='lg:text-xl text-4xl  hover:text-gray-400'>
                        <Link to="/">Home</Link>
                    </li>
                    <li className='lg:text-xl text-4xl  hover:text-gray-400'>
                        <Link to="/motivation">Motivation</Link>
                    </li>
                    <li className='lg:text-xl text-4xl  hover:text-gray-400'>
                        <Link to="/BookSummary">Book Summary</Link>
                    </li>
                    <li className='lg:text-xl text-4xl  hover:text-gray-400'>
                        <Link to="/selfDevelopment">Self Development</Link>
                    </li>
                    <li className='lg:text-xl text-4xl  hover:text-gray-400'>
                        <Link to="/Story">Story</Link>
                    </li>
                    <li className='lg:text-xl text-4xl  hover:text-gray-400'>
                        <Link to="/fact">Fact</Link>
                    </li>
                    <li className='lg:text-xl text-4xl  hover:text-gray-400'>
                        <Link to="/health">Health</Link>
                    </li>
                    <li className='lg:text-xl text-4xl  hover:text-gray-400'>
                        <Link to="/psychology">Psychology</Link>
                    </li>
                    <li className='lg:text-xl text-4xl  hover:text-gray-400'>
                        <Link to="/about">About</Link>
                    </li>
                    <li className='lg:text-xl text-4xl  hover:text-gray-400'>
                        <Link to="/contact">Contact Us</Link>
                    </li>
                    {/* Add other navigation links */}
                </ul>
            </nav>
            <div className="flex gap-3 justify-center items-center">

                <div className='relative'>
                    <button onClick={toggleSearch} className='focus:outline-none'>
                        <FiSearch className='w-6 h-6 text-gray-400 hover:text-black' />
                    </button>
                    {isSearchOpen && (
                        <div className='absolute right-0 mt-[-24px] mr-8'>
                            <input
                                type="text"
                                placeholder="Search..."
                                className='pl-3 pr-10 py-2 rounded border text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                    )}
                </div>

                {/* User Profile Link */}
                <div className='text-xl    hover:text-gray-400 relative'>
                    <FiUser
                        className='w-14 h-14 rounded-full border cursor-pointer'
                        onClick={toggleMenu}
                    />
                    {isMenuOpen && (
                        <div className='absolute mt-14   h-[94vh] text-slate-800 w-[230px] p-4 py-3 ml-[-170px]  font-medium top-0  bg-white' >
                            <ul className=''>
                                {isLoggedIn ? (
                                    <>
                                        <li className='text-2xl hover:text-gray-400 cursor-pointer  p-2 w-full' onClick={toggleMenu}>
                                            {userRole === 'User' ? '' :
                                                <Link to="/edit" className='flex gap-5 items-center'>
                                                <FiEdit /> Create Post  </Link>}
                                        </li>
                                        <li
                                            className='text-2xl hover:text-gray-400 cursor-pointer  p-2 w-full'
                                            onClick={handleLogout}>
                                            <span className='flex gap-5 items-center'>
                                            <FiLogOut /> Logout
                                            </span>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                            <li className='text-2xl hover:text-gray-400 cursor-pointer  p-2 w-full'
                                                onClick={toggleMenu}>
                                                <Link to="/login"
                                                    className='flex gap-5 items-center '>
                                                    <FiLogIn />Login</Link>
                                        </li>
                                        {/* <li className='text-xl hover:text-gray-400 cursor-pointer' onClick={toggleMenu}>
                                            <Link to="/register">Register</Link>
                                        </li> */}
                                    </>
                                )}
                            </ul>

                        </div>
                    )}
                </div>
                {/* Responsive Menu Button */}
                <button className='block lg:hidden' onClick={toggleNav}>
                    <FiMenu className='w-8 h-8' />
                </button>
            </div>

        </header>
    );
};

export default Header;
