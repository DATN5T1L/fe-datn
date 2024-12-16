"use client"
import { Card, Image } from "react-bootstrap";
import DoughnutChart from "@/app/accountant/chart/DoughnutChart";
import h from "./BodyDashboard.module.css";
import LineChart from "@/app/accountant/chart/LineChart";
import { useEffect, useState } from "react";
import useCookie from "@/app/(user-global)/component/hook/useCookie";

type DataItem = {
  month: number;
  revenue: number;
};

const BodyDashboard = () => {
  const [peopleComplete, setPeopleComlete] = useState()
  const token = useCookie('token')
  const [dataStatis, setDataStatis] = useState<DataItem[]>([])
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
          console.log('data statis',data);
          setDataStatis(data.data)
        })
        .catch(error => {
          console.error(error);
        })
    }
  }, [token])

  console.log(peopleComplete);


  return (
    <>
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