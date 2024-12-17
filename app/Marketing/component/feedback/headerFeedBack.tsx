import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import h from "./article.module.css";

export const HeaderFeedBack= () => {
  return (
    <div className="mx-4 mx-xs-2 mx-sm-3">
      <div
        className={`d-flex justify-content-between align-items-center my-4 flex-wrap`}
      >
        <div className="col-12 col-md-6">
          <h2 className={h.heading}>Bài Viết</h2> 
        </div>

        <CommentsSearchBar />
      </div>
      <div className="mb-4">
      </div>
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

const CommentsSearchBar = () => {
  return (
    <div className={`input-group mb-3 ${h.searchBar}`}>
      <input
        placeholder="Tìm kiếm bài viết"
        type="text"
        className={`${h.searchText} form-control rounded-start-5 border-end-0 p-2`}
      />
      <div>
        <span
          className="input-group-text bg-white border-start-0 rounded-end-5 rounded-start-0 py-0-2"
          id="inputGroup-sizing-default"
        >
          {/* Search icon start */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="19"
            viewBox="0 0 16 12"
            fill="none"
          >
            <g clipPath="url(#clip0_3435_8010)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.75 1.375C3.33375 1.375 1.375 3.33375 1.375 5.75C1.375 8.16625 3.33375 10.125 5.75 10.125C8.16625 10.125 10.125 8.16625 10.125 5.75C10.125 3.33375 8.16625 1.375 5.75 1.375ZM0.625 5.75C0.625 2.91954 2.91954 0.625 5.75 0.625C8.58046 0.625 10.875 2.91954 10.875 5.75C10.875 7.03026 10.4056 8.20087 9.62943 9.0991L11.2652 10.7348C11.4116 10.8813 11.4116 11.1187 11.2652 11.2652C11.1187 11.4116 10.8813 11.4116 10.7348 11.2652L9.0991 9.62943C8.20087 10.4056 7.03026 10.875 5.75 10.875C2.91954 10.875 0.625 8.58046 0.625 5.75Z"
                fill="#999999"
              />
            </g>
            <defs>
              <clipPath id="clip0_3435_8010">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {/* Search icon end */}
        </span>
      </div>
    </div>
  );
};
