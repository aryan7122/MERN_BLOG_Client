
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AiTwotoneLike } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostLike = () => {
    const [posts, setPosts] = useState([]);
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

    const handleLikeClick = async (id) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/like/${id}`, { userEmail });
            const updatedLikes = response.data.likes;
            setPosts(prevPosts => prevPosts.map(post =>
                post._id === id ? { ...post, like: updatedLikes } : post
            ));
            fetchPosts();
        } catch (error) {
            console.error("Error updating likes:", error);
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

    if (!posts.length) {
        return (
            <div className='w-full h-screen flex justify-center items-center'>
                <img
                    src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif"
                    className='w-28 h-28'
                    alt="Loading"
                />
            </div>
        );
    }

    const myLikePost = posts.filter(post => post.likedByEmails.includes(userEmail));

    return (
        <div className="flex flex-col text-xl justify-between p-2 mt-auto">
            <h1 className='p-4 text-2xl font-bold'>My likes</h1>
            {myLikePost.map((post) => (
                <div key={post._id} className='p-1 md:p-5'>
                    <div
                        className="bg-white h-auto sm:h-[108px] w-full shadow-lg hover:shadow-2xl rounded-md p-1 flex flex-col sm:flex-row transition-shadow duration-300">
                        <div className="w-full sm:w-[150px] h-[100px] overflow-hidden mb-2 sm:mb-0"
                            onClick={() => handlePostClick(post._id)}
                        >
                            <img
                                className='w-full sm:w-[150px] h-full rounded-sm object-cover object-top hover:scale-105 transition-transform duration-300'
                                src={post.url}
                                alt={post.title}
                            />
                        </div>
                        <div className="p-1 flex flex-col justify-between py-2  px-2 flex-grow">
                            <h3 className='text-2xl font-bold p-1 line-clamp-2' title={post.title}>
                                {post.title}
                            </h3>
                            <h4 className='text-gray-700 text-[12px] sm:text-xl'>{post.category}</h4>
                            <div className="flex text-sm sm:flex-row w-full justify-between items-center md:text-2xl">
                                <h4 className='text-gray-900 text-[12px] sm:text-xl text-center'>{formatDate(post.createdAt)}</h4>
                                <span className='flex gap-1 justify-around items-center mt-2 sm:mt-0'>
                                    <span
                                        className={`flex justify-between gap-1 items-center cursor-pointer ${post.likedByEmails.includes(userEmail) ? 'text-blue-500' : ''}`}
                                        onClick={() => handleLikeClick(post._id)}
                                    >
                                        <AiTwotoneLike />
                                        {post.like}
                                    </span>
                                </span>
                                <button className="text-blue-500 hover:underline text-[12px] sm:text-xl text-center mt-2 sm:mt-0"
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

export default PostLike;