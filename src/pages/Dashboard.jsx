// src/pages/Dashboard.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SalesChart from '../component/SalesChart';

const Dashboard = ({ totalStudents, presentCount, absentCount }) => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={6} lg={4}>
          <Card className="mb-3 text-white bg-primary">
            <Card.Body>
              <Card.Title>Total Students</Card.Title>
              <Card.Text>{totalStudents}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Card className="mb-3 text-white bg-success">
            <Card.Body>
              <Card.Title>Present Today</Card.Title>
              <Card.Text>{presentCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Card className="mb-3 text-white bg-danger">
            <Card.Body>
              <Card.Title>Absent Today</Card.Title>
              <Card.Text>{absentCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <SalesChart />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
