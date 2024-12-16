"use client";

import ViewBarCharts from "./component/Dashboard/ViewChart";
import style from "./component/Dashboard/Chart.module.css";
import { Card, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import OffcanvasComponent from "@/app/giangvien/component/DashboardMenu/overviewmenu";
import LineChart from "@/app/accountant/chart/LineChart";
import DoughnutChart from "@/app/accountant/chart/DoughnutChart";
import h from "./test.module.css";
import useCookie from "../(user-global)/component/hook/useCookie";
import { LineChartViewYear } from "../accountant/component/Dashboard/LineChartView";
import { getMonthlyProfits } from "../(user-global)/component/globalControl/commonC";

interface Statistical {
  averageRating: string; // tổng đánh giá giảng viên
  status: string;
  totalCourse: number; // tổng khóa học
  totalRevenue: number; // tổng doanh thu
  totalViews: string; // tổng view
}

const Dashboard: React.FC = () => {
  const years = [2024, 2025];
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const token = useCookie('token')
  const [satisticalData, setSatisticalData] = useState<Statistical | null>(null)
  const [profitsByMonth1, setprofitsByMonth1] = useState<number[]>([]);
  const [profitsByMonth2, setprofitsByMonth2] = useState<number[]>([]);
  const [combinedData, setCombinedData] = useState<Record<number, number[]>>({});

  useEffect(() => {
    const update2024 = getMonthlyProfits(profitsByMonth1);
    const update2025 = getMonthlyProfits(profitsByMonth2);
    setCombinedData({
      [years[0]]: update2024,
      [years[1]]: update2025,
    });
  }, [profitsByMonth1, profitsByMonth2]);

  useEffect(() => {
    if (token) {
      fetch(`/api/statisticalTeacher/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data) {
            setSatisticalData(data)
          }
        })
        .catch(error => {
          console.error('Có lỗi xảy ra: ', error);

        })
    }
  }, [token])
  return (
    <>
      <div className={style.mar}>
        <section className={style.container}>
          <div className={style.tag_notice}>
            <div className={style.card_notice}>
              <span>
                <p>Tổng khóa học</p>
                <h3>{satisticalData?.totalCourse}</h3>
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
                <p>Tổng doanh thu</p>
                <h3>{satisticalData?.totalRevenue}</h3>
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
                <p>Đánh giá giảng viên</p>
                <h3>{satisticalData?.averageRating}</h3>
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
                <h3>{satisticalData?.totalViews}</h3>
              </span>
              <Image
                src={"/img_admin/total_view.svg"}
                alt="icon"
                width={60}
                height={60}
                onClick={handleShow}
              />
            </div>
          </div>
          <div className={style.chart}>
            <LineChartViewYear years={years} key={"6"} dataByYear={combinedData} />
          </div>
          <div className={h.card_group}>
            <div className={h.card}>
              <div className={h.card_content}>
                <h6>Người hoàn thành khóa học</h6>
                <div className={h.chart}>
                  <div>
                    {/* <DoughnutChart /> */}
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
                  <Card className={h.mainBox__content}>
                    <Card.Header className={h.headerContent}>
                      <section className={h.headerContent__text}>
                        <Card.Title className={h.text__hedding2}>
                          WEBSITE DESIGN UI/UX
                        </Card.Title>
                        <Card.Subtitle className={h.text__hedding3}>
                          by My Team
                        </Card.Subtitle>
                        <Card.Img
                          src="/img/iconReact.svg"
                          alt=""
                          className={h.text__img}
                        />
                      </section>
                      <Card.Img
                        src="/img/tuan.png"
                        alt=""
                        className={h.headerContent__avt}
                      />
                    </Card.Header>
                    <section className={h.mainContent__headContent}>
                      <div className={h.headContent__evaluete}>
                        <div className={h.evaluete__main}>
                          <div className={h.starGroup}>
                            <Image
                              src="/img/iconStar.svg"
                              alt=""
                              className={h.starElement}
                            />
                            <Image
                              src="/img/iconStar.svg"
                              alt=""
                              className={h.starElement}
                            />
                            <Image
                              src="/img/iconStar.svg"
                              alt=""
                              className={h.starElement}
                            />
                            <Image
                              src="/img/iconStar.svg"
                              alt=""
                              className={h.starElement}
                            />
                            <Image
                              src="/img/iconStar.svg"
                              alt=""
                              className={h.starElement}
                            />
                          </div>

                          <Card.Text className={h.starNumber}>
                            {"("} 4,5 {")"}
                          </Card.Text>
                        </div>
                      </div>
                      <div className={h.headContent__percent}>
                        <Card.Text className={h.evaluete__note}>
                          {"("} 504 phản hồi {")"}
                        </Card.Text>
                      </div>
                    </section>
                    <Card.Body className={h.mainContent}>
                      <section className={h.bodyContent}>
                        <div className={h.bodyContent__element}>
                          <Image
                            src="/img/bookoffgreen.svg"
                            alt=""
                            className={h.element__img}
                          />
                          <Card.Text className={h.element__text}>
                            10 Chương
                          </Card.Text>
                        </div>
                        <div className={h.bodyContent__element}>
                          <Image
                            src="/img/bookopenblue.svg"
                            alt=""
                            className={h.element__img}
                          />
                          <Card.Text className={h.element__text}>
                            10 Bài tập
                          </Card.Text>
                        </div>
                        <div className={h.bodyContent__element}>
                          <Image
                            src="/img/bookopenyellow.svg"
                            alt=""
                            className={h.element__img}
                          />
                          <Card.Text className={h.element__text}>
                            10 Đã học
                          </Card.Text>
                        </div>
                      </section>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
            <div className={h.card}>
              <div className={h.card_content}>
                <h6>Doanh thu</h6>
                <div>
                  <LineChart />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
