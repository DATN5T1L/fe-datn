"use client";
import style from "../../component/Course/course.module.css";
import { useState } from "react";
import { Image } from "react-bootstrap";
import OffcanvasComponent from "../../component/Course/Dashboard/overviewMenu";
import CourseRevenueChart from "../../component/Course/Dashboard/courseChart";

const CourseDashboard = () => {
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
                <p>Tổng khoá học</p>
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
                <p>Tổng lợi nhuận</p>
                <h3>900,000</h3>
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
                <p>Tổng nhân viên</p>
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
                <p>Tổng doanh thu</p>
                <h3>2300k</h3>
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
            <CourseRevenueChart />
          </div>
          <div className={style.tag_notice}>
            <div className={style.card_notice}>
              <span>
                <p>Tổng khoá học</p>
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
                <p>Tổng lợi nhuận</p>
                <h3>900,000</h3>
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
                <p>Tổng nhân viên</p>
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
                <p>Tổng doanh thu</p>
                <h3>2300k</h3>
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
        </section>
      </div>
    </>
  );
};

export default CourseDashboard;
