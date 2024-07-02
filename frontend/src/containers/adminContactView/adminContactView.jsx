import React from 'react';
import { Card, Col, Row, Space } from 'antd';
import './AdminContact.css';

// Dummy data
const messages = [
  {
    name: 'John Doe',
    email: 'johndoe@example.com',
    subject: 'Issue with the product',
    message: 'I am facing an issue with the product I bought last week.',
    timestamp: '2024-07-01 10:15:00'
  },
  {
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    subject: 'Feedback on the service',
    message: 'The service was excellent, and I am very satisfied!',
    timestamp: '2024-07-01 11:30:00'
  },
];

export default function AdminContact() {
  return (
    <section className='admin-contact'>
      <h2>Contact Us Messages</h2>
      <Row gutter={[16, 16]}>
        {messages.map((msg, index) => (
          <Col span={8} key={index}>
            <Card title={msg.subject} bordered={true}>
              <p><strong>Name:</strong> {msg.name}</p>
              <p><strong>Email:</strong> {msg.email}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <p><strong>Timestamp:</strong> {msg.timestamp}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}