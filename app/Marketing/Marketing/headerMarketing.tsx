"use client";

import React from "react";
import {
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import h from "./marketing.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const HeaderMarketing = () => {
  const router = useRouter();

  return (
    <div className="mx-4 mx-xs-2 mx-sm-3">
      <div className={`d-flex justify-content-between align-items-center my-4`}>
        <h2 className={h.heading}>Bài viết</h2>

        <div className={`${h.actions} d-flex`}>
          <Button
            variant="outline-primary"
            className={`${h.btnCTA} ${h.btnCTAOutline} me-2`}
          >
            Thêm danh mục bài viết
          </Button>
          <Link href="/Marketing/MarketingPosts/AddPost">
          <Button
            className={`${h.btnCTA}`}
            onClick={() => {
              router.push("MarketingPosts/AddPost");
            }}
          >
            Thêm bài viết
          </Button>
          </Link>
        </div>
      </div>

      <Row
        className={`${h.filterBar} justify-content-between align-items-center`}
      >
        <Col xs={12} sm={12} md={8} className="mb-4">
          <Row className="bg-white d-flex flex-row rounded-lg justify-content-between py-3 rounded-3">
            <Col
              xs={6}
              sm={2}
              md={1}
              className={`d-flex flex-row justify-content-center align-items-center  mb-4 mb-md-0 mb-sm-0 px-0`}
            >
              <img src="/img_admin/action.svg" alt="Review khóa học Fullstack tại TTo" />
            </Col>
            <Col
              xs={6}
              sm={2}
              md={2}
              className=" justify-content-center align-items-center d-flex mb-4 mb-md-0 mb-sm-0"
            >
              <select aria-label="Trạng thái" className={`${h.formSelect} `}>
                <option>Trạng thái  </option>
                <option value="1">Active</option>
                <option value="2">Inactive</option>
              </select>
            </Col>

            <Col
              xs={6}
              sm={2}
              md={2}
              className=" justify-content-center align-items-center d-flex "
            >
              <select aria-label="Lượt xem" className={`${h.formSelect} `}>
                <option>Lượt xem  </option>
                <option value="1">0-100</option>
                <option value="2">1000+</option>
              </select>
            </Col>

            <Col
              xs={6}
              sm={2}
              md={2}
              className=" justify-content-center align-items-center d-flex"
            >
              <select aria-label="Lượt xem" className={`${h.formSelect} `}>
                <option>Giảm giá</option>
                <option value="1">0-100</option>
                <option value="2">1000+</option>
              </select>
            </Col>

            <Col xs={6} sm={2} md={3}>
              <div className="d-flex flex-row justify-content-center align-items-center mt-4 mt-md-0 mt-sm-0">
                <img src="/img_admin/restart.svg" alt="Review khóa học Fullstack tại TTo" />
                <span className="text-danger">  Cài lại</span>
              </div>
            </Col>
          </Row>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={4}
          className="align-items-end d-flex justify-content-end mb-4 mb-md-0 mb-sm-0"
        >
          <div className={`${h.searchInputGroup} `}>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm bài viết"
              // className={h.searchInput}
              className="w-100"
            />
            <div className={h.searchIconWrapper}>
              <img
                src="/img_admin/search.svg"
                alt="Review khóa học Fullstack tại TTo"
                width={"24px"}
                height={"24px"}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export const HeaderUsersSimple = () => {
  return (
    <div>
      <div
        className={`${h.header1} d-flex justify-content-between align-items-center`}
      >
        <h2 className={h.heading}>Bài viết</h2>

        <div className={`${h.actions} d-flex`}>
          <InputGroup className={h.searchInputGroup}>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm bài viết"
              className={h.searchInput}
            />
            <div className={h.searchIconWrapper}>
              <img
                src="/img_admin/search.svg"
                alt="Review khóa học Fullstack tại TTo"
                width={"24px"}
                height={"24px"}
              />
            </div>
          </InputGroup>
        </div>
      </div>
    </div>
  );
};
