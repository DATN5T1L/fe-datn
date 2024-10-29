"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CourseDetailPage from "../../component/Course/course_detail";
import { Image } from "react-bootstrap";
import style from "./courseDetail.module.css";

const CourseDetail = () => {
  return (
    <div className={style.content}>
      <div className={style.generalInfo}>
        <div>
          <h5>Khóa học:</h5>
          <Image
            src="/img_accountant/img_Course.png"
            alt=""
            width={155}
            height={73}
          />
          <p>Khóa học UI/UX</p>
        </div>
        <div>
          <h5>Người in:</h5>
          <p>Nguyễn Minh Tâm</p>
          <p>Kế toán</p>
        </div>
        <div>
          <h5>Ngày</h5>
          <p>Ngày bắt đầu: 17/8/2024</p>
          <p>Ngày bắt đầu: 17/9/2024</p>
        </div>
      </div>

      <CourseDetailPage />
    </div>
  );
};

export default CourseDetail;
