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
import h from "./articel.module.css";
import Link from "next/link";
import "./articel.css";
import header from "@/app/(user-global)/component/globalControl/header";

const Article: React.FC<{}> = () => {
  return (
    <div
      className={`${h.container} d-flex flex-column flex-grow-1 align-items-start`}
    >
      {/* Header */}
      {/* <div
        className={`${h.header} d-flex justify-content-between align-items-center`}
      >
        <h2 className={h.heading}>Bài viết</h2>
        {showActions && (
          <div className={`${h.actions} d-flex`}>
            <Button
              variant="outline-primary"
              className={`${h.btnCTA} ${h.btnCTAOutline} me-2`}
            >
              Thêm danh mục bài viết
            </Button>
            <Button className={`${h.btnCTA}`}>Thêm bài viết</Button>
          </div>
        )}
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
      </div> */}

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
                <td>
                  Được định hình là dự án đô thị cao cấp, sau gần 30 năm, dự án
                  Sing - Việt ở huyện Bình Chánh chỉ là bãi đất trống, nhà cửa
                  lụp xụp, ảnh hưởng khoảng 700 hộ dân. Giữa trưa, căn nhà vách
                  gỗ, lợp tôn cất trên mảnh đất hơn 200 m2 của ông Đặng Văn Sáu,
                  64 tuổi, ở mặt tiền đường Mai Bá Hương, xã Lê Minh Xuân, huyện
                  Bình Chánh, nóng hầm hập. Lô đất thuộc diện giải tỏa để làm dự
                  án khu đô thị Sing - Việt nên ngôi nhà gần 70 m2 của ông không
                  thể xây kiên cố mà chỉ dựng tạm bợ, sửa chắp vá gần 30 năm
                  qua, ảnh hưởng 5 thành viên trong gia đình.
                </td>
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

export default Article;
