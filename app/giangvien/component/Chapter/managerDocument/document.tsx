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
import h from "./document.module.css";
import Link from "next/link";
import "./document.css";
import { useRouter } from "next/navigation";

const ManagerDocumnet: React.FC<{}> = () => {
  const router = useRouter()
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

  const handlePushAdd = () => {
    router.replace('/giangvien/Lesson/LessonAdd')
  }

  return (
    <div
      className={`${h.main} d-flex flex-column `}
    >
      <div
        className={`${h.header} d-flex justify-content-between align-items-center`}
      >
        <h2 className={h.heading}>Quản lý bài học</h2>

        <div className={`${h.actions} d-flex`}>
          <Button className={`${h.btnCTA}`} onClick={handlePushAdd}>Thêm bài học</Button>
        </div>
      </div>
      <div className={`${h.left_right}`}>
        <div className={h.left}>
          Chương: <span>Giới thiệu về reactJS</span>
        </div>
        <div className={`${h.right} `}>
          <InputGroup className={h.searchInputGroup}>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm bài học"
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
      <div
        className={`${h.bodytable}d-flex overflow-auto w-100`}
        style={{ whiteSpace: "nowrap" }}
      >
        <Table bordered hover className={`${h.table}`}>
          <thead>
            <tr>
              <td className='text-lg-center w-auto'>Số thứ tự</td>
              <td className='text-lg-center'>Tên bài học</td>
              <td className='text-lg-center'>Dạng bài học</td>
              <td className='text-lg-center'>Ngày thêm</td>
              <td className='text-lg-center'>Ngày cập nhật</td>
              <td className='text-lg-center'>Hành động</td>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill(null)
              .map((_, idx) => (
                <tr key={idx}>
                  <td className="text-lg-center w-auto">
                    {idx + 1}
                  </td>
                  <td className="text-lg-center">Giới thiệu về reactJS</td>
                  <td className="text-center">
                    <span className={`text-lg-center ${h.active_text1}`}>Trắc nghiệm</span>
                  </td>
                  <td className="text-lg-center">01/01/2024</td>
                  <td className="text-lg-center">02/01/2024</td>
                  <td className={h.option_button_group}>
                    <div
                      className={` w-51 justify-content-between border d-flex py-2 rounded row mx-1`}
                    >
                      <Link
                        href="/giangvien/ChapterPage/ChapterDetail"
                        className="w border-end justify-content-center align-item-center d-flex col-4"
                      >
                        <img src="/img/actionDetail.svg" alt="Edit" />
                      </Link>
                      <Link
                        href={`ChapterPage?id=${1}`}
                        as={`ChapterPage/${1}`}
                        className="w border-end justify-content-center align-item-center d-flex col-4"
                      >
                        <img src="/img_admin/action2.svg" alt="Delete" />
                      </Link>
                      {/* <Link
                        href={`ChapterPage?id=${1}`}
                        as={`ChapterPage/${1}`}
                        className="w border-end justify-content-center align-item-center d-flex col-3"
                      >
                        <img src="/img_admin/vitien.svg" alt="Delete" />
                      </Link> */}
                      <Link
                        href={`ChapterPage?id=${1}`}
                        as={`ChapterPage/${1}`}
                        className="w border-end justify-content-center align-item-center d-flex col-4"
                      >
                        <img src="/img/action.svg" alt="Delete" />
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

export default ManagerDocumnet;
