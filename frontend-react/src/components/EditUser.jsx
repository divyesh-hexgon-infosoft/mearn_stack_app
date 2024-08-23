import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../config/config';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    full_name: '',
    username: '',
    email: '',
    mobile_no: '',
    image: ''
  });
  const [newImage, setNewImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/user/${id}`)
      .then(response => setUser(response.data))
      .catch(error => setError('Failed to fetch user data'));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('full_name', user.full_name);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('mobile_no', user.mobile_no);
    if (newImage) {
      formData.append('image', newImage);
    }

    axios.patch(`${API_URL}/user/update/${id}`, formData)
      .then(() => {
        navigate('/dashboard');
      })
      .catch(error => {
        setError(error.response?.data?.message || 'Failed to update user');
      });
  };

  const closeErrorPopup = () => {
    setError('');
  };

  return (
    <div className="relative">
      {error && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-red-600 text-lg font-semibold mb-4">Error</h2>
            <p>{error}</p>
            <button 
              onClick={closeErrorPopup} 
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
          <input 
            type="text" 
            name="full_name" 
            value={user.full_name} 
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input 
            type="text" 
            name="username" 
            value={user.username} 
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input 
            type="email" 
            name="email" 
            value={user.email} 
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Mobile No</label>
          <input 
            type="text" 
            name="mobile_no" 
            value={user.mobile_no} 
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Current Image</label>
          {user.image && (
            <img 
              src={user.image} 
              alt="User" 
              className="w-32 h-32 object-cover rounded mb-4"
            />
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Upload New Image</label>
          <input 
            type="file" 
            onChange={handleImageChange} 
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" 
          />
        </div>
        <button 
          type="submit" 
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditUser;
