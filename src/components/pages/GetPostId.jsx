import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AiTwotoneEye, AiTwotoneLike } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { AuthContext } from '../../context/AuthContext';

const GetPostId = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null);
    const { userEmail } = useSelector((state) => state.api);
    const { user, isLoggedIn } = useContext(AuthContext);


    const fetchPosts = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER ? `${process.env.REACT_APP_SERVER}/api/posts/${id}` : `http://localhost:5000/api/posts/${id}`);
            setPosts([response.data]); // Wrap in an array if it's a single post object
        } catch (error) {
            console.error("Error fetching post:", error);
            setError("Post not found or there was an error fetching the post.");
        }
    };
    fetchPosts()



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

    const handleLikeClick = async (postId) => {
        // console.log('userEmail', userEmail);
        if (!isLoggedIn()) {
            alert("You need to log in to like a post");
            return;
        }
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER ? `${process.env.REACT_APP_SERVER}/api/like/${postId}` : `http://localhost:5000/api/like/${postId}`, { userEmail }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            const updatedLikes = response.data.likes;

            setPosts(prevPosts => prevPosts.map(post =>
                post._id === postId ? { ...post, like: updatedLikes } : post
            ));
            fetchPosts();
        } catch (error) {
            console.error("Error updating likes:", error);
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!posts.length) {
        return <div className='w-full h-screen p-10 justify-center items-center flex'>
            <img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif"
                className='w-28 h-28'
                alt="" />
        </div>
    }

    const post = posts[0]; // Since we are wrapping the post in an array

    return (
        <div className='p-2'>
            <br />
            <div>
                <img src={post.url} alt="" className='w-full ' />
                <div className="flex justify-between px-1 py-1">
                    <div>
                        <h4 className='text-gray-900'>Post: {formatDate(post.createdAt)}</h4>
                        <h4 className='text-gray-900'>Category: {post.category}</h4>
                    </div>
                    <div className="flex justify-between px-1 py-1 text-2xl">
                        <span className='flex gap-1 items-center pr-5'><AiTwotoneEye />{post.views}</span>
                        <span className='flex gap-1 items-center'>
                            <span
                                className={`flex gap-1 items-center cursor-pointer ${post.likedByEmails.includes(userEmail) ? 'text-blue-500' : ''}`}
                                onClick={() => handleLikeClick(post._id)}
                            >
                                <AiTwotoneLike />
                                {post.like}
                            </span>
                        </span>
                    </div>
                </div>
                <hr />
                <h3 className='text-3xl font-bold'>{post.title}</h3>
                {/* {console.log('post', post)} */}
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                <hr />
            </div>
        </div>
    );
};

export default GetPostId;
