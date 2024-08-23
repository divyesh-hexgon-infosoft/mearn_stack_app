// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import EditUser from './components/Edituser';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit/:id" element={<EditUser />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
