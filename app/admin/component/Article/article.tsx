"use client";

import React from "react";
import {
  Button,
  Form,
  InputGroup,
  Table,
  Pagination,
  Container,
} from "react-bootstrap";
import h from "./articel.module.css";
import Link from "next/link";
import "./articel.css"

const Article: React.FC = () => {
  return (
    <Container
      className={`${h.container} d-flex flex-column flex-grow-1 align-items-start`}
    >
      {/* Header */}
      <div className={`${h.header}`}>
        <h2 className={h.heading}>Bài viết</h2>
        <div className={`${h.actions} d-flex`}>
          <Button
            variant="outline-primary"
            className={`${h.btnCTA} ${h.btnCTAOutline} me-2`}
          >
            Thêm danh mục bài viết
          </Button>
          <Button className={h.btnCTA}>Thêm bài viết</Button>
        </div>
      </div>

      <div
        className={`${h.filterBar} d-flex justify-content-between align-items-center w-100`}
      >
        <InputGroup className={`${h.filterInputGroup} d-flex`}>
          <InputGroup.Text className={h.inputGroupText}>
            <img src="/img_admin/action.svg" alt="Action" />
          </InputGroup.Text>

          <select aria-label="Trạng thái" className={h.formSelect}>
            <option>Trạng thái  </option>
            <option value="1">Active</option>
            <option value="2">Inactive</option>
          </select>

          <select aria-label="Lượt xem" className={h.formSelect}>
            <option>Lượt xem  </option>
            <option value="1">0-100</option>
            <option value="2">1000+</option>
          </select>

          <InputGroup.Text className={h.resetGroupText}>
            <img src="/img_admin/restart.svg" alt="Reset" />
            <span>  Cài lại</span>
          </InputGroup.Text>
        </InputGroup>

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

      {/* Post List */}
      <Table bordered hover className={`${h.table}`}>
        <thead>
          <tr>
            <td>Tiêu đề</td>
            <td>Nội dung</td>
            <td>Lượt xem</td>
            <td>Trạng thái</td>
            <td>Ngày đăng</td>
            <td>Hành động</td>
          </tr>
        </thead>
        <tbody>
          {Array(5)
            .fill(null)
            .map((_, idx) => (
              <tr key={idx}>
                <td>Học ReactJS với TTO</td>
                <td>Bài viết này tổng hợp lại các dự án mẫu...</td>
                <td>3,000</td>
                <td>
                  <span className={h.active_text}>Active</span>
                </td>

                <td>01/02/2024</td>
                <td className={h.option_button_group}>
                  <div
                    className={`d-flex justify-content-between ${h.option_button}`}
                  >
                    <Link href="/#!">
                      <img src="/img_admin/action1.svg" alt="Edit" />
                    </Link>
                    <Link href="/#!">
                      <img src="/img_admin/action2.svg" alt="View" />
                    </Link>
                    <Link href="/#!">
                      <img src="/img_admin/action3.svg" alt="Delete" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="paginationWrapper">
        <Pagination className="pagination">
          <Pagination.Prev>
            <img src="/img_admin/prep.svg" alt="Previous" width="8" height="16" />
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

    </Container>
  );
};

export default Article;
