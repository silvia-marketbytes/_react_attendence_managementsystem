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
import ClassManagement from './pages/ClassManagement';
import Settings from './pages/Settings';
import Login from './pages/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State for classes
  const [classes, setClasses] = useState(() => {
    const savedClasses = localStorage.getItem('classes');
    console.log('Saved Classes from localStorage:', savedClasses);
    return savedClasses ? JSON.parse(savedClasses) : [];
  });

  // State for students (now with classId)
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  // State for attendance records (now with classId and date)
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const savedRecords = localStorage.getItem('attendanceRecords');
    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  useEffect(() => {
    localStorage.setItem('classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  // Class management handlers
  const handleAddClass = (classData) => {
    const newClass = { id: Date.now(), ...classData };
    setClasses((prev) => [...prev, newClass]);
  };

  const handleEditClass = (id, updatedClass) => {
    setClasses((prev) =>
      prev.map((cls) => (cls.id === id ? { id, ...updatedClass } : cls))
    );
  };

  const handleDeleteClass = (id) => {
    setClasses((prev) => prev.filter((cls) => cls.id !== id));
    setStudents((prev) => prev.filter((student) => student.classId !== id));
    setAttendanceRecords((prev) => prev.filter((record) => record.classId !== id));
  };

  // Student management handlers
  const handleAddStudent = (studentData) => {
    const newStudent = { id: Date.now(), ...studentData, classId: String(studentData.classId) };
    setStudents((prev) => [...prev, newStudent]);
  };

  const handleEditStudent = (id, updatedStudent) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, ...updatedStudent, classId: String(updatedStudent.classId) } : student
      )
    );
  };

  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
    setAttendanceRecords((prev) => prev.filter((record) => record.studentId !== id));
  };

  // Attendance management handlers
  const handleTakeAttendance = (classId, date, attendance) => {
    const records = Object.keys(attendance).map((id) => {
      const student = students.find((s) => s.id === Number(id));
      return {
        studentId: Number(id),
        name: student?.name || 'Unknown',
        status: attendance[id],
        classId: classId === 'ALL' ? student?.classId : classId,
        date,
      };
    });
    setAttendanceRecords((prev) => [...prev, ...records]);
  };

  const handleDeleteAttendance = (studentId, date) => {
    console.log('Deleting attendance for studentId:', studentId, 'date:', date); // Debug log
    setAttendanceRecords((prev) =>
      prev.filter((record) => !(String(record.studentId) === String(studentId) && record.date === date))
    );
  };

  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const totalStudents = students.length;
  const presentCount = attendanceRecords.filter(
    (record) => record.status === 'Present'
  ).length;
  const absentCount = attendanceRecords.filter(
    (record) => record.status === 'Absent'
  ).length;

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="*"
          element={
            <>
              {isAuthenticated && <Header onLogout={handleLogout} />}
              <div
                style={{
                  marginLeft: isAuthenticated ? '200px' : '0',
                  padding: isAuthenticated ? '60px' : '0',
                  position: 'relative',
                }}
              >
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
                    path="/class-management"
                    element={
                      <ProtectedRoute>
                        <ClassManagement
                          classes={classes}
                          onAddClass={handleAddClass}
                          onEditClass={handleEditClass}
                          onDeleteClass={handleDeleteClass}
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
                          classes={classes}
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
                          classes={classes}
                          onTakeAttendance={handleTakeAttendance}
                          attendanceRecords={attendanceRecords}
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/view-attendance"
                    element={
                      <ProtectedRoute>
                        <ViewAttendance
                          attendanceRecords={attendanceRecords}
                          classes={classes}
                          students={students}
                          onDeleteAttendance={handleDeleteAttendance}
                        />
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