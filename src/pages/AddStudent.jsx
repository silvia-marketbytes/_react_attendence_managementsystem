import React, { useState } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';

const AddStudent = ({ onAddStudent, students = [], onEditStudent, onDeleteStudent }) => {
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      if (editId !== null) {
        onEditStudent(editId, name);
        setEditId(null);
      } else {
        onAddStudent(name);
      }
      setName('');
    }
  };

  const handleEdit = (id, currentName) => {
    setEditId(id);
    setName(currentName);
  };

  return (
    <Container>
      <h2>{editId !== null ? 'Edit Student' : 'Add Student'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formStudentName">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {editId !== null ? 'Update' : 'Add'} Student
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(student.id, student.name)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => onDeleteStudent(student.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AddStudent;
