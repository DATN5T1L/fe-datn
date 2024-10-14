"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col
} from "react-bootstrap";
import "./globals.css";
import Header from "./component/Header/header";
import Sidebar from "./component/Sidebar/sidebar";
import Article from "./component/Article/article";
import styles from './layout.module.css';

const Admin: React.FC = () => {
  return (
    <Container fluid className={styles.container}>
      <header className={styles.header}>
        <Header />
      </header>
      <Row className={styles.mainContent}>
        <Col xs={2} className={styles.sidebar}>
          <Sidebar />
        </Col>
        <Col xs={10} className={styles.article}>
          <Article />
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
