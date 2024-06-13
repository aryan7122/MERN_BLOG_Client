import React, { useEffect, useState, useRef, useContext } from 'react'; // Add useRef
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../assets/Styles/Post.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { AiTwotoneEye, AiTwotoneLike } from "react-icons/ai";
import { AuthContext } from '../../context/AuthContext';
import { useSelector } from 'react-redux';
<style>
    {`
    .line-clamp-2 {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .line-clamp-3 {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
`}
</style>
const GetPost = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const recentSliderRef = useRef(null); // Ref for recent posts slider
    const motivationSliderRef = useRef(null); // Ref for motivation posts slider
    const bookSummarySliderRef = useRef(null); // Ref for book summary posts slider
    const storySliderRef = useRef(null); // Ref for story posts slider
    const selfDevelopmentSliderRef = useRef(null); // Ref for self development posts slider
    const lifeFactSliderRef = useRef(null); // Ref for life fact posts slider
    const healthSliderRef = useRef(null); // Ref for health posts slider
    const PsychologySliderRef = useRef(null); // Ref for life fact posts slider
    // console.log('posts:::::::::👹👹', posts.map((post) => (post.category)))

    const { user, isLoggedIn, } = useContext(AuthContext);
    const { userEmail } = useSelector((state) => state.api);

    useEffect(() => {
        fetchPosts();
    }, []);

    console.log('response', posts)
    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/posts`);
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
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

    const handlePostClick = async (id) => {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER ? `${process.env.REACT_APP_SERVER}/api/views/${id}` : `http://localhost:5000/api/views/${id}`);
            const updatedViews = response.data.views;

            setPosts(prevPosts => prevPosts.map(post =>
                post._id === id ? { ...post, views: updatedViews } : post
            ));

            navigate(`/post/${id}`);
        } catch (error) {
            console.error("Error updating views:", error);
        }
    };

    const handleLikeClick = async (id) => {
        console.log('userEmail', userEmail)
        if (!isLoggedIn()) {
            alert("You need to log in to like a post");
            return;
        }
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER ? `${process.env.REACT_APP_SERVER}/api/like/${id}` : `http://localhost:5000/api/like/${id}`, { userEmail }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            const updatedLikes = response.data.likes;

            setPosts(prevPosts => prevPosts.map(post =>
                post._id === id ? { ...post, like: updatedLikes } : post
            ));
            fetchPosts();
        } catch (error) {
            console.error("Error updating likes:", error);
        }
    };

    // Slider settings
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 3,  // Display 3 posts at a time
        slidesToScroll: 1, // Scroll one post at a time
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };

    // 
    const motivationPosts = posts.filter(post => post.category === "Motivation");
    const BookSummaryPost = posts.filter(post => post.category === "Book Summary");
    const StoryPost = posts.filter(post => post.category === "Story");
    const SelfDevelopmentPost = posts.filter(post => post.category === "Self Development");
    const LifeFactPost = posts.filter(post => post.category === "Life Fact");
    const HealthPost = posts.filter(post => post.category === "Health");
    const PsychologyPost = posts.filter(post => post.category === "Psychology");

    // 

    return (
        <>
            {/* resentPost */}
            <div className='border overflow-hidden relative'>
                <h1 className='ml-4 mt-4 border-b-4 w-fit font-bold text-2xl'>Recent Post</h1>
                <Slider ref={recentSliderRef} {...settings}>
                    {posts.map((post) => (
                        <div key={post._id} className='p-5'>
                            <div
                                className="bg-white h-[500px] w-full shadow-lg hover:shadow-2xl rounded-md p-5 flex flex-col transition-shadow duration-300">
                                <div className="w-full h-[300px] overflow-hidden"
                                    onClick={() => handlePostClick(post._id)}
                                >
                                    <img
                                        className='w-full h-[300px] object-cover object-top hover:scale-105 transition-transform duration-300'
                                        src={post.url}
                                        alt={post.title}
                                    />
                                </div>
                                <div className="p-5 flex flex-col justify-between flex-grow">
                                    <h3 className='text-2xl font-bold p-2 line-clamp-2' title={post.title}>
                                        {post.title}
                                    </h3>
                                    <p className='text-xl line-clamp-3' title={post.description}>
                                        {post.description}
                                    </p>
                                    <div className="flex text-2xl justify-between p-2 mt-auto">
                                        <span className='flex gap-1 items-center'><AiTwotoneEye />{post.views}</span>
                                        <span className='flex gap-1 items-center'>
                                            <span
                                                className={`flex gap-1 items-center cursor-pointer ${post.likedByEmails.includes(userEmail) ? 'text-blue-500' : ''}`}
                                                onClick={() => handleLikeClick(post._id)}
                                            >
                                                <AiTwotoneLike />
                                                {post.like}
                                            </span>
                                        </span>
                                        <h4 className='text-gray-900'>{formatDate(post.createdAt)}</h4>
                                        <button className="text-blue-500 hover:underline"
                                            onClick={() => handlePostClick(post._id)}
                                        >Read more...</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-4 ">
                    <button
                        className="text-black bg-gray-100 hover:shadow-lg px-4 py-5 rounded-md"
                        onClick={() => recentSliderRef.current.slickPrev()}
                    >
                        <FaAngleLeft />
                    </button>
                    <button
                        className="text-black bg-gray-100 hover:shadow-lg px-4 py-5 rounded-md"
                        onClick={() => recentSliderRef.current.slickNext()}
                    >
                        <FaAngleRight />
                    </button>
                </div>
            </div>
            {/* {motivation } */}
            <div className='border overflow-hidden relative'>
                <h1 className='ml-4 mt-4 border-b-4 w-fit font-bold text-2xl'>Motivation</h1>
                <Slider ref={motivationSliderRef} {...settings}>
                    {motivationPosts.map((post) => (
                        <div key={post._id} className='p-5'>
                            <div
                                className="bg-white h-[500px] w-full shadow-lg hover:shadow-2xl rounded-md p-5 flex flex-col transition-shadow duration-300">
                                <div className="w-full h-[300px] overflow-hidden"
                                    onClick={() => handlePostClick(post._id)}
                                >
                                    <img
                                        className='w-full h-[300px] object-cover object-top hover:scale-105 transition-transform duration-300'
                                        src={post.url}
                                        alt={post.title}
                                    />
                                </div>
                                <div className="p-5 flex flex-col justify-between flex-grow">
                                    <h3 className='text-2xl font-bold p-2 line-clamp-2' title={post.title}>
                                        {post.title}
                                    </h3>
                                    <p className='text-xl line-clamp-3' title={post.description}>
                                        {post.description}
                                    </p>
                                    <div className="flex text-2xl justify-between p-2 mt-auto">
                                        <span className='flex gap-1 items-center'><AiTwotoneEye />{post.views}</span>
                                        <span className='flex gap-1 items-center'
                                        >
                                            <span
                                                className={`flex gap-1 items-center cursor-pointer ${post.likedByEmails.includes(userEmail) ? 'text-blue-500' : ''}`}
                                                onClick={() => handleLikeClick(post._id)}
                                            >
                                                <AiTwotoneLike />
                                                {post.like}
                                            </span>
                                        </span>
                                        <h4 className='text-gray-900'>{formatDate(post.createdAt)}</h4>
                                        <button className="text-blue-500 hover:underline"
                                            onClick={() => handlePostClick(post._id)}
                                        >Read more...</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-4 ">
                    <button
                        className="text-black bg-gray-100 hover:shadow-lg px-4 py-5 rounded-md"
                        onClick={() => motivationSliderRef.current.slickPrev()}
                    >
                        <FaAngleLeft />
                    </button>
                    <button
                        className="text-black bg-gray-100 hover:shadow-lg px-4 py-5 rounded-md"
                        onClick={() => motivationSliderRef.current.slickNext()}
                    >
                        <FaAngleRight />
                    </button>
                </div>
            </div>
            {/* {bookSummary } */}
            <div className='border overflow-hidden relative'>
                <h1 className='ml-4 mt-4 border-b-4 w-fit font-bold text-2xl'>Book Summary</h1>
                <Slider ref={bookSummarySliderRef} {...settings}>
                    {BookSummaryPost.map((post) => (
                        <div key={post._id} className='p-5'>
                            <div
                                className="bg-white h-[500px] w-full shadow-lg hover:shadow-2xl rounded-md p-5 flex flex-col transition-shadow duration-300">
                                <div className="w-full h-[300px] overflow-hidden"
                                    onClick={() => handlePostClick(post._id)}
                                >
                                    <img
                                        className='w-full h-[300px] object-cover object-top hover:scale-105 transition-transform duration-300'
                                        src={post.url}
                                        alt={post.title}
                                    />
                                </div>
                                <div className="p-5 flex flex-col justify-between flex-grow">
                                    <h3 className='text-2xl font-bold p-2 line-clamp-2' title={post.title}>
                                        {post.title}
                                    </h3>
                                    <p className='text-xl line-clamp-3' title={post.description}>
                                        {post.description}
                                    </p>
                                    <div className="flex text-2xl justify-between p-2 mt-auto">
                                        <span className='flex gap-1 items-center'><AiTwotoneEye />{post.views}</span>
                                        <span className='flex gap-1 items-center'
                                        >
                                            <span
                                                className={`flex gap-1 items-center cursor-pointer ${post.likedByEmails.includes(userEmail) ? 'text-blue-500' : ''}`}
                                                onClick={() => handleLikeClick(post._id)}
                                            >
                                                <AiTwotoneLike />
                                                {post.like}
                                            </span>
                                        </span>
                                        <h4 className='text-gray-900'>{formatDate(post.createdAt)}</h4>
                                        <button className="text-blue-500 hover:underline"
                                            onClick={() => handlePostClick(post._id)}
                                        >Read more...</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-4 ">
                    <button
                        className="text-black bg-gray-100 hover:shadow-lg px-4 py-5 rounded-md"
                        onClick={() => bookSummarySliderRef.current.slickPrev()}
                    >
                        <FaAngleLeft />
                    </button>
                    <button
                        className="text-black bg-gray-100 hover:shadow-lg px-4 py-5 rounded-md"
                        onClick={() => bookSummarySliderRef.current.slickNext()}
                    >
                        <FaAngleRight />
                    </button>
                </div>
            </div>
            {/* {StoryPost} */}
            <div className='border overflow-hidden relative'>
                <h1 className='ml-4 mt-4 border-b-4 w-fit font-bold text-2xl'>Story</h1>
                <Slider ref={storySliderRef} {...settings}>
                    {StoryPost.map((post) => (
                        <div key={post._id} className='p-5'>
                            <div
                                className="bg-white h-[500px] w-full shadow-lg hover:shadow-2xl rounded-md p-5 flex flex-col transition-shadow duration-300">
                                <div className="w-full h-[300px] overflow-hidden"
                                    onClick={() => handlePostClick(post._id)}
                                >
                                    <img
                                        className='w-full h-[300px] object-cover object-top hover:scale-105 transition-transform duration-300'
                                        src={post.url}
                                        alt={post.title}
                                    />
                                </div>
                                <div className="p-5 flex flex-col justify-between flex-grow">
                                    <h3 className='text-2xl font-bold p-2 line-clamp-2' title={post.title}>
                                        {post.title}
                                    </h3>
                                    <p className='text-xl line-clamp-3' title={post.description}>
                                        {post.description}
                                    </p>
                                    <div className="flex text-2xl justify-between p-2 mt-auto">
                                        <span className='flex gap-1 items-center'><AiTwotoneEye />{post.views}</span>
                                        <span className='flex gap-1 items-center'
                                        >
                                            <span
                                                className={`flex gap-1 items-center cursor-pointer ${post.likedByEmails.includes(userEmail) ? 'text-blue-500' : ''}`}
                                                onClick={() => handleLikeClick(post._id)}
                                            >
                                                <AiTwotoneLike />
                                                {post.like}
                                            </span>
                                        </span>
                                        <h4 className='text-gray-900'>{formatDate(post.createdAt)}</h4>
                                        <button className="text-blue-500 hover:underline"
                                            onClick={() => handlePostClick(post._id)}
                                        >Read more...</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-4 ">
                    <button
                        className="text-black bg-gray-100 hover:shadow-lg px-4 py-5 rounded-md"
                        onClick={() => storySliderRef.current.slickPrev()}
                    >
                        <FaAngleLeft />
                    </button>
                    <button
                        className="text-black bg-gray-100 hover:shadow-lg px-4 py-5 rounded-md"
                        onClick={() => storySliderRef.current.slickNext()}
                    >
                        <FaAngleRight />
                    </button>
                </div>
            </div>
            {/* {SelfDevelopmentPost } */}
            <div className='border overflow-hidden relative'>
                <h1 className='ml-4 mt-4 border-b-4 w-fit font-bold text-2xl'>Self Development</h1>
                <Slider ref={selfDevelopmentSliderRef} {...settings}>
                    {SelfDevelopmentPost.map((post) => (
                        <div key={post._id} className='p-5'>
                            <div
                                className="bg-white h-[500px] w-full shadow-lg hover:shadow-2xl rounded-md p-5 flex flex-col transition-shadow duration-300">
                                <div className="w-full h-[300px] overflow-hidden"
                                    onClick={() => handlePostClick(post._id)}
                                >
                                    <img
                                        className='w-full h-[300px] object-cover object-top hover:scale-105 transition-transform duration-300'
                                        src={post.url}
                                        alt={post.title}
                                    />
                                </div>
                                <div className="p-5 flex flex-col justify-between flex-grow">
                                    <h3 className='text-2xl font-bold p-2 line-clamp-2' title={post.title}>
                                        {post.title}
                                    </h3>
                                    <p className='text-xl line-clamp-3' title={post.description}>
                                        {post.description}
                                    </p>
                                    <div className="flex text-2xl justify-between p-2 mt-auto">
                                        <span className='flex gap-1 items-center'><AiTwotoneEye />{post.views}</span>
                                        <span className='flex gap-1 items-center'
                                        >
                                            <span
                                                className={`flex gap-1 items-center cursor-pointer ${post.likedByEmails.includes(userEmail) ? 'text-blue-500' : ''}`}
                                                onClick={() => handleLikeClick(post._id)}
                                            >
                                                <AiTwotoneLike />
                                                {post.like}
                                            </span>
                                        </span>
                                        <h4 className='text-gray-900'>{formatDate(post.createdAt)}</h4>
                                        <button className="text-blue-500 hover:underline"
                                            onClick={() => handlePostClick(post._id)}
                                        >Read more...</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-4 ">
                    <button
                        className="text-black bg-gray-100 hover:shadow-lg px-4 py-5 rounded-md"
                        onClick={() => selfDevelopmentSliderRef.current.slickPrev()}
                    >
                        <FaAngleLeft />
                    </button>
                    <button
                        className="text-black bg-gray-100 hover:shadow-lg px-4 py-5 rounded-md"
                        onClick={() => selfDevelopmentSliderRef.current.slickNext()}
                    >
                        <FaAngleRight />
                    </button>
                </div>
            </div>
            {/* {LifeFactPost } */}
            <div className='border overflow-hidden relative'>
                <h1 className='ml-4 mt-4 border-b-4 w-fit font-bold text-2xl'>Life Fact</h1>
                <Slider ref={lifeFactSliderRef} {...settings}>
                    {LifeFactPost.map((post) => (
                        <div key={post._id} className='p-5'>
                            <div
                                className="bg-white h-[500px] w-full shadow-lg hover:shadow-2xl rounded-md p-5 flex flex-col transition-shadow duration-300">
                                <div className="w-full h-[300px] overflow-hidden"
                                    onClick={() => handlePostClick(post._id)}
                                >
                                    <img
                                        className='w-full h-[300px] object-cover object-top hover:scale-105 transition-transform duration-300'
                                        src={post.url}
                                        alt={post.title}
                                    />
                                </div>
                                <div className="p-5 flex flex-col justify-between flex-grow">
                                    <h3 className='text-2xl font-bold p-2 line-clamp-2' title={post.title}>
                                        {post.title}
                                    </h3>
                                    <p className='text-xl line-clamp-3' title={post.description}>
                                        {post.description}
                                    </p>
                                    <div className="flex text-2xl justify-between p-2 mt-auto">
                                        <span className='flex gap-1 items-center'><AiTwotoneEye />{post.views}</span>
                                        <span className='flex gap-1 items-center'
                                        >
                                            <span
                                                className={`flex gap-1 items-center cursor-pointer ${post.likedByEmails.includes(userEmail) ? 'text-blue-500' : ''}`}
                                                onClick={() => handleLikeClick(post._id)}
                                            >
                                                <AiTwotoneLike />
                                                {post.like}
                                            </span>
                                        </span>
                                        <h4 className='text-gray-900'>{formatDate(post.createdAt)}</h4>
                                        <button className="text-blue-500 hover:underline"
                                            onClick={() => handlePostClick(post._id)}
                                        >Read more...</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-4 ">
                    <button
                        className="text-black bg-gray-100 hover:shadow-lg px-4 py-5 rounded-md"
                        onClick={() => lifeFactSliderRef.current.slickPrev()}
                    >
                        <FaAngleLeft />
                    </button>
                    <button
                        className="text-black bg-gray-100 hover:shadow-lg px-4 py-5 rounded-md"
                        onClick={() => lifeFactSliderRef.current.slickNext()}
                    >
                        <FaAngleRight />
                    </button>
                </div>
            </div>
            {/* {HealthPost } */}
            <div className='border overflow-hidden relative'>
                <h1 className='ml-4 mt-4 border-b-4 w-fit font-bold text-2xl'>Health</h1>
                <Slider ref={healthSliderRef} {...settings}>
                    {HealthPost.map((post) => (
                        <div key={post._id} className='p-5'>
                            <div
                                className="bg-white h-[500px] w-full shadow-lg hover:shadow-2xl rounded-md p-5 flex flex-col transition-shadow duration-300">
                                <div className="w-full h-[300px] overflow-hidden"
                                    onClick={() => handlePostClick(post._id)}
                                >
                                    <img
                                        className='w-full h-[300px] object-cover object-top hover:scale-105 transition-transform duration-300'
                                        src={post.url}
                                        alt={post.title}
                                    />
                                </div>
                                <div className="p-5 flex flex-col justify-between flex-grow">
                                    <h3 className='text-2xl font-bold p-2 line-clamp-2' title={post.title}>
                                        {post.title}
                                    </h3>
                                    <p className='text-xl line-clamp-3' title={post.description}>
                                        {post.description}
                                    </p>
                                    <div className="flex text-2xl justify-between p-2 mt-auto">
                                        <span className='flex gap-1 items-center'><AiTwotoneEye />{post.views}</span>
                                        <span className='flex gap-1 items-center'
                                        >
                                            <span
                                                className={`flex gap-1 items-center cursor-pointer ${post.likedByEmails.includes(userEmail) ? 'text-blue-500' : ''}`}
                                                onClick={() => handleLikeClick(post._id)}
                                            >
                                                <AiTwotoneLike />
                                                {post.like}
                                            </span>
                                        </span>
                                        <h4 className='text-gray-900'>{formatDate(post.createdAt)}</h4>
                                        <button className="text-blue-500 hover:underline"
                                            onClick={() => handlePostClick(post._id)}
                                        >Read more...</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-4 ">
                    <button
                        className="text-black bg-gray-100 hover:shadow-lg px-4 py-5 rounded-md"
                        onClick={() => healthSliderRef.current.slickPrev()}
                    >
                        <FaAngleLeft />
                    </button>
                    <button
                        className="text-black bg-gray-100 hover:shadow-lg px-4 py-5 rounded-md"
                        onClick={() => healthSliderRef.current.slickNext()}
                    >
                        <FaAngleRight />
                    </button>
                </div>
            </div>
            {/* {PsychologyPost } */}
            <div className='border overflow-hidden relative'>
                <h1 className='ml-4 mt-4 border-b-4 w-fit font-bold text-2xl'>Psychology</h1>
                <Slider ref={PsychologySliderRef} {...settings}>
                    {PsychologyPost.map((post) => (
                        <div key={post._id} className='p-5'>
                            <div
                                className="bg-white h-[500px] w-full shadow-lg hover:shadow-2xl rounded-md p-5 flex flex-col transition-shadow duration-300">
                                <div className="w-full h-[300px] overflow-hidden"
                                    onClick={() => handlePostClick(post._id)}
                                >
                                    <img
                                        className='w-full h-[300px] object-cover object-top hover:scale-105 transition-transform duration-300'
                                        src={post.url}
                                        alt={post.title}
                                    />
                                </div>
                                <div className="p-5 flex flex-col justify-between flex-grow">
                                    <h3 className='text-2xl font-bold p-2 line-clamp-2' title={post.title}>
                                        {post.title}
                                    </h3>
                                    <p className='text-xl line-clamp-3' title={post.description}>
                                        {post.description}
                                    </p>
                                    <div className="flex text-2xl justify-between p-2 mt-auto">
                                        <span className='flex gap-1 items-center'><AiTwotoneEye />{post.views}</span>
                                        <span className='flex gap-1 items-center'
                                        >
                                            <span
                                                className={`flex gap-1 items-center cursor-pointer ${post.likedByEmails.includes(userEmail) ? 'text-blue-500' : ''}`}
                                                onClick={() => handleLikeClick(post._id)}
                                            >
                                                <AiTwotoneLike />
                                                {post.like}
                                            </span>
                                        </span>
                                        <h4 className='text-gray-900'>{formatDate(post.createdAt)}</h4>
                                        <button className="text-blue-500 hover:underline"
                                            onClick={() => handlePostClick(post._id)}
                                        >Read more...</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-4 ">
                    <button
                        className="text-black bg-gray-100 hover:shadow-lg px-4 py-5 rounded-md"
                        onClick={() => PsychologySliderRef.current.slickPrev()}
                    >
                        <FaAngleLeft />
                    </button>
                    <button
                        className="text-black bg-gray-100 hover:shadow-lg px-4 py-5 rounded-md"
                        onClick={() => PsychologySliderRef.current.slickNext()}
                    >
                        <FaAngleRight />
                    </button>
                </div>
            </div>


            {/* Repeat the above structure for other sections like Motivation, Book Summary, etc. */}

        </>



    );
};

export default GetPost;
