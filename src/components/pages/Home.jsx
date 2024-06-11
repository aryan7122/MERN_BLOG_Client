import React from 'react';
import GetPost from './GetPost';
import Carousel from './Carousel';


const Home = () => {

    return (
        <div>
            <Carousel text="Home" imageUrl="https://www.chitkara.edu.in/blogs/wp-content/uploads/2023/09/Blogging-in-Digital-Marketing.jpg" />
            <GetPost />
        </div>
    );
};

export default Home;
