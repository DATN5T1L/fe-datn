"use client";
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col } from "react-bootstrap";
import "./globals.css";
import Header from "./component/Header/header";
import Sidebar from "./component/Sidebar/sidebar";
import Article from "./component/Article/article";
import styles from './layout.module.css';
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


const Admin: React.FC = () => {
  const router = useRouter()
  const userState = useSelector((state: RootState) => state.user.user)
  const alertShown = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!alertShown.current) {
      if (userState?.role === 'admin') {
        setIsLoading(false);
      } else {
        alert('bạn không có quuyền ở đây!');
        router.push('/home');
      }
      alertShown.current = true;
    }
  }, [userState, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
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
