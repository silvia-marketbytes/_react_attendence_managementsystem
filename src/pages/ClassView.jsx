import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';

const ClassView = ({ classes, students, onAllocateStudent, onRemoveStudent }) => {
  const { classId } = useParams();
  const cls = classes.find((cls) => cls.id === Number(classId));

  if (!cls) {
    return <div>Class not found</div>;
  }

  const classStudents = cls.students.map((id) =>
    students.find((student) => student.id === id)
  );

  const handleAllocate = (studentId) => {
    onAllocateStudent(cls.id, studentId);
  };

  const handleRemove = (studentId) => {
    onRemoveStudent(cls.id, studentId);
  };

  return (
    <Container>
      <h2>{cls.name}</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classStudents.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleRemove(student.id)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Allocate New Student</h3>
      {students
        .filter((student) => !cls.students.includes(student.id))
        .map((student) => (
          <Button key={student.id} onClick={() => handleAllocate(student.id)}>
            {student.name}
          </Button>
        ))}
    </Container>
  );
};

export default ClassView;
