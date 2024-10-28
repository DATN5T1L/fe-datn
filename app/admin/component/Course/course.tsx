"use client";

import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Pagination,
  Container,
  Card,
} from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import h from "./course.module.css";
import Link from "next/link";
import "./course.css";
import header from "@/app/(user-global)/component/globalControl/header";
import useSWR from 'swr';
import useFormatDate from "@/app/(user-global)/component/globalControl/useFormatDate";
import ReactLoading from 'react-loading';

interface User {
  user_id: number;
  fullname: string;
  email: string;
  phonenumber: string;
  created_at: string;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T[];
}


const Course: React.FC<{}> = () => {

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  const token = getCookie('token')

  useEffect(() => {
    fetch('/api/allCourse/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }, [])

  // const [currentPage, setCurrentPage] = useState(1);
  // const usersPerPage = 5;
  // const totalPages = Math.ceil((userData?.data.length || 0) / usersPerPage);

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const handlePrevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const indexOfLastUser = currentPage * usersPerPage;
  // const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // const currentUsers =
  //   userData?.data && Array.isArray(userData.data)
  //     ? userData.data.slice(indexOfFirstUser, indexOfLastUser)
  //     : [];

  // const renderPaginationItems = () => {
  //   const pageNumbers = [];
  //   if (totalPages <= 5) {
  //     for (let i = 1; i <= totalPages; i++) {
  //       pageNumbers.push(
  //         <Pagination.Item
  //           key={i}
  //           active={i === currentPage}
  //           onClick={() => setCurrentPage(i)}
  //         >
  //           {i}
  //         </Pagination.Item>
  //       );
  //     }
  //   } else {
  //     pageNumbers.push(
  //       <Pagination.Item
  //         key={1}
  //         active={1 === currentPage}
  //         onClick={() => setCurrentPage(1)}
  //       >
  //         1
  //       </Pagination.Item>
  //     );

  //     if (currentPage > 3) {
  //       pageNumbers.push(<Pagination.Ellipsis key="start-ellipsis" />);
  //     }

  //     for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
  //       pageNumbers.push(
  //         <Pagination.Item
  //           key={i}
  //           active={i === currentPage}
  //           onClick={() => setCurrentPage(i)}
  //         >
  //           {i}
  //         </Pagination.Item>
  //       );
  //     }

  //     if (currentPage < totalPages - 2) {
  //       pageNumbers.push(<Pagination.Ellipsis key="end-ellipsis" />);
  //     }

  //     pageNumbers.push(
  //       <Pagination.Item
  //         key={totalPages}
  //         active={totalPages === currentPage}
  //         onClick={() => setCurrentPage(totalPages)}
  //       >
  //         {totalPages}
  //       </Pagination.Item>
  //     );
  //   }
  //   return pageNumbers;
  // };

  // if (userIsLoading) return <ReactLoading type={"bubbles"} color={'rgba(153, 153, 153, 1)'} height={'10%'} width={'10%'} className={h.align} />
  // if (userError) return <div>Error loading data</div>;


  return (
    <div
      className={`d-flex flex-column flex-grow-1 align-items-start mx-4 mx-xs-2 mx-sm-3`}
    >
      <div className="d-flex overflow-auto w-100" style={{ whiteSpace: 'nowrap' }}>
        <Table id="cssTable" bordered hover className={`${h.table} table-responsive`}>
          <thead>
            <tr>
              <td>Hình ảnh</td>
              <td>Tên khóa học</td>
              <td>Giá</td>
              <td>Giá giảm</td>
              <td>Lượt xem</td>
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
                        <Card.Img src="/img/iconReact.svg" alt="" className={h.text__img} />
                      </section>
                      <Card.Img src="/img/tuan.png" alt="" className={h.headerContent__avt} />
                    </Card.Header>
                  </td>
                  <td>WEBSITE DESIGN UI/UX</td>
                  <td>
                    1.000.000
                  </td>
                  <td>20%</td>
                  <td>20%</td>
                  <td>Nguyễn Minh Tâm</td>
                  <td>
                    <span className={h.active_text}>Active</span>
                  </td>
                  <td className={h.option_button_group}>
                    <div
                      className={`justify-content-between border d-flex py-2 rounded`}
                    >
                      <Link href="/#!" className="w-50 border-end">
                        <img src="/img_admin/action1.svg" alt="Edit" />
                      </Link>
                      <Link href="UsersPage/DetailUser/" className="w-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" className="bi bi-check-circle" viewBox="0 0 16 16">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                        </svg>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>


      {/* Pagination */}
      <div className="paginationWrapper">
        <Pagination className="pagination">
          <Pagination.Prev>
            <img
              src="/img_admin/prep.svg"
              alt="Previous"
              width="8"
              height="16"
            />
          </Pagination.Prev>
          {Array(2)
            .fill(null)
            .map((_, idx) => (
              <Pagination.Item key={idx} active={idx === 0}>
                {idx + 1}
              </Pagination.Item>
            ))}
          <Pagination.Next>
            <img src="/img_admin/prep2.svg" alt="Next" width="8" height="16" />
          </Pagination.Next>
        </Pagination>
      </div>
    </div >
  );
};

export default Course;
