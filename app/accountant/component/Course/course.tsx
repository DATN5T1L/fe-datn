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
import CourseAcount from "./CourseAcount";

const Course: React.FC<{}> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [courseRevenue, setCourseRevenue] = useState<CourseAcount[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  const totalPages = Math.ceil(courseRevenue.length / itemsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
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
      setCourseRevenue(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchWeeklyStatistics();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCourses = courseRevenue.filter(course =>
    course.name_course.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

    const items = [
      ...Array.from({ length: 3 }, (_, idx) => (
        <Pagination.Item
          key={idx}
          active={currentPage === idx + 1}
          onClick={() => onPageChange(idx + 1)}
        >
          {idx + 1}
        </Pagination.Item>
      )),
      <Pagination.Ellipsis disabled key="ellipsis" />,
      ...Array.from({ length: 3 }, (_, idx) => (
        <Pagination.Item
          key={totalPages - 3 + idx}
          active={currentPage === totalPages - 3 + idx + 1}
          onClick={() => onPageChange(totalPages - 3 + idx + 1)}
        >
          {totalPages - 3 + idx + 1}
        </Pagination.Item>
      ))
    ];

    return items;
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
      <input
        type="text"
        placeholder="Search by course name..."
        value={searchTerm}
        onChange={handleSearch}
        className="form-control mb-3"
      />
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
            {filteredCourses.length > 0 ? (
              filteredCourses
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((item, index) => (
                  <CourseAcount key={index} data={item} />
                ))
            ) : (
              <tr>
                <td colSpan={10}>No course revenue data available.</td>
              </tr>
            )}
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
