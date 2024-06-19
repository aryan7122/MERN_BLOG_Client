import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from "react-icons/fa";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Subscribers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/subscribers`);
                setUsers(data);
            } catch (error) {
                setError('Error fetching users');
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_SERVER}/api/subscribers/${id}`);
                setUsers(users.filter(user => user._id !== id));
                setAlertMessage('User deleted successfully!');
                setAlertType('success');
            } catch (error) {
                setError('Error deleting user');
                setAlertMessage('Error deleting user. Please try again.');
                setAlertType('error');
            } finally {
                setTimeout(() => {
                    setAlertMessage('');
                }, 5000);
            }
        }
    };


    return (
        <div className='container mx-auto p-4'>
            <h2 className='text-3xl font-bold mb-4 text-center'>User List</h2>
            {error && <p className='text-red-500'>{error}</p>}
            {alertMessage && (
                <Stack
                    sx={{
                        position: 'fixed',
                        top: '10%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        maxWidth: '90%', // Ensure it doesn't go beyond screen width on smaller screens
                        zIndex: 50,
                    }}
                    spacing={2}
                >
                    <Alert severity={alertType} sx={{ width: 'auto' }}>
                        {alertMessage}
                    </Alert>
                </Stack>
            )}
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white border border-gray-200'>
                    <thead className='bg-gray-900 text-white'>
                        <tr>
                            <th className='py-2 px-4 border-b'>No.</th>
                            <th className='py-2 px-4 border-b'>Avatar</th>
                            <th className='py-2 px-4 border-b'>Name</th>
                            <th className='py-2 px-4 border-b'>Email</th>
                            <th className='py-2 px-4 border-b'>Role</th>
                            <th className='py-2 px-4 border-b'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className='border-b hover:bg-gray-100'>
                                <td className='py-2 px-4 text-center'>{index + 1}</td>
                                <td className='py-2 px-4'>
                                    <img
                                        className='w-12 h-12 rounded-full mx-auto'
                                        src="https://static-00.iconduck.com/assets.00/user-avatar-happy-icon-2048x2048-ssmbv1ou.png"
                                        alt=""
                                    />
                                </td>
                                <td className='py-2 px-4 text-center'>{user.name}</td>
                                <td className='py-2 px-4 text-center'>{user.email}</td>
                                <td className='py-2 px-4 text-center'>
                                   
                                </td>
                                <td className='py-2 px-4 text-center'>
                                    <button
                                        onClick={() => deleteUser(user._id)}
                                        className='px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600'
                                    >
                                        <span className='flex gap-2 items-center'>
                                            <FaTrashAlt />
                                            Delete
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Subscribers;
