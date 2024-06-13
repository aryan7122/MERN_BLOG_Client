import { AiTwotoneEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { incrementView } from '../path/to/your/apiSlice'; // Import the incrementView action from your Redux slice

const PostView = ({ postId }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.api.posts); // Assuming your slice name is 'api'

    // Find the post with the matching postId
    const post = posts.find(post => post._id === postId);

    // Destructure the views count from the post
    const { views } = post || { views: 0 }; // Ensure views is initialized to 0 if post is not found

    useEffect(() => {
        if (post) {
            dispatch(incrementView(postId));
        }
    }, [dispatch, postId, post]);

    return (
        <div className="flex text-xl justify-between p-2 mt-auto">
            <span className='flex gap-1 items-center'>
                <AiTwotoneEye />
                {views}
            </span>
        </div>
    );
};

export default PostView;
