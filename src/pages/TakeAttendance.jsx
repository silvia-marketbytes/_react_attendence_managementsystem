// src/pages/TakeAttendance.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';

const TakeAttendance = ({ students, classes, onTakeAttendance, attendanceRecords }) => {
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString('en-GB').split('/').reverse().join('-') // Format: dd-mm-yyyy
  );
  const [attendance, setAttendance] = useState({});

  // Filter students based on selected class
  const filteredStudents = selectedClassId
    ? students.filter((student) => String(student.classId) === String(selectedClassId))
    : students;

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate) {
      onTakeAttendance(selectedClassId || 'ALL', selectedDate, attendance);
      setAttendance({});
    }
  };

  return (
    <Container>
      <h2>Attendance Management</h2>
      <Form onSubmit={handleSubmit}>
        <div className="d-flex mb-3">
          <Form.Group controlId="formSelectClass" className="me-3">
            <Form.Label>Select Class</Form.Label>
            <Form.Control
              as="select"
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              required
            >
              <option value="">ALL Classes</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formSelectDate">
            <Form.Label>Select Date</Form.Label>
            <Form.Control
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </Form.Group>
        </div>
        {filteredStudents.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Name</th>
                <th>Class</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const className = classes.find((cls) => String(cls.id) === String(student.classId))?.name || 'N/A';
                return (
                  <tr key={student.id}>
                    <td>{student.rollNumber}</td>
                    <td>{student.name}</td>
                    <td>{className}</td>
                    <td>
                      <Button
                        variant={
                          attendance[student.id] === 'Present'
                            ? 'success'
                            : 'outline-success'
                        }
                        size="sm"
                        onClick={() => handleAttendanceChange(student.id, 'Present')}
                      >
                        ✔
                      </Button>{' '}
                      <Button
                        variant={
                          attendance[student.id] === 'Absent'
                            ? 'danger'
                            : 'outline-danger'
                        }
                        size="sm"
                        onClick={() => handleAttendanceChange(student.id, 'Absent')}
                      >
                        ✘
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <p>No students available for the selected class.</p>
        )}
        {filteredStudents.length > 0 && (
          <Button variant="primary" type="submit">
            Save Attendance
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default TakeAttendance;