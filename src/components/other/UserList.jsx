import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/users`);
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
        await axios.delete(`${process.env.REACT_APP_SERVER}/api/users/${id}`);
        setUsers(users.filter(user => user._id !== id));
      } catch (error) {
        setError('Error deleting user');
      }
    }
  };

  const updateUserRole = async (id, role) => {
    try {
      await axios.put(`${process.env.REACT_APP_SERVER}/api/users/${id}`, { role });
      setUsers(users.map(user => user._id === id ? { ...user, role } : user));
    } catch (error) {
      setError('Error updating user role');
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-3xl font-bold mb-4 text-center'>User List</h2>
      {error && <p className='text-red-500'>{error}</p>}
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200'>
          <thead className='bg-gray-900 text-white'>
            <tr>
              <th className='py-2 px-4 border-b'>Avatar</th>
              <th className='py-2 px-4 border-b'>Name</th>
              <th className='py-2 px-4 border-b'>Email</th>
              <th className='py-2 px-4 border-b'>Role</th>
              <th className='py-2 px-4 border-b'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className='border-b hover:bg-gray-100'>
                <td className='py-2 px-4'>
                  <img
                    className='w-12 h-12 rounded-full mx-auto'
                    src="https://static-00.iconduck.com/assets.00/user-avatar-happy-icon-2048x2048-ssmbv1ou.png" alt=""
                  />
                </td>
                <td className='py-2 px-4 text-center'>{user.name}</td>
                <td className='py-2 px-4 text-center'>{user.email}</td>
                <td className='py-2 px-4 text-center'>
                  <form onSubmit={(e) => { e.preventDefault(); updateUserRole(user._id, e.target.role.value); }}>
                    <select
                      name="role"
                      defaultValue={user.role}
                      className='border rounded p-1 bg-slate-950 text-white'
                    >
                      <option value="User">User</option>
                      <option value="Author">Author</option>
                      <option value="Admin">Admin</option>
                    </select>
                    <button type="submit" className='ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'>
                      <span className='flex gap-2 items-center'>
                        <FaUserEdit />
                        Update
                      </span>
                    </button>
                  </form>
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

export default UserList;
