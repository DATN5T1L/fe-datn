"use client";

import React, { FC } from "react";
import {
  Button,
  Form,
  InputGroup,
  Table,
  Pagination,
  Container,
} from "react-bootstrap";
import h from "./chapter.module.css";
import Link from "next/link";
import "./chapter.css";

const Chapter: React.FC<{}> = () => {
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
  return (
    <div
      className={`d-flex flex-column flex-grow-1 align-items-start mx-4 mx-xs-2 mx-sm-3`}
    >
      <div
        className={`${h.header} d-flex justify-content-between align-items-center`}
      >
        <h2 className={h.heading}>Danh sách chapter</h2>
        <Link className={h.heading__link} href="/giangvien/ChapterPage/ChapterAdd">
          <div className={`${h.actions} d-flex`}>
            <Button className={`${h.btnCTA}`}>Thêm chapter</Button>
          </div>
        </Link>
      </div>

      {/* Post List */}
      <div
        className={`${h.bodytable}d-flex overflow-auto w-100`}
        style={{ whiteSpace: "nowrap" }}
      >
        <Table bordered hover className={`${h.table}`}>
          <thead>
            <tr>
              <td className={`text-lg-center ${h.td__stt}`}>Số thứ tự</td>
              <td className="">Tên chapter</td>
              <td className="">Tên Khóa học</td>
              <td className="text-lg-center">Ngày thêm</td>
              <td className="text-lg-center w-1">Ngày cập nhật</td>
              <td className="text-lg-center">Hành động</td>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill(null)
              .map((_, idx) => (
                <tr key={idx}>
                  <td className="text-lg-center">{idx + 1}</td>
                  <td className="">Giới thiệu về reactJS</td>
                  <td className="">Giới thiệu về reactJS</td>
                  <td className="text-lg-center">01/01/2024</td>
                  <td className="text-lg-center">02/01/2024</td>
                  <td className={h.option_button_group}>
                    <div
                      className={`justify-content-space-between border d-flex py-2 rounded row mx-1`}
                    >
                      <Link
                        href="/giangvien/ChapterPage/ChapterDetail"
                        className="w-33 border-end justify-content-center d-flex col-3"
                      >
                        <img src="/img/actionDetail.svg" alt="Edit" />
                      </Link>
                      <Link
                        href={`/giangvien/ChapterPage/ChapterEdit`}
                        className="w-33 border-end justify-content-center d-flex col-3"
                      >
                        <img src="/img_admin/action2.svg" alt="Delete" />
                      </Link>
                      <Link
                        href={`/giangvien/ChapterPage/ManagerDocument`}
                        className="w-33 border-end justify-content-center d-flex col-3"
                      >
                        <img src="/img_admin/vitien.svg" alt="Delete" />
                      </Link>
                      <Link
                        href={`/giangvien/ChapterPage/ChapterEdit`}
                        className="w-33 border-end justify-content-center d-flex col-3"
                      >
                        <img src="/img/action.svg" alt="active" />
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
          <Pagination.Prev
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          >
            <img
              src="/img_admin/prep.svg"
              alt="Previous"
              width="8"
              height="16"
            />
          </Pagination.Prev>
          {renderPaginationItems()}
          <Pagination.Next
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          >
            <img src="/img_admin/prep2.svg" alt="Next" width="8" height="16" />
          </Pagination.Next>
        </Pagination>
      </div>
    </div>
  );
};

export default Chapter;
