import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiLogOut, FiEdit, FiMenu, FiLogIn, } from 'react-icons/fi'; // Importing necessary icons
// import { FaAddressCard } from "react-icons/fa";
import { AiTwotoneDashboard, AiFillLike } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";


import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/apiSlice';

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuNav, setIsMenuNav] = useState(false);
    const dispatch = useDispatch();
    const { isLoggedIn, userRole, username } = useSelector((state) => state.api);

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
    const clickto = () => {
        setIsMenuNav(false)
    }
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
            <nav className={` lg:flex  ${isMenuNav ? 'flex ml-[-12px] text-xl  justify-center mt-16 absolute w-full h-screen text-center pl-[-20%]  z-[99999px] items-center   drop-shadow-lg  text-slate-100  font-medium  top-0  bg-slate-900' : 'hidden'}`}>
                <ul className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 gap-5' onClick={clickto}>
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
                        <div className='absolute right-0 mt-[-27px] mr-6'>
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
                        className='w-10 h-10 md:w-12 md:h-12 rounded-full border cursor-pointer'
                        onClick={toggleMenu}
                    />
                    {isMenuOpen && (
                        <div className='absolute shadow-md mt-12 left-[-130px]  h-[98vh] text-slate-800 w-[230px] delay-200  p-4 py-3  font-medium top-0  bg-white' >
                            <ul className=''>
                                {isLoggedIn ? (
                                    <>
                                        <li className='text-3xl py-3  cursor-pointer  p-2 w-full'>
                                            <span className='flex gap-5  items-center w-fit border-l-4 '>
                                                <span className='pl-2'>{username}</span></span>
                                        </li>
                                        {userRole === 'Admin' || userRole === 'Author' ?
                                            <li className='text-3xl py-3  hover:text-gray-400 cursor-pointer  p-2 w-full' onClick={toggleMenu}>
                                                <Link to="/edit" className='flex gap-5 active:gap-1 items-center'>
                                                    <FiEdit /> Create Post  </Link>
                                            </li>
                                            :
                                            ''
                                        }
                                        
                                        <li className='text-3xl py-3  hover:text-gray-400 cursor-pointer  p-2 w-full' onClick={toggleMenu}>
                                            <Link to="/like" className='flex gap-5 active:gap-1 items-center'>
                                                <AiFillLike /> Like  </Link>
                                        </li>

                                        {userRole === 'Admin' ?
                                            <li className='text-3xl py-3  hover:text-gray-400 cursor-pointer  p-2 w-full' onClick={toggleMenu}>
                                                <Link to="/dashboard" className='flex gap-5 active:gap-1 items-center'>
                                                    <AiTwotoneDashboard /> Dashboard </Link>
                                            </li>
                                            :
                                            ''
                                        }
                                        {userRole === 'Admin' ?
                                            <li className='text-3xl py-3  hover:text-gray-400 cursor-pointer  p-2 w-full' onClick={toggleMenu}>
                                                <Link to="/user" className='flex gap-5 active:gap-1 items-center'>
                                                    <FiUser /> Users </Link>
                                            </li>
                                            :
                                            ''
                                        }
                                        {userRole === 'Admin' ?
                                            <li className='text-3xl py-3  hover:text-gray-400 cursor-pointer  p-2 w-full' onClick={toggleMenu}>
                                                <Link to="/subscribers" className='flex gap-5 active:gap-1 items-center'>
                                                    <IoNotifications /> subscribers </Link>
                                            </li>
                                            :
                                            ''
                                        }
                                        {/* {userRole === 'Admin' ?
                                            <li className='text-3xl py-3  hover:text-gray-400 cursor-pointer  p-2 w-full' onClick={toggleMenu}>
                                                <Link to="/role" className='flex gap-5 active:gap-1 items-center'>
                                                    <FaAddressCard /> Role </Link>
                                            </li>
                                            :
                                            ''
                                        } */}
                                        <li
                                            className='text-3xl py-3  hover:text-gray-400 cursor-pointer  p-2 w-full'
                                            onClick={handleLogout}>
                                            <span className='flex gap-5 active:gap-1 items-center'>
                                                <FiLogOut /> Logout
                                            </span>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className='text-3xl py-3  hover:text-gray-400 cursor-pointer  p-2 w-full'
                                            onClick={toggleMenu}>
                                            <Link to="/login"
                                                className='flex gap-5 active:gap-1 items-center '>
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
