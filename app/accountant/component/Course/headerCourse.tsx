import React from "react";
import {
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import useCookie from '@app/(user-global)/component/hook/useCookie';
import h from "./course.module.css";
import { IconTotalUser, IconTotalOrder, IconTotalProfit, IconTotalOrderToday } from "@app/(user-global)/component/icon/icons";

export const HeaderCourse = () => {
  const token = useCookie('token');
  const [totalUser, setTotalUser] = useState<number>(0);
  const [totalCourse, setTotalCourse] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalToday, setTotalToday] = useState<number>(0);
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

          fetch(`/api/accountant/totalprofits`, {
            method: "GET",
            headers: {
              Authorization: `Barser ${token}`,
            },
          }),
          fetch(`/api/accountant/enrollmentToday`, {
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

        // Lấy dữ liệu từ các endpoint
        const totalUser = data[0].data.user_count;
        const totalCourse = data[1].data.enrollCount;
        const totalRevenue = data[2].totalRevenue;
        const totalTotal = data[3].enrollCountToday;

        console.log({ totalUser, totalCourse, totalRevenue });

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
    <div className="mx-4 mx-xs-2 mx-sm-3">
      <section className={h.container}>
        <div className={h.tag_notice}>
          <article className={h.card_notice}>
            <div className={h.card_noticeContent}>
              <p className={h.titleNotice}>Tổng người dùng</p>
              <h6 className={h.totalNotice}>{totalUser}</h6>
            </div>
            <IconTotalUser />
          </article>
          <article className={h.card_notice}>
            <div className={h.card_noticeContent}>
              <p className={h.titleNotice}>Tổng đơn hàng</p>
              <h6 className={h.totalNotice}>{totalCourse}</h6>
            </div>
            <IconTotalOrder />
          </article>
          <article className={h.card_notice}>
            <div className={h.card_noticeContent}>
              <p className={h.titleNotice}>Tổng lợi nhuận</p>
              <h6 className={h.totalNotice}>{totalRevenue}</h6>
            </div>
            <IconTotalProfit />
          </article>
          <article className={h.card_notice}>
            <div className={h.card_noticeContent}>
              <p className={h.titleNotice}>Đơn hàng hôm nay</p>
              <h6 className={h.totalNotice}>{totalToday}</h6>
            </div>
            <IconTotalOrderToday />
          </article>
        </div>
      </section>
      <div className={`d-flex justify-content-between align-items-center my-4`}>
        <h2 className={h.heading}>Thống kê doanh thu khóa học</h2>
      </div>
    </div>
  );
};

export const HeaderUsersSimple = () => {
  return (
    <div>
      <div
        className={`${h.header1} d-flex justify-content-between align-items-center`}
      >
        <h2 className={h.heading}>Bài viết</h2>

        <div className={`${h.actions} d-flex`}>
          <InputGroup className={h.searchInputGroup}>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm bài viết"
              className={h.searchInput}
            />
            <div className={h.searchIconWrapper}>
              <img
                src="/img_admin/search.svg"
                alt="Search"
                width={"24px"}
                height={"24px"}
              />
            </div>
          </InputGroup>
        </div>
      </div>
    </div>
  );
};
