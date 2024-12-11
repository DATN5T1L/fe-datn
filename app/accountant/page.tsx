"use client";
import style from "./component/Dashboard/Chart.module.css";
import { useEffect, useState } from "react";
import { LineChartViewYear, LineChartViewMonth, LineChartViewWeek, LineChartComparison } from "./component/Dashboard/LineChartView";
import { IconTotalUser, IconTotalOrder, IconTotalProfit, IconTotalOrderToday } from "@app/(user-global)/component/icon/icons";
import useCookie from '@app/(user-global)/component/hook/useCookie';
import Button from "@app/(user-global)/component/globalControl/btnComponent";
import Card from "@app/(user-global)/component/course/CardCourse";

const Dashboard = () => {
  const token = useCookie('token');
  const [show, setShow] = useState(false);
  const tongleShow = () => {
    setShow(prev => !prev)
  }
  const [totalUser, setTotalUser] = useState<number>(0);
  const [totalCourse, setTotalCourse] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalToday, setTotalToday] = useState<number>(0);
  const [courseHighest, setcourseHighest] = useState<Course | null>(null);
  const [courseFavorite, setcourseFavorite] = useState<Course | null>(null);
  const fetchMultipleAPIs = async () => {
    try {
      if (token) {
        const responses = await Promise.all([
          fetch(`/api/accountant/totalUser`, {
            method: "GET",
            headers: {
              Authorization: `Barser ${token}`,
            },
          }),
          fetch(`/api/accountant/totalEnroll`, {
            method: "GET",
            headers: {
              Authorization: `Barser ${token}`,
            },
          }),
          // Tổng đơn hàng hôm nay
          fetch(`/api/accountant/totalprofits`, {
            method: "GET",
            headers: {
              Authorization: `Barser ${token}`,
            },
          }),
          // Tổng đơn hàng hôm nay
          fetch(`/api/accountant/enrollmentToday`, {
            method: "GET",
            headers: {
              Authorization: `Barser ${token}`,
            },
          }),
          // Khóa học có doanh thu cao nhất
          fetch(`/api/accountant/highestRevenueCourse`, {
            method: "GET",
            headers: {
              Authorization: `Barser ${token}`,
            },
          }),
          // Khóa học được yêu thích nhất
          fetch(`/api/accountant/mostFavoriteCourse`, {
            method: "GET",
            headers: {
              Authorization: `Barser ${token}`,
            },
          }),

        ]);
        const failedResponse = responses.find((res) => !res.ok);
        if (failedResponse) {
          throw new Error("One or more API requests failed");
        }

        // Parse tất cả phản hồi thành JSON
        const data = await Promise.all(responses.map((res) => res.json()));
        console.log(data)
        // Lấy dữ liệu từ các endpoint
        const totalUser = data[0].data.user_count;
        const totalCourse = data[1].data.enrollCount;
        const totalRevenue = data[2].totalRevenue;
        const totalTotal = data[3].enrollCountToday;
        const courses = data[4].data;
        const CourseFavorite = data[5].data[0];

        // Khóa học
        setcourseHighest(courses);
        setcourseFavorite(CourseFavorite);
        // Cập nhật state hoặc xử lý dữ liệu
        setTotalUser(totalUser);
        setTotalCourse(totalCourse);
        setTotalRevenue(totalRevenue);
        setTotalToday(totalTotal);
      }
    } catch (err: any) {
      console.error("Error:", err.message);
    }
  };




  useEffect(() => {
    if (token) {
      fetchMultipleAPIs()

    }
  }, [token])


  return (
    <div className={style.mar}>
      <section className={style.container}>
        <div className={style.tag_notice}>
          <article className={style.card_notice}>
            <div className={style.card_noticeContent}>
              <p className={style.titleNotice}>Tổng người dùng</p>
              <h6 className={style.totalNotice}>{totalUser}</h6>
            </div>
            <IconTotalUser />
          </article>
          <article className={style.card_notice}>
            <div className={style.card_noticeContent}>
              <p className={style.titleNotice}>Tổng đơn hàng</p>
              <h6 className={style.totalNotice}>{totalCourse}</h6>
            </div>
            <IconTotalOrder />
          </article>
          <article className={style.card_notice}>
            <div className={style.card_noticeContent}>
              <p className={style.titleNotice}>Tổng lợi nhuận</p>
              <h6 className={style.totalNotice}>{totalRevenue}</h6>
            </div>
            <IconTotalProfit />
          </article>
          <article className={style.card_notice}>
            <div className={style.card_noticeContent}>
              <p className={style.titleNotice}>Đơn hàng hôm nay</p>
              <h6 className={style.totalNotice}>{totalToday}</h6>
            </div>
            <IconTotalOrderToday />
          </article>
        </div>
      </section>
      <div className={style.coursesTotal}>
        <h2 className={style.coursesTotal_Heading}>Khóa học</h2>
        {/* KHÓA HỌC DOANH THU CAO NHẤT */}
        {courseHighest && (<Card key={"1"} course={courseHighest} />)}
        {/* kHÓA HỌC ĐƯỢC YÊU THÍCH NHẤT */}
        {courseFavorite && (<Card key={"1"} course={courseFavorite} />)}
        <h4>Khóa học được yêu thích nhất</h4>
        <h4>Khóa học được yêu có doanh thu cao nhất</h4>
        <h4>Khóa học được yêu thích nhất đánh giá 5sao nhiều nhất</h4>
        <h4>Khóa học cần được thúc đẩy</h4>
      </div>
      <div className={style.actions}>
        <Button type="premary" leftIcon={false} rightIcon={false} onClick={tongleShow}> Thống kế khóa học</Button>
        <Button type="premary" leftIcon={false} rightIcon={false} onClick={tongleShow}> Thống kế bài viết</Button>
      </div>
      {show ? (
        <div className={style.chart}>
          <LineChartViewYear />
          <LineChartViewMonth />
          <LineChartViewWeek />
          <LineChartComparison />
        </div>
      ) : (
        <div className={style.chart}>
          <LineChartViewYear />
          <LineChartViewMonth />
          <LineChartViewWeek />
          <LineChartComparison />
        </div>
      )}

    </div>

  );
};

export default Dashboard;
