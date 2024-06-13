import React from 'react';
import { AiTwotoneLike } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '../../context/actions';//redux/actions

const PostLike = ({ postId }) => {
    console.log('iddddd', postId)
    const dispatch = useDispatch();
    const { likes, userLikes } = useSelector((state) => state.posts[postId]);
    const { user } = useSelector((state) => state.api);

    const handleLike = () => {
        if (user) {
            dispatch(toggleLike(postId, user.email));
        } else {
            alert("Please log in to like the post.");
        }
    };

    return (
        <div className="flex text-xl justify-between p-2 mt-auto">
            <span className='flex gap-1 items-center'>
                <AiTwotoneLike />
                {likes}
                {userLikes.includes(user?.email) && <span>You liked this</span>}
            </span>
            <button onClick={handleLike} className="text-blue-500 hover:underline">Like</button>
        </div>
    );
};

export default PostLike;
