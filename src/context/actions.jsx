import axios from 'axios';
import { incrementView, toggleLike, setPosts } from '../redux/slices/postsSlice';

const incrementViewAction = (postId) => async (dispatch) => {
    console.log('id action post', postId)
    try {
        await axios.post(`/api/posts/${postId}/view`);

        dispatch(incrementView(postId));
    } catch (error) {
        console.error('Error incrementing view count:', error);
    }
};

const toggleLikeAction = (postId, userEmail) => async (dispatch) => {
    try {
        await axios.post(`/api/posts/${postId}/like`, { email: userEmail });
        dispatch(toggleLike({ postId, userEmail }));
    } catch (error) {
        console.error('Error toggling like:', error);
    }
};

const fetchPosts = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/posts');
        dispatch(setPosts(response.data));
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

export { fetchPosts, toggleLikeAction, incrementViewAction };
