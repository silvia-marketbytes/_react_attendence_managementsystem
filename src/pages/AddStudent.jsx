// src/pages/AddStudent.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';

const AddStudent = ({
  onAddStudent,
  students = [],
  onEditStudent,
  onDeleteStudent,
  classes,
}) => {
  const [rollNumber, setRollNumber] = useState('');
  const [name, setName] = useState('');
  const [classId, setClassId] = useState('');
  const [contact, setContact] = useState('');
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rollNumber.trim() && name.trim() && classId && contact.trim()) {
      const studentData = { rollNumber, name, classId: String(classId), contact };
      if (editId !== null) {
        onEditStudent(editId, studentData);
        setEditId(null);
      } else {
        onAddStudent(studentData);
      }
      setRollNumber('');
      setName('');
      setClassId('');
      setContact('');
    }
  };

  const handleEdit = (student) => {
    setEditId(student.id);
    setRollNumber(student.rollNumber);
    setName(student.name);
    setClassId(student.classId);
    setContact(student.contact);
  };

  return (
    <Container>
      <h2>{editId !== null ? 'Edit Student' : 'Add Student'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formRollNumber">
          <Form.Label>Roll Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter roll number (any digits)"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formStudentName">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formClass">
          <Form.Label>Class</Form.Label>
          <Form.Control
            as="select"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            required
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formContact">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter contact number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          {editId !== null ? 'Update Student' : 'Add Student'}
        </Button>
      </Form>
      <div className="d-flex justify-content-end my-3">
        <Form.Group controlId="formFilterClass">
          <Form.Label>Filter by Class:</Form.Label>
          <Form.Control
            as="select"
            // Add filtering logic if needed
          >
            <option>ALL Classes</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Name</th>
            <th>Class</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const className = classes.find((cls) => String(cls.id) === String(student.classId))?.name || 'N/A';
            console.log('Student:', student, 'ClassName:', className); // Debug log
            return (
              <tr key={student.id}>
                <td>{student.rollNumber}</td>
                <td>{student.name}</td>
                <td>{className}</td>
                <td>{student.contact}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEdit(student)}
                  >
                    ✏️
                  </Button>{' '}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDeleteStudent(student.id)}
                  >
                    🗑️
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default AddStudent;