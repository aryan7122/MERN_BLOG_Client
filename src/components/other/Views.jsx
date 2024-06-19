import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

// Sample initial data for visualization purposes
const initialData = [
    { name: 'January', views: 0 },
    { name: 'February', views: 0 },
    { name: 'March', views: 0 },
    { name: 'April', views: 0 },
    { name: 'May', views: 0 },
    { name: 'June', views: 0 },
    { name: 'July', views: 0 },
    { name: 'August', views: 0 },
    { name: 'September', views: 0 },
    { name: 'October', views: 0 },
    { name: 'November', views: 0 },
    { name: 'December', views: 0 },
];

const Views = () => {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/posts`);
            const postsData = response.data;

            // Process the data to calculate monthly views
            console.log('data ', postsData.map(item => item.category))
            console.log('data ', postsData.map(item => item.views))
            const monthlyViews = initialData.map(month => ({ ...month }));
            postsData.forEach(post => {
                const month = new Date(post.createdAt).getMonth();
                monthlyViews[month].views += post.views || 0;
            });

            setData(monthlyViews);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    return (
        <div>
            <h1 className='text-xl font-bold animate-pulse pl-7'>Views</h1>
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                    data={data}
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
                    <Area type="monotone" dataKey="views" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Views;
