import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import h from "./articel.module.css";

export const HeaderArticle = () => {
  return (
    <div className="mx-4 mx-xs-2 mx-sm-3">
      <div
        className={`d-flex justify-content-between align-items-center my-4 flex-wrap`}
      >
        <div className="col-12 col-md-6">
          <h2 className={h.heading}>Bài viết</h2>
        </div>


        <div className={`col-12 col-md-6 flex-row d-flex justify-content-end`}>
          <Button
            variant="outline-primary"
            className={`${h.btnCTA} ${h.btnCTAOutline} me-2`}
          >
            Thêm danh mục bài viết
          </Button>
          <Button className={`${h.btnCTA}`}>Thêm bài viết</Button>
        </div>
      </div>
      <Row className={`${h.filterBar} justify-content-between align-items-center`}>
        <Col xs={12} sm={12} md={8} className="mb-4">
          <Row className="bg-white d-flex flex-row rounded-lg justify-content-between py-3 rounded-3">
            <Col xs={6} sm={2} md={1} className={`d-flex flex-row justify-content-center align-items-center  mb-4 mb-md-0 mb-sm-0 px-0`}>
              <img src="/img_admin/action.svg" alt="Action" />
            </Col>
            <Col xs={6} sm={2} md={3} className=" justify-content-center align-items-center d-flex mb-4 mb-md-0 mb-sm-0">
              <select aria-label="Trạng thái" className={`${h.formSelect} `}>
                <option>Trạng thái  </option>
                <option value="1">Active</option>
                <option value="2">Inactive</option>
              </select>
            </Col>


            <Col xs={6} sm={2} md={3} className=" justify-content-center align-items-center d-flex">
              <select aria-label="Lượt xem" className={`${h.formSelect} `}>
                <option>Lượt xem  </option>
                <option value="1">0-100</option>
                <option value="2">1000+</option>
              </select>
            </Col>


            <Col xs={6} sm={2} md={3}>
              <div className="d-flex flex-row justify-content-center align-items-center">
                <img src="/img_admin/restart.svg" alt="Reset" />
                <span className="text-danger">  Cài lại</span>
              </div>
            </Col>

          </Row>

        </Col>

        <Col xs={12} sm={12} md={4} className="align-items-end d-flex justify-content-end mb-4 mb-md-0 mb-sm-0">
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
                alt="Search"
                width={"24px"}
                height={"24px"}
              />
            </div>
          </div>
        </Col>

      </Row>
      {/* <div
        className={`${h.filterBar} d-flex justify-content-between align-items-center`}
      >
        <InputGroup className={`${h.filterInputGroup} d-flex flex-row w-100 w-md-80`}>
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
    </div>
  );
};

export const HeaderArticleSimple = () => {
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
                alt="Search"
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
