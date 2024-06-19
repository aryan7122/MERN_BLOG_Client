import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const UsersPieChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const usersResponse = await axios.get(`${process.env.REACT_APP_SERVER}/api/users`);
            const subscribersResponse = await axios.get(`${process.env.REACT_APP_SERVER}/api/subscribers`);

            console.log('Users Response:', usersResponse.data);
            console.log('Subscribers Response:', subscribersResponse.data);

            const users = usersResponse.data;
            const subscribers = subscribersResponse.data;

            // Process the data to calculate the number of users in each role
            const roleCounts = users.reduce((acc, user) => {
                acc[user.role] = (acc[user.role] || 0) + 1;
                return acc;
            }, {});

            // Process the subscriber data, for example, counting by status or category
            const subscriberCounts = subscribers.reduce((acc, subscriber) => {
                acc[subscriber.status] = (acc[subscriber.status] || 0) + 1;
                return acc;
            }, {});

            // Convert role counts object to array
            const roleDataArray = Object.keys(roleCounts).map(role => ({
                name: role,
                value: roleCounts[role],
            }));

            // Convert subscriber counts object to array
            const subscriberDataArray = Object.keys(subscriberCounts).map(status => ({
                name: 'Subscribers',
                value: subscriberCounts[status],
            }));

            setChartData(roleDataArray.concat(subscriberDataArray));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div>
            <h1 className="text-xl font-bold animate-pulse pl-7">Users and Subscribers</h1>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default UsersPieChart;