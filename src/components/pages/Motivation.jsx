import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import { AiTwotoneEye, AiTwotoneLike } from "react-icons/ai";
import { AuthContext } from '../../context/AuthContext';
import { useSelector } from 'react-redux';

const Motivation = () => {
    const [posts, setPosts] = useState([]);
    const { user, isLoggedIn, } = useContext(AuthContext);
    const { userEmail } = useSelector((state) => state.api);

    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/posts`);
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
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/views/${id}`);
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
        // console.log('userEmail', userEmail)
        if (!isLoggedIn()) {
            alert("You need to log in to like a post");
            return;
        }
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER ? `${process.env.REACT_APP_SERVER}/api/like/${id}` : `http://localhost:5000/api/like/${id}`, { userEmail }, {
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
    if (!posts.length) {
        return <div className='w-full h-screen justify-center items-center flex'>
            <img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif"
                className='w-28 h-28'
                alt="" />
        </div>;
    }

    const BookSummaryPost = posts.filter(post => post.category === "Motivation");

    return (
        <div>
            <Carousel text="Motivation" imageUrl="https://www.chitkara.edu.in/blogs/wp-content/uploads/2023/09/Blogging-in-Digital-Marketing.jpg" />
            {BookSummaryPost.map((post) => (
                <div key={post._id} className='p-1'>
                    <div
                        className="bg-white h-[500px] w-full shadow-lg hover:shadow-2xl rounded-md p-1 flex flex-col transition-shadow duration-300">
                        <div className="w-full h-[300px] overflow-hidden"
                            onClick={() => handlePostClick(post._id)}
                        >
                            <img
                                className='w-full h-[300px] object-cover object-top hover:scale-105 transition-transform duration-300'
                                src={post.url}
                                alt={post.title}
                            />
                        </div>
                        <div className="p-1 flex flex-col justify-between flex-grow">
                            <h3 className='text-2xl font-bold p-1 line-clamp-2' title={post.title}>
                                {post.title}
                            </h3>
                            <p className='text-xl line-clamp-4 md:line-clamp-6 sm:line-clamp-5 ' title={post.description}>
                                {post.description}
                            </p>
                            <div className="flex text-2xl justify-between p-1 pb-2  mt-auto">
                                <span className='flex gap-1 items-center'><AiTwotoneEye />{post.views}</span>
                                <span className='flex gap-1 items-center'>
                                    <span
                                        className={`flex gap-1 items-center cursor-pointer ${post.likedByEmails.includes(userEmail) ? 'text-blue-500' : ''}`}
                                        onClick={() => handleLikeClick(post._id)}
                                    >
                                        <AiTwotoneLike />
                                        {post.like}
                                    </span>
                                </span>
                                <h4 className='text-gray-900 text-[12px] sm:text-xl text-center'>{formatDate(post.createdAt)}</h4>
                                <button className="text-blue-500 hover:underline text-[12px] sm:text-xl text-center"
                                    onClick={() => handlePostClick(post._id)}
                                >Read more...</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Motivation;
