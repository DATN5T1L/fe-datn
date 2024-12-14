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
import BodyDashboard from "@/app/admin/component/Dashboard/BodyDashboard";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import ReactLoading from 'react-loading';
import { LineChartViewYear } from "../accountant/component/Dashboard/LineChartView";
import { formatToVietnameseCurrencyText, getMonthlyProfits } from "../(user-global)/component/globalControl/commonC";

interface Statistical {
  totalCourse: number;
  totalCourseLecturer: number; // nhân viên
  totalCourseNow: number; //  
  totalCourseRevenue: string; // doanh thu
}

const getCookie = (name: string) => {
  if (typeof window !== 'undefined') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  }
  return null;
};

const Dashboard: React.FC = () => {
  const router = useRouter()
  const userState = useSelector((state: RootState) => state.user.user)
  const [data, setData] = useState<Statistical | null>(null)
  const alertShown = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const token = getCookie('token');
  const [countEnrollments, setCountEnrollments] = useState(0)

  useEffect(() => {
    if (token) {
      setIsLoading(true)
      fetch(`/api/statistical_admin/`, {
        cache: 'no-cache',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(async res => {
          if (!res.ok) {
            const errorDetail = await res.text();
            throw new Error(`HTTP error! status: ${res.status} - ${errorDetail}`);
          }
          return res.json();
        })
        .then(data => {
          setIsLoading(false)
          console.log(data);
          setData(data)
        })
        .catch(error => {
          console.log(error)
          setIsLoading(false)
        })
    }
  }, [token])

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

  const years = [2024, 2025];
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [combinedData, setCombinedData] = useState<Record<number, number[]>>({});
  const [profitsByMonth1, setprofitsByMonth1] = useState<number[]>([]);
  const [profitsByMonth2, setprofitsByMonth2] = useState<number[]>([]);
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
        const statisticalYear2024 = data[0]
        const statisticalYear2025 = data[1]

        setprofitsByMonth1(statisticalYear2024.profitsByMonth)
        setprofitsByMonth2(statisticalYear2025.profitsByMonth)

      }
    } catch (err: any) {
      console.error("Error:", err.message);
    }
  };

  useEffect(() => {
    if (token) fetchMultipleAPIs()
  }, [token])

  return (
    <>
      <div className={style.mar}>
        <section className={style.container}>
          <div className={style.tag_notice}>
            <div className={style.card_notice}>
              <span>
                <p>Tổng khóa học</p>
                {isLoading ? (
                  <ReactLoading type={"spokes"} color={'rgba(153, 153, 153, 1)'} height={'30%'} width={'30%'} />
                ) : (
                  <h3>{data?.totalCourse}</h3>
                )}
              </span>
              <Image
                src={"/img_admin/boxvippro.png"}
                alt="Chứng chỉ hoàn thành khóa học"
                width={60}
                height={60}
              />
            </div>
            <div className={style.card_notice}>
              <span>
                <p>Đơn hôm nay</p>
                {isLoading ? (
                  <ReactLoading type={"spokes"} color={'rgba(153, 153, 153, 1)'} height={'30%'} width={'30%'} />
                ) : (
                  <h3>{data?.totalCourseNow}</h3>
                )}
              </span>
              <Image
                src={"/img_admin/total_view.svg"}
                alt="Chứng chỉ hoàn thành khóa học"
                width={60}
                height={60}
              />
            </div>
            <div className={style.card_notice}>
              <span>
                <p>Tổng nhân viên</p>
                {isLoading ? (
                  <ReactLoading type={"spokes"} color={'rgba(153, 153, 153, 1)'} height={'30%'} width={'30%'} />
                ) : (
                  <h3>{data?.totalCourseLecturer}</h3>
                )}
              </span>
              <Image
                src={"/img_admin/comment.svg"}
                alt="Chứng chỉ hoàn thành khóa học"
                width={60}
                height={60}
              />
            </div>
            <div className={style.card_notice}>
              <span id="tippy">
                <p>Tổng doanh thu</p>
                {isLoading ? (
                  <ReactLoading type={"spokes"} color={'rgba(153, 153, 153, 1)'} height={'30%'} width={'30%'} />
                ) : (
                  data?.totalCourseRevenue && (
                    <h3>{formatToVietnameseCurrencyText(Number(data.totalCourseRevenue))}</h3>)
                )}
              </span>

              <Image
                src={"/img_admin/monneyvip.svg"}
                alt="Chứng chỉ hoàn thành khóa học"
                width={60}
                height={60}
                onClick={handleShow}
              />
            </div>
            <OffcanvasComponent show={show} handleClose={handleClose} />
          </div>
          <div className={style.chart}>
            <LineChartViewYear years={years} key={"6"} dataByYear={combinedData} />
          </div>
          <BodyDashboard />
        </section>
      </div>
    </>
  );
};

export default Dashboard;