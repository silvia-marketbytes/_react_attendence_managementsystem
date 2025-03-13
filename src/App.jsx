// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/layout/Header';
import Sidebar from './component/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import TakeAttendance from './pages/TakeAttendance';
import ViewAttendance from './pages/ViewAttendance';
import Settings from './pages/Settings';
import Login from './pages/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const savedRecords = localStorage.getItem('attendanceRecords');
    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  const handleAddStudent = (name) => {
    const newStudent = { id: Date.now(), name };
    setStudents((prev) => [...prev, newStudent]);
  };

  const handleEditStudent = (id, newName) => {
    setStudents((prev) =>
      prev.map((student) => (student.id === id ? { ...student, name: newName } : student))
    );
  };

  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const handleTakeAttendance = (attendance) => {
    const records = Object.keys(attendance).map((id) => ({
      id: Number(id),
      name: students.find((student) => student.id === Number(id)).name,
      status: attendance[id],
    }));
    setAttendanceRecords(records);
  };

  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Optional: Clear stored data on logout
    // localStorage.removeItem('students');
    // localStorage.removeItem('attendanceRecords');
    // setStudents([]);
    // setAttendanceRecords([]);
  };

  const totalStudents = students.length;
  const presentCount = attendanceRecords.filter((record) => record.status === 'Present').length;
  const absentCount = attendanceRecords.filter((record) => record.status === 'Absent').length;

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={<Login onLogin={handleLogin} />} 
        />
        <Route
          path="*"
          element={
            <>
              {isAuthenticated && <Header onLogout={handleLogout} />}
              <div style={{ marginLeft: isAuthenticated ? '200px' : '0', padding: isAuthenticated ? '60px' : '0', position: 'relative' }}>
                <Routes>
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard 
                          totalStudents={totalStudents} 
                          presentCount={presentCount} 
                          absentCount={absentCount} 
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/add-student"
                    element={
                      <ProtectedRoute>
                        <AddStudent 
                          onAddStudent={handleAddStudent} 
                          students={students} 
                          onEditStudent={handleEditStudent} 
                          onDeleteStudent={handleDeleteStudent} 
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/take-attendance"
                    element={
                      <ProtectedRoute>
                        <TakeAttendance 
                          students={students} 
                          onTakeAttendance={handleTakeAttendance} 
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/view-attendance"
                    element={
                      <ProtectedRoute>
                        <ViewAttendance attendanceRecords={attendanceRecords} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Dashboard 
                          totalStudents={totalStudents} 
                          presentCount={presentCount} 
                          absentCount={absentCount} 
                        />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </div>
              {isAuthenticated && <Sidebar onLogout={handleLogout} />}
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;