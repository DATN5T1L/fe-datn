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

import ViewBarCharts from "./component/Dashboard/ViewChart";
import style from "./component/Dashboard/Chart.module.css";
import { Image } from "react-bootstrap";
import OffcanvasComponent from "@/app/admin/component/DashboardMenu/overviewmenu";
import { HeaderArticleSimple } from "./component/Article/headerArrticle";
import BodyDashboard from "@/app/admin/component/Dashboard/BodyDashboard";

interface Statistical{
  totalCourse:number;
  totalCourseLecturer:number; // nhân viên
  totalCourseNow:number; //  
  totalCourseRevenue:string; // doanh thu
}

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

const Dashboard: React.FC = () => {
  const router = useRouter()
  const userState = useSelector((state: RootState) => state.user.user)
  const alertShown = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const token = getCookie('token');

  useEffect(() => {
    fetch(`/api/statistical_admin/`, {
      cache: 'no-cache',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

      })
      .catch(error => console.log(error))
  }, [])

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
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <>
      <div className={style.mar}>
        <section className={style.container}>
          <div className={style.tag_notice}>
            <div className={style.card_notice}>
              <span>
                <p>Tổng khóa học</p>
                <h3>50</h3>
              </span>
              <Image
                src={"/img_admin/boxvippro.png"}
                alt="icon"
                width={60}
                height={60}
              />
            </div>
            <div className={style.card_notice}>
              <span>
                <p>Tổng lợi nhuận</p>
                <h3>900k</h3>
              </span>
              <Image
                src={"/img_admin/monneyvip.svg"}
                alt="icon"
                width={60}
                height={60}
              />
            </div>
            <div className={style.card_notice}>
              <span>
                <p>Tổng nhân viên</p>
                <h3>20</h3>
              </span>
              <Image
                src={"/img_admin/comment.svg"}
                alt="icon"
                width={60}
                height={60}
              />
            </div>
            <div className={style.card_notice}>
              <span>
                <p>Tổng doanh thu</p>
                <h3>1000k</h3>
              </span>
              <Image
                src={"/img_admin/total_view.svg"}
                alt="icon"
                width={60}
                height={60}
                onClick={handleShow}
              />
            </div>
            <OffcanvasComponent show={show} handleClose={handleClose} />
          </div>
          <div className={style.chart}>
            <ViewBarCharts />
          </div>
          <BodyDashboard />
        </section>
      </div>
    </>
  );
};

export default Dashboard;
