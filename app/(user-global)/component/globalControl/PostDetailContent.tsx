"use client";

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostDetailContent = () => {
  return (
    <Container className="my-5">
      <p className="text-uppercase text-primary mb-2">Technology</p>
      <h1 className="fw-bold mb-4">Lorem ipsum dolor sit amet</h1>
      <Row className="mb-3 text-muted" style={{ fontSize: '0.9rem' }}>
        <Col xs="auto">
          <span>Tên người viết bài: </span>
          <strong>Tuấn Huỳnh</strong>
        </Col>
        <Col xs="auto">Lượt xem: 568</Col>
        <Col xs="auto">Ngày viết bài: 19-09-2002</Col>
      </Row>
      <p style={{ fontSize: '1rem', lineHeight: '1.6', textAlign: 'justify' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque commodo lacus ac sodales sodales.
        Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. Duis purus diam, dictum et ante ac, commodo iaculis urna.
        Aliquam in hendrerit urna. Mauris nec leo non libero sodales lobortis.
      </p>
    </Container>
  );
};

export default PostDetailContent;
