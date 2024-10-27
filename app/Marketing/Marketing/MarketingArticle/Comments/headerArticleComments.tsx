import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import h from "../article.module.css";

export const HeaderMarketingArticleComments = () => {
  return (
    <div className="mx-4 mx-xs-2 mx-sm-3">
      <div
        className={`d-flex justify-content-between align-items-center my-4 flex-wrap`}
      >
        <div className="col-12 col-md-6">
          <h2 className={h.heading}>Bình luận</h2>
        </div>
        {/* <div>
          <CommentsSearchBar />
        </div> */}
      </div>
      {/* <div className="d-flex align-items-center mb-4 gap-3">
        <svg
          width="242"
          height="48"
          viewBox="0 0 242 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="241"
            height="47"
            rx="7.5"
            fill="#F5F6FA"
          />
          <rect
            x="0.5"
            y="0.5"
            width="241"
            height="47"
            rx="7.5"
            stroke="#F2F2F2"
          />
          <path
            d="M21.67 29.14C20.858 29.14 20.144 28.9907 19.528 28.692C18.912 28.384 18.3987 27.978 17.988 27.474C17.5867 26.9607 17.2833 26.3913 17.078 25.766C16.8727 25.1313 16.77 24.4827 16.77 23.82C16.77 23.1573 16.8727 22.5087 17.078 21.874C17.2833 21.2393 17.5867 20.67 17.988 20.166C18.3987 19.6527 18.912 19.2467 19.528 18.948C20.144 18.6493 20.858 18.5 21.67 18.5C22.342 18.5 22.916 18.5887 23.392 18.766C23.8773 18.934 24.2787 19.1533 24.596 19.424C24.9227 19.6947 25.184 19.984 25.38 20.292C25.5853 20.6 25.7347 20.8893 25.828 21.16C25.9307 21.4307 25.996 21.6547 26.024 21.832C26.0613 22 26.08 22.084 26.08 22.084H24.708C24.708 22.084 24.6893 22.0093 24.652 21.86C24.6147 21.7013 24.54 21.51 24.428 21.286C24.316 21.0527 24.148 20.8193 23.924 20.586C23.7 20.3527 23.406 20.1613 23.042 20.012C22.678 19.8533 22.2253 19.774 21.684 19.774C21.096 19.774 20.5827 19.8907 20.144 20.124C19.7053 20.348 19.3367 20.656 19.038 21.048C18.7487 21.4307 18.5293 21.8647 18.38 22.35C18.24 22.826 18.17 23.316 18.17 23.82C18.17 24.324 18.24 24.8187 18.38 25.304C18.5293 25.78 18.7487 26.214 19.038 26.606C19.3367 26.9887 19.7053 27.2967 20.144 27.53C20.5827 27.754 21.096 27.866 21.684 27.866C22.2253 27.866 22.678 27.7867 23.042 27.628C23.406 27.4693 23.7 27.278 23.924 27.054C24.148 26.8207 24.316 26.592 24.428 26.368C24.54 26.1347 24.6147 25.9387 24.652 25.78C24.6893 25.6213 24.708 25.542 24.708 25.542H26.08C26.08 25.542 26.0613 25.6307 26.024 25.808C25.996 25.976 25.9307 26.2 25.828 26.48C25.7347 26.7507 25.5853 27.04 25.38 27.348C25.184 27.6467 24.9227 27.936 24.596 28.216C24.2787 28.4867 23.8773 28.7107 23.392 28.888C22.916 29.056 22.342 29.14 21.67 29.14ZM27.9755 29V18.36H29.3055V22.658H29.3895C29.4548 22.546 29.5621 22.392 29.7115 22.196C29.8701 22 30.0941 21.8273 30.3835 21.678C30.6728 21.5193 31.0368 21.44 31.4755 21.44C32.0168 21.44 32.4788 21.566 32.8615 21.818C33.2441 22.0607 33.5335 22.392 33.7295 22.812C33.9348 23.232 34.0375 23.7033 34.0375 24.226V29H32.7075V24.31C32.7075 23.8153 32.5675 23.4047 32.2875 23.078C32.0168 22.7513 31.6201 22.588 31.0975 22.588C30.6775 22.588 30.3368 22.6953 30.0755 22.91C29.8141 23.1153 29.6181 23.3907 29.4875 23.736C29.3661 24.072 29.3055 24.4313 29.3055 24.814V29H27.9755ZM39.5816 29.14C38.7882 29.14 38.1209 28.958 37.5796 28.594C37.0382 28.2207 36.6276 27.74 36.3476 27.152C36.0676 26.564 35.9276 25.9433 35.9276 25.29C35.9276 24.6273 36.0676 24.0067 36.3476 23.428C36.6276 22.84 37.0382 22.364 37.5796 22C38.1209 21.6267 38.7882 21.44 39.5816 21.44C40.3749 21.44 41.0422 21.6267 41.5836 22C42.1249 22.364 42.5356 22.84 42.8156 23.428C43.0956 24.0067 43.2356 24.6273 43.2356 25.29C43.2356 25.9433 43.0956 26.564 42.8156 27.152C42.5356 27.74 42.1249 28.2207 41.5836 28.594C41.0422 28.958 40.3749 29.14 39.5816 29.14ZM39.5816 27.978C40.0856 27.978 40.5056 27.852 40.8416 27.6C41.1869 27.3387 41.4436 27.0027 41.6116 26.592C41.7889 26.1813 41.8776 25.7473 41.8776 25.29C41.8776 24.8233 41.7889 24.3893 41.6116 23.988C41.4436 23.5773 41.1869 23.246 40.8416 22.994C40.5056 22.7327 40.0856 22.602 39.5816 22.602C39.0869 22.602 38.6669 22.7327 38.3216 22.994C37.9762 23.246 37.7149 23.5773 37.5376 23.988C37.3696 24.3893 37.2856 24.8233 37.2856 25.29C37.2856 25.7473 37.3696 26.1813 37.5376 26.592C37.7149 27.0027 37.9762 27.3387 38.3216 27.6C38.6669 27.852 39.0869 27.978 39.5816 27.978ZM39.5816 32.178C39.3202 32.178 39.1009 32.0847 38.9236 31.898C38.7556 31.7207 38.6716 31.5107 38.6716 31.268C38.6716 31.016 38.7556 30.8013 38.9236 30.624C39.1009 30.4467 39.3202 30.358 39.5816 30.358C39.8429 30.358 40.0576 30.4467 40.2256 30.624C40.4029 30.8013 40.4916 31.016 40.4916 31.268C40.4916 31.52 40.4029 31.7347 40.2256 31.912C40.0576 32.0893 39.8429 32.178 39.5816 32.178ZM45.1304 29V21.58H46.4604V22.658H46.5444C46.6097 22.546 46.7171 22.392 46.8664 22.196C47.0251 22 47.2491 21.8273 47.5384 21.678C47.8277 21.5193 48.1917 21.44 48.6304 21.44C49.1717 21.44 49.6337 21.566 50.0164 21.818C50.3991 22.0607 50.6884 22.392 50.8844 22.812C51.0897 23.232 51.1924 23.7033 51.1924 24.226V29H49.8624V24.31C49.8624 23.8153 49.7224 23.4047 49.4424 23.078C49.1717 22.7513 48.7751 22.588 48.2524 22.588C47.8324 22.588 47.4917 22.6953 47.2304 22.91C46.9691 23.1153 46.7731 23.3907 46.6424 23.736C46.5211 24.072 46.4604 24.4313 46.4604 24.814V29H45.1304Z"
            fill="#999999"
          />
          <path
            d="M221 21L214 27L207 21"
            stroke="#4D4D4D"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <Button className={`${h.btnCTA} ${h.btnApprove}`}>
          Đồng ý
        </Button>
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

const CommentsSearchBar = () => {
  return (
    <div className="input-group mb-3">
      <input
        placeholder="Tìm kiếm bài viết"
        type="text"
        className="form-control rounded-start-5 border-end-0 p-2"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
      />
      <div>
        <span
          className="input-group-text bg-white border-start-0 rounded-end-5 rounded-end-0 p-2"
          id="inputGroup-sizing-default"
        >
          {/* Search icon start */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 12 12"
            fill="none"
          >
            <g clip-path="url(#clip0_3435_8010)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
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
