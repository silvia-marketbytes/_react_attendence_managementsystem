import React, { useState } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';

const TakeAttendance = ({ students, onTakeAttendance }) => {
  const [attendance, setAttendance] = useState(
    students.reduce((acc, student) => {
      acc[student.id] = 'Present';
      return acc;
    }, {})
  );
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const handleChange = (id, status) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onTakeAttendance(attendance);
    setShowModal(true); // Show modal on submit
  };

  const handleClose = () => setShowModal(false); // Close modal

  return (
    <Container>
      <h2>Take Attendance</h2>
      <Form onSubmit={handleSubmit}>
        {students.map((student) => (
          <Form.Group key={student.id} controlId={`formAttendance${student.id}`}>
            <Form.Label>{student.name}</Form.Label>
            <Form.Control
              as="select"
              value={attendance[student.id]}
              onChange={(e) => handleChange(student.id, e.target.value)}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </Form.Control>
          </Form.Group>
        ))}
        <Button variant="primary" type="submit">
          Submit Attendance
        </Button>
      </Form>

      {/* Modal for success message */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Attendance submitted successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TakeAttendance;