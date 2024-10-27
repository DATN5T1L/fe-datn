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
import h from "./fqa.module.css";
import Link from "next/link";
import "./fqa.css";

const FQA: React.FC<{}> = () => {
  return (
    <div
      className={`d-flex flex-column flex-grow-1 align-items-start mx-4 mx-xs-2 mx-sm-3`}
    >
      <div
        className={`${h.header} d-flex justify-content-between align-items-center`}
      >
        <h2 className={h.heading}>FQA khóa học</h2>

        <div className={`${h.actions} d-flex`}>
          <Button className={`${h.btnCTA}`}>Thêm câu hỏi</Button>
        </div>
      </div>
      <div
        className={`${h.left_right} d-flex justify-content-between align-items-center`}
      >
        <div className={h.left}>
          Khóa học: <span>Website Design UI/UX</span>
        </div>
        <div className={`${h.right} d-flex`}>
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

      {/* Post List */}
      <div
        className={`${h.bodytable}d-flex overflow-auto w-100`}
        style={{ whiteSpace: "nowrap" }}
      >
        <Table bordered hover className={`${h.table}`}>
          <thead>
            <tr>
              <td>Câu hỏi</td>
              <td>Câu trả lời</td>
              <td>Ngày thêm</td>
              <td>Hành động</td>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill(null)
              .map((_, idx) => (
                <tr key={idx}>
                  <td>Giới thiệu về reactJS</td>
                  <td>Giới thiệu về reactJS</td>

                  <td>01/01/2024</td>

                  <td className={h.option_button_group}>
                    <div
                      className={`justify-content-between border d-flex py-2 rounded row mx-1`}
                    >
                      <Link
                        href="/#!"
                        className="w border-end justify-content-center align-item-center d-flex col-6"
                      >
                        <img src="/img_admin/eyes.svg" alt="Edit" />
                      </Link>
                      <Link
                        href={`FQAPage?id=${1}`}
                        as={`FQAPage/${1}`}
                        className="w border-end justify-content-center align-item-center d-flex col-6"
                      >
                        <img src="/img_admin/action2.svg" alt="Delete" />
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
          {Array(7)
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
    </div>
  );
};

export default FQA;
