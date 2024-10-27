"use client";
import Article from "./component/Article/article";
import ViewBarCharts from "./component/Dashboard/ViewChart";
import style from "./component/Dashboard/Chart.module.css";
import { Image } from "react-bootstrap";
import { useState } from "react";
import OffcanvasComponent from "@/app/admin/component/DashboardMenu/overviewmenu";
import { HeaderArticleSimple } from "./component/Article/headerArrticle";
import BodyDashboard from "@/app/admin/component/Dashboard/BodyDashboard";

const Dashboard = () => {
  const [show, setShow] = useState(false);
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
