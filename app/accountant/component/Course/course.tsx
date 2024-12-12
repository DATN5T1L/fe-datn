"use client";

import React, { useEffect, useRef, useState } from "react";
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
import CourseAcount from "./CourseAcount"
const Course: React.FC<{}> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const totalPages = 4;
  const currentPage = 1;
  const [courseRevenue, setCourseRevenue] = useState<CourseAcount[]>([]);
  const onPageChange = (page: number) => {
    console.log("Chuyển tới trang:", page);
  };
  console.log(courseRevenue)
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


  const fetchWeeklyStatistics = async () => {
    try {
      const response = await fetch(`/api/accountant/courseEnrollmentRevenue`);
      const result = await response.json();
      setCourseRevenue(result.data)
      console.log(result)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchWeeklyStatistics();
  }, [])

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
              <td>Khóa học</td>
              <td>Giá</td>
              <td>Giá giảm</td>
              <td>Lượt xem</td>
              <td>Tổng doanh thu</td>
              <td>Thuế</td>
              <td>Đánh giá</td>
              <td>Giảng viên</td>
              <td>Trạng thái</td>
              <td>Hành động</td>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(courseRevenue) && courseRevenue.length > 0 ?
              (courseRevenue.map((item, index) => (<CourseAcount key={index} data={item} />)))
              : (<p>No course revenue data available.</p>)}

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
