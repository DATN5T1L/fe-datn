"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HeaderTeacher } from "../component/Teacher/HeaderTeacher";
import { Pagination, Image } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import h from "./teacher.module.css";
import Link from "next/link";
import ".././component/Course/course.css";

const TeacherPage = () => {
  return (
    <div>
      <HeaderTeacher />
      <div
        className={`d-flex flex-column flex-grow-1 align-items-start mx-4 mx-xs-2 mx-sm-3`}
      >
        <div
          className="d-flex overflow-auto w-100"
          style={{ whiteSpace: "nowrap" }}
        >
          <Table bordered hover className={`${h.table} table-responsive`}>
            <thead>
              <tr>
                <td>Hình ảnh</td>
                <td>Giảng viên</td>
                <td>Tên khóa học</td>
                <td>Email</td>
                <td>Tuổi</td>
                <td>Số điện thoại</td>
                <td>Hành động</td>
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill(null)
                .map((_, idx) => (
                  <tr key={idx}>
                    <td>
                      <Image
                        src="/img_accountant/avatar.png"
                        width={80}
                        height={80}
                        className={h.roundedImg}
                      />
                    </td>
                    <td>
                      <Link href={"Teacher/TeacherDetail"}>
                        Nguyễn Minh Tâm
                      </Link>
                    </td>
                    <td>Website Design UI/UX</td>
                    <td>Tam@gmail.com</td>
                    <td>20</td>
                    <td>096294354</td>
                    <td>
                      <div className={h.PrintBtn}>
                        <Image
                          src={"/img_accountant/print.svg"}
                          alt="icon"
                          width={24}
                          height={24}
                        />
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
            {Array(7)
              .fill(null)
              .map((_, idx) => (
                <Pagination.Item key={idx} active={idx === 0}>
                  {idx + 1}
                </Pagination.Item>
              ))}
            <Pagination.Next>
              <img
                src="/img_admin/prep2.svg"
                alt="Next"
                width="8"
                height="16"
              />
            </Pagination.Next>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;
