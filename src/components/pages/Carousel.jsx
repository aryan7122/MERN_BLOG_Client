import React from 'react';
import '../../assets/Styles/Carousel.css';

const Carousel = ({ text, imageUrl }) => {
    return (
        <div className="banner-container ">
            <img src={imageUrl} alt="Banner" className="banner-image" />
            <div className="banner-text">{text}</div>
        </div>
    );
}

export default Carousel;
