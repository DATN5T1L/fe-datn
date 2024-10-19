"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col } from "react-bootstrap";
import "./globals.css";
import Header from "./component/Header/header";
import Sidebar from "./component/Sidebar/sidebar";
import Article from "./component/Article/article";
import styles from './layout.module.css';

const Admin: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Header />
      </header>
      <div className={styles.mainContent}>
        <Col xs={2} className={styles.sidebar}>
          <Sidebar />
        </Col>
        <Col className={styles.article}>
          <Article />
        </Col>
      </div>
    </div>
  );
};

export default Admin;
