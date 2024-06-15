// src/components/Loading.js
import React from 'react';

const Loading = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-fit h-fit p-10 justify-center items-center flex'>
                <img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif"
                    className='w-28 h-28'
                    alt="Loading" />
            </div>
        </div>
    );
};

export default Loading;
