"use client";

import React from "react";
import { Button, Form, InputGroup, Table, Pagination, Container } from "react-bootstrap";
import h from "./articel.module.css";

const Article: React.FC = () => {
  return (
    <Container className={`${h.container} flex-grow-1`}>
      {/* Header */}
      <div className={`${h.header}`}>
        <h2>Bài viết</h2>
        <div className={`${h.actions}`}>
          <Button
            variant="outline-primary"
            className={`${h.customHeight} me-2`}
          >
            Thêm danh mục bài viết
          </Button>
          <Button className={h.customHeight}>Thêm bài viết</Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div
        className={`${h.filterBar} d-flex gap-3 p-2 justify-content-between align-items-center`}
      >
        <InputGroup className={`${h.filterInputGroup}`}>
          <InputGroup.Text className={h.inputGroupText}>
            <img src="/img_admin/action.svg" alt="Action" />
          </InputGroup.Text>

          <Form.Select aria-label="Trạng thái" className={h.formSelect}>
            <option>Trạng thái</option>
            <option value="1">Active</option>
            <option value="2">Inactive</option>
          </Form.Select>

          <Form.Select aria-label="Lượt xem" className={h.formSelect}>
            <option>Lượt xem</option>
            <option value="1">0-100</option>
            <option value="2">1000+</option>
          </Form.Select>

          <InputGroup.Text className={h.resetGroupText}>
            <img src="/img_admin/restart.svg" alt="Reset" />
            <span>Cài lại</span>
          </InputGroup.Text>
        </InputGroup>

        <InputGroup className={h.searchInputGroup}>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm bài viết"
            className={h.searchInput}
          />
          <div className={h.searchIconWrapper}>
            <img src="/img_admin/search-icon.svg" alt="Search" />
          </div>
        </InputGroup>
      </div>

      {/* Post List */}
      <Table bordered hover className={`${h.table}`}>
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Nội dung</th>
            <th>Lượt xem</th>
            <th>Trạng thái</th>
            <th>Ngày đăng</th>
            <th>Hành động</th>
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
                  <span className="badge bg-success">Active</span>
                </td>
                <td>01/02/2024</td>
                <td>
                  <div className="d-flex justify-content-between">
                    <Button variant="link">
                      <img src="/img/Bell.svg" alt="Edit" />
                    </Button>
                    <Button variant="link">
                      <img src="/img/Bell.svg" alt="Delete" />
                    </Button>
                    <Button variant="link">
                      <img src="/img/Bell.svg" alt="View" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className={`${h.paginationWrapper}`}>
        <Pagination className={h.pagination}>
          <Pagination.Prev>«</Pagination.Prev>
          {Array(7)
            .fill(null)
            .map((_, idx) => (
              <Pagination.Item key={idx} active={idx === 0}>
                {idx + 1}
              </Pagination.Item>
            ))}
          <Pagination.Next>»</Pagination.Next>
        </Pagination>
      </div>
    </Container>
  );
};

export default Article;
