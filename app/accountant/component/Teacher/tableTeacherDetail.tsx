"use client";

import React, { FC } from "react";
import { Button, Image, Card } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import h from "./tableTeacher.module.css";
import Link from "next/link";

const TeacherDetailPage: React.FC<{}> = () => {
  return (
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
              <td>Tên khóa học</td>
              <td>Giá</td>
              <td>Số lượng</td>
              <td>Giá</td>
              <td>Ngày</td>
            </tr>
          </thead>
          <tbody>
            {Array(8)
              .fill(null)
              .map((_, idx) => (
                <tr key={idx}>
                  <td>
                    <Image
                      src="/img_accountant/img_Course.png"
                      alt=""
                      width={155}
                      height={73}
                    />
                  </td>
                  <td>Website Design UI/UX</td>
                  <td>1.000.000</td>
                  <td>2</td>
                  <td>2.000.000</td>
                  <td>10/01/2024</td>
                </tr>
              ))}
            <tr>
              <td>Tổng tiền</td>
              <td></td>
              <td></td>
              <td></td>
              <td className={h.bold}>=8.000.000</td>
              <td>
                <div className={h.option_button}>
                  <Link href="#">
                    <div className={h.PrintBtn}>
                      <Image
                        src={"/img_accountant/print.svg"}
                        alt="icon"
                        width={24}
                        height={24}
                      />
                    </div>
                  </Link>
                  <Link href="#">
                    <Button>Gửi</Button>
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TeacherDetailPage;
