"use client";
import style from "./component/Dashboard/Chart.module.css";
import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { Row, Col } from 'react-bootstrap'
import { LineChartViewYear, LineChartViewWeek, LineChartComparison } from "./component/Dashboard/LineChartView";
import { IconPrint } from "@app/(user-global)/component/icon/icons";
import useCookie from '@app/(user-global)/component/hook/useCookie';
import Card from "@app/(user-global)/component/course/CardCourse";
import { getMonthlyProfits } from "@app/(user-global)/component/globalControl/commonC"
import toPdf from "react-to-pdf";
import TotalHeader from "@app/accountant/component/TotalHeader";
const Dashboard = () => {
  const token = useCookie('token');
  const ref = useRef<HTMLDivElement>(null);
  const years = [2024, 2025];

  const [courseHighest, setcourseHighest] = useState<Course>();
  const [courseFavorite, setcourseFavorite] = useState<Course>();
  const [courseFiveStar, setcourseFiveStar] = useState<Course>();
  const [courseLowest, setcourseLowest] = useState<Course>();
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  const [profitsByMonth1, setprofitsByMonth1] = useState<number[]>([]);
  const [profitsByMonth2, setprofitsByMonth2] = useState<number[]>([]);
  const [combinedData, setCombinedData] = useState<Record<number, number[]>>({});
  const [dataByWeek, setDataByWeek] = useState<Record<number, number[]>>({});
  console.log(courseHighest, courseFavorite, courseFiveStar, courseLowest)
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
        console.log(data);

        // Kiểm tra dữ liệu đã tải từ API
        if (data[0] && data[0].data) {
          const highRevenueCourse = data[0].data.high_revenue_course?.data;
          const CourseFavorite = data[0].data.most_favorite_course;
          const CourseFiveStar = data[0].data.most_rated_five_star_course;
          const CourseLowest = data[0].data.low_revenue_course?.data;
          setcourseHighest(highRevenueCourse);
          setcourseFavorite(CourseFavorite);
          setcourseLowest(CourseLowest);
          setcourseFiveStar(CourseFiveStar);
        }

        if (data[1] && data[1].profitsByMonth) {
          setprofitsByMonth1(data[1].profitsByMonth);
        }

        if (data[2] && data[2].profitsByMonth) {
          setprofitsByMonth2(data[2].profitsByMonth);
        }
      }
    } catch (err: any) {
      console.error("Error:", err.message);
    }
  };



  const fetchWeeklyStatistics = async () => {
    try {
      const response = await fetch(`/api/accountant/weeklyStatistics/2024/${selectedWeek}`); // Thay thế bằng URL API thật
      const result = await response.json();
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

  const handleDownloadPdf = () => {
    if (ref.current) {
      toPdf(() => ref.current, {
        filename: 'courses.pdf',
      });
    }
  };
  return (
    <div className={style.mar} ref={ref}>
      <button
        onClick={handleDownloadPdf}
      >
        <IconPrint />
      </button>
      <TotalHeader />
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
