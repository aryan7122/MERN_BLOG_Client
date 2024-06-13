import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import { AiTwotoneEye, AiTwotoneLike } from "react-icons/ai";
import { AuthContext } from '../../context/AuthContext';
import { useSelector } from 'react-redux';

const Story = () => {
    const [posts, setPosts] = useState([]);
    const { user, isLoggedIn, } = useContext(AuthContext);
    const { userEmail } = useSelector((state) => state.api);

    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(process.env.SERVER ? `${process.env.SERVER}/api/posts` : "http://localhost:5000/api/posts");
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

    const handlePostClick = async (id) => {
        try {
            const response = await axios.post(process.env.SERVER ? `${process.env.SERVER}/api/views/${id}` : `http://localhost:5000/api/views/${id}`);
            const updatedViews = response.data.views;

            setPosts(prevPosts => prevPosts.map(post =>
                post._id === id ? { ...post, views: updatedViews } : post
            ));

            navigate(`/post/${id}`);
        } catch (error) {
            console.error("Error updating views:", error);
        }
    };

    const handleLikeClick = async (id) => {
        if (!isLoggedIn()) {
            alert("You need to log in to like a post");
            return;
        }
        try {
            const response = await axios.post(process.env.SERVER ? `${process.env.SERVER}/api/like/${id}` : `http://localhost:5000/api/like/${id}`, { userEmail }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            const updatedLikes = response.data.likes;
            
            setPosts(prevPosts => prevPosts.map(post =>
                post._id === id ? { ...post, like: updatedLikes } : post
            ));
            fetchPosts();
        } catch (error) {
            console.error("Error updating likes:", error);
        }
    };

    const StoryPost = posts.filter(post => post.category === "Story");

    return (
        <div>
            <Carousel text="Story" imageUrl="https://www.chitkara.edu.in/blogs/wp-content/uploads/2023/09/Blogging-in-Digital-Marketing.jpg" />
            {StoryPost.map((post) => (
                <div key={post._id} className='p-5'>
                    {console.log('response.data', post.likedByEmails.includes(userEmail))}
                    <div className="bg-white h-[500px] mb-10 w-full shadow-lg hover:shadow-2xl rounded-md p-5 flex-col" >
                        <div className="w-full h-[300px] overflow-hidden" onClick={() => handlePostClick(post._id)}>
                            <img className='w-full h-[300px] object-cover object-top hover:scale-105 transition-transform duration-300' src={post.url} alt="" />
                        </div>
                        <div className="p-5">
                            <h3 className='text-2xl font-bold p-2 truncate'>{post.title}</h3>
                            <p className='text-xl truncate'>{post.description}...</p>
                            <div className="flex  text-2xl  justify-between p-2" >
                                <span className='flex  text-3xl  gap-1 items-center'><AiTwotoneEye />{post.views}</span>
                                <span
                                    className={`flex  text-3xl  gap-1 items-center cursor-pointer ${post.likedByEmails.includes(userEmail) ? 'text-blue-500' : ''}`}
                                    onClick={() => handleLikeClick(post._id)}
                                >
                                    <AiTwotoneLike />
                                    {post.like}
                                </span>
                                <h4 className='text-gray-900'>{formatDate(post.createdAt)}</h4>
                                <button onClick={() => handlePostClick(post._id)}>Read more...</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Story;
