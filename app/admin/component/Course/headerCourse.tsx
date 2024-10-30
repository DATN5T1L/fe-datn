import React from "react";
import {
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import h from "./course.module.css";

export const HeaderCourse = () => {
  return (
    <div className="mx-4 mx-xs-2 mx-sm-3">
      <div className={`d-flex justify-content-between align-items-center my-4`}>
        <h2 className={h.heading}>Quản lý khóa học</h2>

        {/* <div className={`${h.actions} d-flex`}>
          <Button
            variant="outline-primary"
            className={`${h.btnCTA} ${h.btnCTAOutline} me-2`}
          >
            Thêm danh mục bài viết
          </Button>
          <Button className={`${h.btnCTA}`}>Thêm bài viết</Button>
        </div> */}
      </div>

      <div className="d-flex align-items-center justify-content-between mx-3">
        <div className="d-flex mb-4">
          <img
            src="/img_admin/action.svg"
            className="bg-white border-end p-4 rounded-start-4"
            alt="Action"
          />
          <div className="bg-white border-end p-4">
            <select
              aria-label="Lượt xem"
              className={`${h.formSelect} bg-transparent`}
            >
              <option>Lượt xem  </option>
              <option value="1">{"<1k"}</option>
              <option value="2">{">1k"}</option>
            </select>
          </div>
          <div className="bg-white border-end p-4">
            <select
              aria-label="Trạng thái"
              className={`${h.formSelect} bg-transparent`}
            >
              <option>Trạng thái  </option>
              <option value="1">Active</option>
              <option value="2">Inactive</option>
            </select>
          </div>
          <div className="bg-white border-end p-4">
            <select
              aria-label="Trạng thái"
              className={`${h.formSelect} bg-transparent`}
            >
              <option>Giảm giá  </option>
              <option value="1">{">5%"}</option>
              <option value="2">{">10%"}</option>
            </select>
          </div>
          <div className="bg-white p-4 d-inline-flex align-items-center rounded-end-4">
            <img src="/img_admin/restart.svg" alt="Reset" />
            <span className="text-danger">  Cài lại</span>
          </div>
        </div>
      </div>

      {/* <div
        className={`${h.filterBar} d-flex row justify-content-between align-items-center`}
      >
        <InputGroup className={`${h.filterInputGroup} col-12`}>
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

        <InputGroup className={`${h.searchInputGroup} col-6`}>
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
