"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Image,
  Button,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Table,
  Pagination,
} from "react-bootstrap";
import "./globals.css";
import Header from "./component/Header/header";
import Sidebar from "./component/Sidebar/sidebar";
import Article from "./component/Article/article";

const Admin: React.FC = () => {
  return (
    <Container fluid >
      <Header />
      <Row className="d-flex">
        <Col xs={2}>
          <Sidebar />
        </Col>
        <Col xs={10}>
          <Article />
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
