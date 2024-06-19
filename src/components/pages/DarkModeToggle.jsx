// src/components/DarkModeToggle.js
import React, { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { DarkModeContext } from '../../context/DarkModeContext';

const DarkModeToggle = () => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

    return (
        <button
            onClick={toggleDarkMode}
            className={`fixed bottom-4 right-4 p-2 rounded-full shadow-lg focus:outline-none ${!darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
                } hover:bg-opacity-80`}
        >
            {darkMode ? <FaSun /> : <FaMoon />}
        </button>
    );
};

export default DarkModeToggle;
