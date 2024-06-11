import React from 'react';

const CommentItem = ({ comment }) => (
    <div>
        <p>{comment.content}</p>
        <p>By: {comment.author}</p>
        {/* Add more information about the comment (e.g., date) if needed */}
    </div>
);

export default CommentItem;
