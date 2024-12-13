"use client";

import React, { FC, useEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Pagination,
  Container,
  Card,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import h from "./course.module.css";
import Link from "next/link";
import "./course.css";
import useCookie from "@/app/(user-global)/component/hook/useCookie";

interface CourseData {
  created_at: string;
  del_flag: boolean;
  discount_price_course: number;
  id: string;
  img_course: string;
  instructor_id: string;
  instructor_name: string;
  name_course: string;
  price_course: number;
  rating_course: string;
  status_course: string;
  tax_rate: string;
  updated_at: string;
  views_course: number;
}
interface CourseProps {
  data: CourseData[];
}

const Course: React.FC<CourseProps> = ({ data }) => {
  const token = useCookie('token')
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, data]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationItems = useMemo(() => {

    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      if (currentPage > 3) {
        pages.push(
          <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
            1
          </Pagination.Item>
        );
        pages.push(<Pagination.Ellipsis key="start-ellipsis" />);
      }

      const startPage = Math.max(1, currentPage - 1);
      const endPage = Math.min(totalPages, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(<Pagination.Ellipsis key="end-ellipsis" />);
        pages.push(
          <Pagination.Item
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Pagination.Item>
        );
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const handleCensorCourse = (id: string) => {
    if (token && id) {
      fetch(`/api/censorCourse/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }
  }

  return (
    <div
      className={`${h.main} d-flex flex-column  align-items-start `}
    >
      <div
        className="d-flex overflow-auto w-100"
        style={{ whiteSpace: "nowrap" }}
      >
        <Table bordered hover className={`${h.table} table-responsive`}>
          <thead>
            <tr>
              <td>Hình ảnh</td>
              <td>Tên khóa học</td>
              <td>Giá</td>
              <td>Giá giảm</td>
              <td>Thuế</td>
              <td>Lượt xem</td>
              <td>Trạng thái</td>
              <td className="text-lg-center">Hành động</td>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>
                  <Card.Header className={h.headerContent}>
                    <section className={h.headerContent__text}>
                      <Card.Title className={h.text__hedding2}>
                        {item.name_course}
                      </Card.Title>
                      <Card.Subtitle className={h.text__hedding3}>
                        by {item.instructor_name}
                      </Card.Subtitle>
                      <Card.Img
                        src="/img/iconReact.svg"
                        alt="Học HTML5 và CSS3 cùng TTO.sh"
                        className={h.text__img}
                      />
                    </section>
                    <Card.Img
                      src="/img/tuan.png"
                      alt="Học HTML5 và CSS3 cùng TTO.sh"
                      className={h.headerContent__avt}
                    />
                  </Card.Header>
                </td>
                <td>{item.name_course}</td>
                <td>{item.price_course?.toLocaleString('vi-VN')} đ</td>
                <td>{item.discount_price_course === null ? 0 : item.discount_price_course?.toLocaleString('vi-VN')} %</td>
                <td>{item.tax_rate === null ? 0 : item.tax_rate} %</td>
                <td>{item.views_course}</td>

                <td>
                  <span className={h.active_text}>{item.status_course}</span>
                </td>
                <td className={h.option_button_group}>
                  <div
                    className={h.option_optimai}
                  >
                    <Link href={`/giangvien/CoursePage/CourseVideoDetail?id=${item.id}&name=${item.name_course}`} className={h.link__item}>
                      <img src="/img_admin/action1.svg" alt="Học HTML5 và CSS3 cùng TTO.sh" />
                    </Link>
                    <Link href={`/giangvien/CoursePage/CourseFQA?id=${item.id}`} className={h.link__item}>
                      <img src="/img_admin/hoicham.svg" alt="Tự học lập trình JavaScript tại TTO.SH" />
                    </Link>
                    <Link href={`/giangvien/ChapterPage/ManagerChapter?id=${item.id}&name=${item.name_course}`} className={h.link__item}>
                      <img src="/img_admin/vitien.svg" alt="Tự học lập trình JavaScript tại TTO.SH" />
                    </Link>
                    <Link href={`/giangvien/CoursePage/CourseEdit?id=${item.id}`} className={h.link__item}>
                      <img src="/img_admin/action2.svg" alt="Tự học lập trình JavaScript tại TTO.SH" />
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
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)}>
            <img src="/img_admin/prep.svg" alt="Previous" width="8" height="16" />
          </Pagination.Prev>
          {renderPaginationItems}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)}>
            <img src="/img_admin/prep2.svg" alt="Next" width="8" height="16" />
          </Pagination.Next>
        </Pagination>
      </div>
    </div>
  );
};

export default Course;
