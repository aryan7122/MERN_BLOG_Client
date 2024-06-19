import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';

const CategoryViewsChart = () => {
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
         
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/posts`);
            const postsData = response.data;

            // Process the data to calculate views and likes per category
            const categoryStats = {};
            postsData.forEach(post => {
                if (!categoryStats[post.category]) {
                    categoryStats[post.category] = { views: 0, likes: 0 };
                }
                categoryStats[post.category].views += post.views || 0;
                categoryStats[post.category].likes += post.likedByEmails ? post.likedByEmails.length : 0;
            });

            // Convert categoryStats object to array
            const categoryStatsArray = Object.keys(categoryStats).map(category => ({
                name: category,
                views: categoryStats[category].views,
                likes: categoryStats[category].likes
            }));

            setCategoryData(categoryStatsArray);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    return (
        <div>
            <h1 className='text-xl font-bold animate-pulse pl-7'>Category Views and Likes Chart</h1>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={categoryData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="views" fill="#8884d8" />
                    <Bar dataKey="likes" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CategoryViewsChart;
