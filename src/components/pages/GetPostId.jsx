import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GetPostId = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        const fetchPost = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_SERVER ? `${process.env.REACT_APP_SERVER}/api/posts/${id}` : `http://localhost:5000/api/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching post:", error);
                setError("Post not found or there was an error fetching the post.");
            }
        };
        fetchPost();
    }, [id]);

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

    if (error) {
        return <div>{error}</div>;
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className='border p-10'>
            <br />
            <div>
                <h3 className='text-3xl font-bold p-2'>{post.title}</h3>
                <p className='text-2xl p-2'>{post.description}</p>
                <div className="flex justify-between p-2">
                    <h4 className='text-gray-900'>{formatDate(post.createdAt)}</h4>
                </div>
            </div>
            <div className='border m-3 p-2' dangerouslySetInnerHTML={{ __html: post.content }} />
            <hr />
        </div>
    );
};

export default GetPostId;
