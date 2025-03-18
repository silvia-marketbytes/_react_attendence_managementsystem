// src/pages/ClassManagement.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';

const ClassManagement = ({ classes = [], onAddClass, onEditClass, onDeleteClass }) => {
  const [name, setName] = useState('');
  const [teacher, setTeacher] = useState('');
  const [schedule, setSchedule] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  const validateClassName = (value) => {
    const classNameRegex = /^\d+[A-Za-z]$/; // e.g., 1A, 2B, 10C
    return classNameRegex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateClassName(name)) {
      setError('Class name must be in format like 1A, 2B, 10C (number followed by a letter).');
      return;
    }
    if (name.trim() && teacher.trim() && schedule.trim()) {
      setError('');
      if (editId !== null) {
        onEditClass(editId, { name, teacher, schedule });
        setEditId(null);
      } else {
        onAddClass({ name, teacher, schedule });
      }
      setName('');
      setTeacher('');
      setSchedule('');
    }
  };

  const handleEdit = (cls) => {
    setEditId(cls.id);
    setName(cls.name);
    setTeacher(cls.teacher);
    setSchedule(cls.schedule);
  };

  return (
    <Container>
      <h2>{editId !== null ? 'Edit Class' : 'Class Management'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formClassName">
          <Form.Label>Class Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter class name (e.g., 1A, 2B)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            isInvalid={!!error}
          />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formTeacher">
          <Form.Label>Teacher</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter teacher name"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formSchedule">
          <Form.Label>Schedule</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g., Mon, Wed 9:00 AM"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          {editId !== null ? 'Update Class' : 'Add Class'}
        </Button>
      </Form>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Teacher</th>
            <th>Schedule</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(classes) ? (
            classes.map((cls) => (
              <tr key={cls.id}>
                <td>{cls.name}</td>
                <td>{cls.teacher}</td>
                <td>{cls.schedule}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEdit(cls)}
                  >
                    ✏️
                  </Button>{' '}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDeleteClass(cls.id)}
                  >
                    🗑️
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No classes available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ClassManagement;