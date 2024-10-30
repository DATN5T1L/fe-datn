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
      className={`d-flex flex-column flex-grow-1 align-items-start mx-4 mx-xs-2 mx-sm-3`}
    >
      {/* Post List */}
      <div className="d-flex overflow-auto w-100" style={{ whiteSpace: 'nowrap' }}>
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
                      className={`justify-content-between border d-flex py-2 rounded row mx-1`}
                    >
                      <Link href="/admin/ArticlePage/1" className="w border-end justify-content-center align-item-center d-flex col-6">
                        <img src="/img_admin/action1.svg" alt="Edit" />
                      </Link>
                      <Link href={`ArticlePage?id=${1}`} as={`ArticlePage/${1}`} className="w-30 border-end justify-content-center align-item-center d-flex col-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="green" className="bi bi-check-circle" viewBox="0 0 16 16">
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
