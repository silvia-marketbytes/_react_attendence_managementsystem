// src/component/layout/Sidebar.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUserPlus, FaCheck, FaEye, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css'; 

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="../src/assets/profile_picture.jpg" alt="Profile" className="profile-image" />
        <div className="profile-info">
          <h4>ADMIN</h4>
          <p>admin@gmail.com</p>
        </div>
      </div>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/dashboard" className="sidebar-link">
          <FaHome className="sidebar-icon" /> Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/add-student" className="sidebar-link">
          <FaUserPlus className="sidebar-icon" /> Add Student
        </Nav.Link>
        <Nav.Link as={Link} to="/take-attendance" className="sidebar-link">
          <FaCheck className="sidebar-icon" /> Take Attendance
        </Nav.Link>
        <Nav.Link as={Link} to="/view-attendance" className="sidebar-link">
          <FaEye className="sidebar-icon" /> View Attendance
        </Nav.Link>
        <Nav.Link as={Link} to="/settings" className="sidebar-link">
          <FaCog className="sidebar-icon" /> Settings
        </Nav.Link>
        <Nav.Link onClick={handleLogout} className="sidebar-link" style={{ cursor: 'pointer' }}>
          <FaSignOutAlt className="sidebar-icon" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;