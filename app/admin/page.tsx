"use client";
<<<<<<< HEAD
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
        alert('bạn đéo có quyền gì ở đây!!! cút....');
        router.push('/home');
      }
      alertShown.current = true;
    }
  }, [userState, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
=======
import Article from "./component/Article/article";
import ViewBarCharts from "./component/Dashboard/ViewChart";
import style from "./component/Dashboard/Chart.module.css";
import { Image } from "react-bootstrap";
import { useState } from "react";
import OffcanvasComponent from "@/app/admin/component/DashboardMenu/overviewmenu";
import { HeaderArticleSimple } from "./component/Article/headerArrticle";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
>>>>>>> hieuthao
  return (
    <>
      <div className={style.mar}>
        <section className={style.container}>
          <div className={style.tag_notice}>
            <div className={style.card_notice}>
              <span>
                <p>Tổng bài viết</p>
                <h3>100</h3>
              </span>
              <Image
                src={"/img_admin/total_article.svg"}
                alt="icon"
                width={60}
                height={60}
              />
            </div>
            <div className={style.card_notice}>
              <span>
                <p>Tổng danh mục</p>
                <h3>200</h3>
              </span>
              <Image
                src={"/img_admin/category.svg"}
                alt="icon"
                width={60}
                height={60}
              />
            </div>
            <div className={style.card_notice}>
              <span>
                <p>Tổng bình luận</p>
                <h3>3000</h3>
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
                <p>Tổng lượt xem</p>
                <h3>230,000</h3>
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
        </section>
        <section>
          <HeaderArticleSimple />
          <Article />
        </section>
      </div>
    </>
  );
};

export default Dashboard;
