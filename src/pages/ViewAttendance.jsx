// src/pages/ViewAttendance.jsx
import React, { Component } from 'react';
import { Container, Form, Table, Button } from 'react-bootstrap';

class ViewAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedClassId: '',
      selectedDate: '',
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleClassChange(e) {
    this.setState({ selectedClassId: e.target.value });
  }

  handleDateChange(e) {
    this.setState({ selectedDate: e.target.value });
  }

  handleDelete(index) {
    const { onDeleteAttendance, attendanceRecords } = this.props;
    const { selectedClassId, selectedDate } = this.state;

    const filteredRecords = attendanceRecords.filter((record) => {
      const matchesClass = selectedClassId
        ? String(record.classId) === String(selectedClassId)
        : true;
      const matchesDate = selectedDate ? record.date === selectedDate : true;
      return matchesClass && matchesDate;
    });

    if (onDeleteAttendance && window.confirm('Are you sure you want to delete this attendance record?')) {
      console.log('Deleting attendance for:', filteredRecords[index]); // Debug log
      onDeleteAttendance(filteredRecords[index].studentId, filteredRecords[index].date);
    } else if (!onDeleteAttendance) {
      console.log('onDeleteAttendance prop is undefined'); // Debug log
    }
  }

  render() {
    const { attendanceRecords, classes, students } = this.props;
    const { selectedClassId, selectedDate } = this.state;

    const filteredRecords = attendanceRecords.filter((record) => {
      const matchesClass = selectedClassId
        ? String(record.classId) === String(selectedClassId)
        : true;
      const matchesDate = selectedDate ? record.date === selectedDate : true;
      return matchesClass && matchesDate;
    });

    return (
      <Container>
        <h2>View Attendance</h2>
        <div className="d-flex mb-3">
          <Form.Group controlId="formSelectClass" className="me-3">
            <Form.Label>Select Class</Form.Label>
            <Form.Control
              as="select"
              value={selectedClassId}
              onChange={this.handleClassChange}
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
              onChange={this.handleDateChange}
            />
          </Form.Group>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Class</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record, index) => {
                const student = students.find((s) => s.id === record.studentId);
                const className = classes.find((cls) => String(cls.id) === String(record.classId))?.name || 'N/A';
                console.log('Record:', record, 'Class Name:', className); // Debug log
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{student?.rollNumber || 'N/A'}</td>
                    <td>{record.name || 'N/A'}</td>
                    <td>{className}</td> {/* Updated to use fetched class name */}
                    <td>{record.date || 'N/A'}</td>
                    <td>{record.status || 'N/A'}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => this.handleDelete(index)}
                      >
                        🗑️
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7">No attendance records found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default ViewAttendance;