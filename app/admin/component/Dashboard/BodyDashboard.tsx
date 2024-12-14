"use client"
import { Card, Image } from "react-bootstrap";
import DoughnutChart from "@/app/accountant/chart/DoughnutChart";
import h from "./BodyDashboard.module.css";
import LineChart from "@/app/accountant/chart/LineChart";
import { useEffect, useState } from "react";
import CourseCard from "@/app/(user-global)/component/course/CardCourse";



const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
}


const BodyDashboard = () => {
  const [peopleComplete, setPeopleComlete] = useState()
  const token = getCookie('token')
  const [course, setCourse] = useState<Course>()
  // useEffect(() => {
  //   fetch(`/api/statistical_complete`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     }
  //   }).then(res => res.json())
  //     .then(data => setPeopleComlete(data))
  //     .catch(error => console.log(error))
  // }, [])

  console.log(peopleComplete);

  const labels = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"];
  const data = [20, 50, 30, 80, 60];
  return (
    <>
      <div className={h.card_group}>
        <div className={h.card}>
          <div className={h.card_content}>
            <h6>Người hoàn thành khóa học</h6>
            <div className={h.chart}>
              <div>
                <DoughnutChart dataValue={3} totalValue={30} />
              </div>
            </div>
            <div className={h.info_course}>
              <span>
                <h4>500</h4>
                <div>
                  <div className={h.point}></div>Hoàn thành
                </div>
              </span>
              <span>
                <h4>900</h4>
                <div>
                  <div className={h.point_light}></div>Chưa hoàn thành
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className={h.card}>
          <div className={h.card_content}>
            <h6>Khóa học nổi bật</h6>
            <div>
              {course && <CourseCard titleAction={2} course={course} />}
            </div>
          </div>
        </div>
        <div className={h.card}>
          <div className={h.card_content}>
            <h6>Doanh thu quý hiện tại</h6>
            <div>
              <LineChart data={data} labels={labels} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BodyDashboard;