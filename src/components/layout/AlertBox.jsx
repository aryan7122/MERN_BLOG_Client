import React, { useState, useEffect } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import '../../assets/Styles/AlertBox.css';

const AlertBox = ({ message, duration = 5000 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    return (
        <div className="alert-box">
            <div className="alert-content ">
                <FaInfoCircle className="alert-icon animate-pulse" />
                <span className='text-white text-md'>{message}</span>
            </div>
            <button className="close-btn " onClick={() => setVisible(false)}>×</button>
        </div>
    );
};

export default AlertBox;
