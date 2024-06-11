import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';

const Story = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);
    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/posts");
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    const formatDate = (timestamp) => {
        const currentDate = new Date();
        const postDate = new Date(timestamp);
        const timeDifference = currentDate.getTime() - postDate.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

        if (daysDifference === 0) {
            return "Today";
        } else if (daysDifference === 1) {
            return "1 day ago";
        } else {
            return `${daysDifference} days ago`;
        }
    };
    const handlePostClick = (id) => {
        navigate(`/post/${id}`);
    };
    const LifeFactPost = posts.filter(post => post.category === "Life Fact");

    return (
        <div>
            <Carousel text="Fact" imageUrl="https://www.chitkara.edu.in/blogs/wp-content/uploads/2023/09/Blogging-in-Digital-Marketing.jpg" />
            {LifeFactPost.map((post) => (
                <div key={post._id} className='p-5'>
                    <div className="bg-white h-[600px] mb-10 w-full shadow-lg hover:shadow-2xl rounded-md p-5 flex-col" onClick={() => handlePostClick(post._id)}>
                        <div className="w-full h-[450px] overflow-hidden">
                            <img className='w-full h-[450px] object-cover object-top hover:scale-105 transition-transform duration-300' src={post.url} alt="" />
                        </div>
                        <div className="p-5">
                            <h3 className='text-2xl font-bold p-2 truncate'>{post.title}</h3>
                            <p className='text-xl truncate'>{post.description}...</p>
                            <div className="flex justify-between p-2">
                                <h4 className='text-gray-900'>{formatDate(post.createdAt)}</h4>
                                <button>Read more...</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Story