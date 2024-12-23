"use client"
import { Card, Image } from "react-bootstrap";
import DoughnutChart from "@/app/accountant/chart/DoughnutChart";
import h from "./BodyDashboard.module.css";
import LineChart from "@/app/accountant/chart/LineChart";
import { useEffect, useState } from "react";
import useCookie from "@/app/(user-global)/component/hook/useCookie";

type DataType = {
  [key: string]: number;
};

const BodyDashboard = () => {
  const [peopleComplete, setPeopleComlete] = useState()
  const token = useCookie('token')
  const [dataStatis, setDataStatis] = useState<DataType | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) {
      fetch(`/api/statistical_complete/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => res.json())
        .then(data => {
          setPeopleComlete(data)
          console.log('data nè: ', data);

        })
        .catch(error => console.log(error))
    }
  }, [token])

  useEffect(() => {
    if (token) {
      fetch(`/api/statistical_instructor_complete_course`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => res.json())
        .then(data => {
          setPeopleComlete(data)
          console.log('data', data);
        })
        .catch(error => console.log(error))
    }
  }, [token])

  useEffect(() => {
    if (token) {
      fetch(`/api/accountant/statisticalProfitsByMonths/2024`, {
        method: "GET",
        headers: {
          Authorization: `Barser ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log('data statis', data);
          setDataStatis(data.profitsByMonth)
        })
        .catch(error => {
          console.error(error);
        })
    }
  }, [token])

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
              {/* {course && <CourseCard titleAction={2} course={course} />} */}
            </div>
          </div>
        </div>
        <div className={h.card}>
          <div className={h.card_content}>
            <h6>Doanh thu quý hiện tại</h6>
            <div>
              {dataStatis && (
                <LineChart data={dataStatis} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BodyDashboard;