"use client";
import style from "./component/Dashboard/Chart.module.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { Row, Col } from 'react-bootstrap'
import { LineChartViewYear, LineChartViewWeek, LineChartComparison } from "./component/Dashboard/LineChartView";
import { IconTotalUser, IconTotalOrder, IconTotalProfit, IconTotalOrderToday } from "@app/(user-global)/component/icon/icons";
import useCookie from '@app/(user-global)/component/hook/useCookie';
import Button from "@app/(user-global)/component/globalControl/btnComponent";
import Card from "@app/(user-global)/component/course/CardCourse";
import { getMonthlyProfits } from "@app/(user-global)/component/globalControl/commonC"

const Dashboard = () => {
  const token = useCookie('token');

  const [totalUser, setTotalUser] = useState<number>(0);
  const [totalCourse, setTotalCourse] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalToday, setTotalToday] = useState<number>(0);
  const [courseHighest, setcourseHighest] = useState<Course | null>(null);
  const [courseFavorite, setcourseFavorite] = useState<Course | null>(null);
  const [courseFiveStar, setcourseFiveStar] = useState<Course | null>(null);
  const [courseLowest, setcourseLowest] = useState<Course | null>(null);

  // thực hiện đổ data các biểu đồ

  const years = [2024, 2025];
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  const [profitsByMonth1, setprofitsByMonth1] = useState<number[]>([]);
  const [profitsByMonth2, setprofitsByMonth2] = useState<number[]>([]);
  const [combinedData, setCombinedData] = useState<Record<number, number[]>>({});
  const [dataByWeek, setDataByWeek] = useState<Record<number, number[]>>({});
  useEffect(() => {
    const update2024 = getMonthlyProfits(profitsByMonth1);
    const update2025 = getMonthlyProfits(profitsByMonth2);
    setCombinedData({
      [years[0]]: update2024,
      [years[1]]: update2025,
    });
  }, [profitsByMonth1, profitsByMonth2]);

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
          fetch(`/api/accountant/getaccountantStatistics`, {
            method: "GET",
            headers: {
              Authorization: `Barser ${token}`,
            },
          }),
          fetch(`/api/accountant/statisticalProfitsByMonths/2024`, {
            method: "GET",
            headers: {
              Authorization: `Barser ${token}`,
            },
          }),
          fetch(`/api/accountant/statisticalProfitsByMonths/2025`, {
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
        const courses = data[4].data.high_revenue_course.data;
        const CourseFavorite = data[4].data.most_favorites_by_course[0];
        const CourseFiveStar = data[4].data.most_rater_five_star_course[0];
        const CourseLowest = data[4].data.low_revenue_course.data;
        const statisticalYear2024 = data[5]
        const statisticalYear2025 = data[6]

        setprofitsByMonth1(statisticalYear2024.profitsByMonth)
        setprofitsByMonth2(statisticalYear2025.profitsByMonth)
        // Khóa học
        setcourseHighest(courses);
        setcourseFavorite(CourseFavorite);
        setcourseLowest(CourseLowest)
        setcourseFiveStar(CourseFiveStar)
        // Cập nhật state hoặc xử lý dữ liệu
        setTotalUser(totalUser);
        setTotalCourse(totalCourse);
        setTotalRevenue(totalRevenue);
        setTotalToday(totalTotal);
        console.log(courses, CourseFavorite, CourseFiveStar, CourseLowest)
      }
    } catch (err: any) {
      console.error("Error:", err.message);
    }
  };

  const fetchWeeklyStatistics = async () => {
    try {
      const response = await fetch(`/api/accountant/weeklyStatistics/2024/${selectedWeek}`); // Thay thế bằng URL API thật
      const result = await response.json();
      console.log(result)
      // Giả sử API trả về dữ liệu có cấu trúc phù hợp

      const data = getMonthlyProfits(result.profitsByDay)
      setDataByWeek((prev) => ({
        ...prev,
        [selectedWeek]: data,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchWeeklyStatistics();
  }, [selectedWeek]);


  useLayoutEffect(() => {
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
        <h2 className={style.coursesTotal_Heading}>Các khóa học nổi bật</h2>
        <Row>
          <Col xs={3}>
            <h4 className={style.titleCourseTotal}>Khóa học có doanh thu cao nhất</h4>
          </Col>
          <Col xs={3}>
            <h4 className={style.titleCourseTotal}>Khóa học được yêu thích nhất</h4>
          </Col>
          <Col xs={3}>
            <h4 className={style.titleCourseTotal}>Khóa học 5 sao</h4>
          </Col>
          <Col xs={3}>
            <h4 className={style.titleCourseTotal}>Khóa học cần được thúc đẩy</h4>
          </Col>
        </Row>
        <Row>
          {/* KHÓA HỌC DOANH THU CAO NHẤT */}
          {courseHighest && (<Card key={"1"} course={courseHighest} titleAction={2} />)}
          {courseFavorite && (<Card key={"2"} course={courseFavorite} titleAction={2} />)}
          {courseFiveStar && (<Card key={"4"} course={courseFiveStar} titleAction={2} />)}
          {courseLowest && (<Card key={"3"} course={courseLowest} titleAction={2} />)}
        </Row>
        <h2 className={style.coursesTotal_Heading}>Các bài viết nổi bật</h2>
        <Row>
          <Col xs={3}>
            <h4 className={style.titleCourseTotal}>Bài viết có nhiều lượt tương tác nhất</h4>
          </Col>
          <Col xs={3}>
            <h4 className={style.titleCourseTotal}>Bài viết có lượt xem nhiều nhất</h4>
          </Col>
          <Col xs={3}>
            <h4 className={style.titleCourseTotal}>Bài viết mới</h4>
          </Col>
          <Col xs={3}>
            <h4 className={style.titleCourseTotal}>Bài viết ít lượt quan tâm</h4>
          </Col>
        </Row>
        <Row>
          {/* KHÓA HỌC DOANH THU CAO NHẤT */}
          {courseHighest && (<Card key={"1"} course={courseHighest} titleAction={2} />)}
          {courseFavorite && (<Card key={"2"} course={courseFavorite} titleAction={2} />)}
          {courseFiveStar && (<Card key={"4"} course={courseFiveStar} titleAction={2} />)}
          {courseLowest && (<Card key={"3"} course={courseLowest} titleAction={2} />)}
        </Row>
      </div>


      <div className={style.chart}>
        <h2>Thống kê doanh thu theo năm</h2>
        <LineChartViewYear years={years} key={"6"} dataByYear={combinedData} />
        <div>
          <div>
            <label>Chọn tuần:</label>
            <input
              type="number"
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(Number(e.target.value))}
              min={1}
              max={52}
            />
          </div>
          <LineChartViewWeek selectedWeek={selectedWeek} dataByWeek={dataByWeek} />
        </div>

        <LineChartComparison years={years} key={"8"} dataByYear={combinedData} />
      </div>


    </div>

  );
};

export default Dashboard;
