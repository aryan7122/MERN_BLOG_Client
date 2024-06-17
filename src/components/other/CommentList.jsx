import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ comments }) => (
    <div>
        {comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
        ))}
    </div>
);

export default CommentList;
