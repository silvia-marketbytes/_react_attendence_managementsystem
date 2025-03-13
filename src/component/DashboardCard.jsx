// src/component/DashboardCard.jsx
import React from 'react';
import { Card } from 'react-bootstrap';

const DashboardCard = ({ title, value, color }) => {
  return (
    <Card className={`text-white mb-3 ${color}`}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{value}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DashboardCard;
