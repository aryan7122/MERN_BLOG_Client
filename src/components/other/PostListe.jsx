import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import { AiTwotoneLike, AiOutlineEye } from "react-icons/ai";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
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
            setError('Error fetching posts');
        }
    };

    const deletePost = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_SERVER}/api/posts/${id}`);
                setPosts(posts.filter(post => post._id !== id));
                setAlertMessage('Post deleted successfully!');
                setAlertType('success');
            } catch (error) {
                console.error('Error deleting post:', error);
                setError('Error deleting post');
                setAlertMessage('Error deleting post. Please try again.');
                setAlertType('error');
            } finally {
                setTimeout(() => {
                    setAlertMessage('');
                }, 5000);
            }
        }
    };

    const updatePostCategory = async (id, category) => {
        try {
            await axios.put(`${process.env.REACT_APP_SERVER}/api/posts/${id}`, { category });
            setPosts(posts.map(post => post._id === id ? { ...post, category } : post));
            setAlertMessage('Post category updated successfully!');
            setAlertType('success');
        } catch (error) {
            console.error('Error updating post category:', error);
            setError('Error updating post category');
            setAlertMessage('Error updating post category. Please try again.');
            setAlertType('error');
        } finally {
            setTimeout(() => {
                setAlertMessage('');
            }, 5000);
        }
    };

    const handlePostClick = async (id) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/views/${id}`);
            const updatedViews = response.data.views;
            setPosts(posts.map(post => post._id === id ? { ...post, views: updatedViews } : post));
            navigate(`/post/${id}`);
        } catch (error) {
            console.error("Error updating views:", error);
        }
    };




    return (
        <div className='container mx-auto p-1'>
            <h2 className='text-3xl font-bold mb-4 text-center'>Post List</h2>
            {error && <p className='text-red-500'>{error}</p>}
            {alertMessage && (
                <Stack
                    sx={{
                        position: 'fixed',
                        top: '10%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        maxWidth: '90%', // Ensure it doesn't go beyond screen width on smaller screens
                        zIndex: 50,
                    }}
                    spacing={2}
                >
                    <Alert severity={alertType} sx={{ width: 'auto' }}>
                        {alertMessage}
                    </Alert>
                </Stack>
            )}
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white border border-gray-200'>
                    <thead className='bg-gray-900 text-white'>
                        <tr>
                            <th className='py-2 px-4 border-b'>No.</th>
                            <th className='py-2 px-4 border-b'>Thumbnail</th>
                            <th className='py-2 px-4 border-b'>Title</th>
                            <th className='py-2 px-4 border-b'>Category</th>
                            <th className='py-2 px-4 border-b'>Views</th>
                            <th className='py-2 px-4 border-b'>Likes</th>
                            <th className='py-2 px-4 border-b'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post, index) => (
                            <tr key={post._id} className='border-b hover:bg-gray-100'>
                                <td className='py-2 px-4 text-center'>{index + 1}</td>
                                <td className='py-2 px-4'>
                                    <img
                                        className='w-28 h-20  mx-auto'
                                        src={post.url}
                                        alt={post.title}
                                    />
                                </td>
                                <td className='py-2 px-4 text-center'>{post.title}</td>
                                <td className='py-2 px-4 text-center'>
                                    <form onSubmit={(e) => { e.preventDefault(); updatePostCategory(post._id, e.target.category.value); }}>
                                        <select
                                            name="category"
                                            defaultValue={post.category}
                                            className='border rounded p-1 bg-slate-950 text-white'
                                        >
                                            <option value="Technology">Technology</option>
                                            <option value="Health">Health</option>
                                            <option value="Lifestyle">Lifestyle</option>
                                            <option value="Business">Business</option>
                                            {/* Add more categories as needed */}
                                        </select>
                                        <button type="submit" className='ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'>
                                            <span className='flex gap-2 items-center'>
                                                <FaEdit />
                                                Update
                                            </span>
                                        </button>
                                    </form>
                                </td>
                                <td className='py-2 px-4 text-center'>
                                    <span className='flex gap-1 justify-center items-center'>
                                        <AiOutlineEye />
                                        {post.views}
                                    </span>
                                </td>
                                <td className='py-2 px-4 text-center'>
                                    <span className='flex gap-1 justify-center items-center'>
                                        <AiTwotoneLike />
                                        {post.like}
                                    </span>
                                </td>
                                <td className='py-2 px-4 text-center'>
                                    <button
                                        onClick={() => deletePost(post._id)}
                                        className='px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600'
                                    >
                                        <span className='flex gap-2 items-center'>
                                            <FaTrashAlt />
                                            Delete
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => handlePostClick(post._id)}
                                        className='ml-2 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600'
                                    >
                                        <span className='flex gap-2 items-center'>
                                            <FaEdit />
                                            View
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PostList;
