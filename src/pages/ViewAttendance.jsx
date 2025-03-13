// src/pages/ViewAttendance.jsx
import React from 'react';
import { Container, Table } from 'react-bootstrap';

const ViewAttendance = ({ attendanceRecords }) => {
  return (
    <Container>
      <h2>View Attendance</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{record.name}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ViewAttendance;
