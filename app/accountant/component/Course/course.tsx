"use client";

import React, { FC, useRef } from "react";
import {
  Button,
  Pagination,
  Card,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import h from "./course.module.css";
import Link from "next/link";
import "./course.css";
import toPdf from "react-to-pdf";
import { IconPrint } from "@app/(user-global)/component/icon/icons";

const Course: React.FC<{}> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const totalPages = 10;
  const currentPage = 1;

  const onPageChange = (page: number) => {
    console.log("Chuyển tới trang:", page);
  };

  const renderPaginationItems = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, idx) => (
        <Pagination.Item
          key={idx}
          active={currentPage === idx + 1}
          onClick={() => onPageChange(idx + 1)}
        >
          {idx + 1}
        </Pagination.Item>
      ));
    }

    return (
      <>
        {Array.from({ length: 7 }, (_, idx) => (
          <Pagination.Item
            key={idx}
            active={currentPage === idx + 1}
            onClick={() => onPageChange(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
        <Pagination.Ellipsis disabled />
      </>
    );
  };

  const handleDownloadPdf = () => {
    if (ref.current) {
      toPdf(() => ref.current, {
        filename: 'courses.pdf',
      });
    }
  };


  return (
    <div
      className={`d-flex flex-column flex-grow-1 align-items-start mx-4 mx-xs-2 mx-sm-3`}
    >
      <span
        onClick={handleDownloadPdf}
        className={h.ctaPrint}
      >
        <IconPrint />
      </span>
      <div
        className="d-flex overflow-auto w-100"
        style={{ whiteSpace: "nowrap" }}
        ref={ref}
      >

        <Table bordered hover className={`${h.table} table-responsive`}>
          <thead>
            <tr>
              <td>Hình ảnh</td>
              <td>Tên khóa học</td>
              <td>Giá</td>
              <td>Giá giảm</td>
              <td>Lượt xem</td>
              <td>Tổng doanh thu</td>
              <td>Giảng viên</td>
              <td>Trạng thái</td>
              <td>Hành động</td>
            </tr>
          </thead>

          <tbody>
            {Array(5)
              .fill(null)
              .map((_, idx) => (
                <tr key={idx}>
                  <td>
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
                  </td>
                  <td>WEBSITE DESIGN UI/UX</td>
                  <td>1.000.000</td>
                  <td>20%</td>
                  <td>300</td>
                  <td>300.000.000 vnđ</td>
                  <td>Nguyễn Minh Tâm</td>
                  <td>
                    <span className={h.active_text}>Active</span>
                  </td>
                  <td className={h.option_button_group}>
                    <div
                      className={`justify-content-between border d-flex py-2 rounded`}
                    >
                      <Link href="/accountant/CoursePage/RecentPurchaseCourse" className="w-50 border-end">
                        <img src="/img_admin/action1.svg" alt="Edit" />
                      </Link>

                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <div className="paginationWrapper">
        <Pagination className="pagination">
          <Pagination.Prev
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          />
          {renderPaginationItems()}
          <Pagination.Next
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          />
        </Pagination>
      </div>


    </div>
  );
};

export default Course;
