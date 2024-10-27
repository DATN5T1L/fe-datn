import React from "react";
import {
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import h from "./headerteacher.module.css";

export const HeaderTeacher = () => {
  return (
    <div className="mx-4 mx-xs-2 mx-sm-3">
      <div className={`d-flex justify-content-between align-items-center my-4`}>
        <h2 className={h.heading}>Giảng viên</h2>
      </div>

      <Row
        className={`${h.filterBar} justify-content-between align-items-center`}
      >
        <Col xs={4} sm={4} md={4} className="mb-4">
          <Row className="bg-white d-flex flex-row rounded-lg justify-content-between py-3 rounded-3">
            <Col
              xs={2}
              sm={2}
              md={1}
              className={`d-flex flex-row justify-content-center align-items-center  mb-4 mb-md-0 mb-sm-0 px-0`}
            >
              <img src="/img_admin/action.svg" alt="Action" />
            </Col>
            <Col
              xs={3}
              sm={2}
              md={2}
              className=" justify-content-center align-items-center d-flex mb-4 mb-md-0 mb-sm-0"
            >
              <select aria-label="Tuổi" className={`${h.formSelect} `}>
                <option>Tuổi  </option>
              </select>
            </Col>
            <Col xs={3} sm={2} md={4}>
              <div className="d-flex flex-row justify-content-center align-items-center mt-4 mt-md-0 mt-sm-0">
                <img src="/img_admin/restart.svg" alt="Reset" />
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
              placeholder="Tìm kiếm giảng viên"
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
    </div>
  );
};
