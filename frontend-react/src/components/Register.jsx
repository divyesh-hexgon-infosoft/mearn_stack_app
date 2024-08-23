import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/config';

function Register() {
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', data.name);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('mobile_no', data.mobile_no);
    formData.append('password', data.password); // Adding password to the form data

    axios.post(`${API_URL}/user/register`, formData)
      .then(response => {
        console.log(response.data);
        navigate('/dashboard');
      })
      .catch(error => {
        setError(error.response?.data?.message || 'There was an error during registration!');
      });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
      <form className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input 
            type="text" 
            {...register('name', { required: true })} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input 
            type="text" 
            {...register('username', { required: true })} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input 
            type="email" 
            {...register('email', { required: true })} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Mobile No</label>
          <input 
            type="text" 
            {...register('mobile_no', { required: true })} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input 
            type="password" 
            {...register('password', { required: true, minLength: 6 })} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
          <input 
            type="file" 
            onChange={handleImageChange} 
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" 
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="submit" 
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
