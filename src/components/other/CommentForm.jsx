import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ postId }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/comments/${postId}`, { content });
            // Reload the page after successful comment submission
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Comment</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
            </div>
            <button type="submit">Add Comment</button>
        </form>
    );
};

export default CommentForm;
