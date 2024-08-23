import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/config';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/user/all`)
      .then(response => setUsers(response.data))
      .catch(error => setError('Failed to fetch users.'));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/user/delete/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => setError('Failed to delete the user.'));
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

      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
      <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Full Name</th>
            <th className="py-2 px-4 text-left">Username</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Mobile No</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="py-2 px-4">{user.full_name}</td> {/* Changed to full_name */}
              <td className="py-2 px-4">{user.username}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.mobile_no}</td>
              <td className="py-2 px-4">
                <button 
                  onClick={() => handleDelete(user.id)} 
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded mr-2"
                >
                  Delete
                </button>
                <button 
                  onClick={() => window.location.href = `/edit/${user.id}`} 
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
