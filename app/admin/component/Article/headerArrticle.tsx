'use client'

import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import h from "./articel.module.css";
import Article from "./article";

interface Post {
  post_id: number;
  title_post: string;
  content_post: string;
  img_post: string;
  views_post: number;
  category_id: number;
  created_at: string;
  updated_at: string;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T[];
}
interface PostProps {
  postData: ApiResponse<Post> | null;
}


export const HeaderArticle: React.FC = () => {

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  const token = getCookie('token');

  const [postData, setPostData] = useState<ApiResponse<Post> | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedViews, setSelectedViews] = useState<string>('');
  const [selectedDiscount, setSelectedDiscount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/allPost/')
      .then(res => res.json())
      .then(data => {
        setPostData(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false);
      });
  }, [token]);

  const filteredPost = postData?.data?.filter(post => {
    // const matchStatus = selectedStatus ? post.updated_at === selectedStatus : true;
    const matchViews = selectedViews === '1' ? post.views_post <= 100 : selectedViews === '2' ? post.views_post > 1000 : true;
    return matchViews;
  }) || [];

  const array: ApiResponse<Post> = {
    status: postData?.status ?? '',
    message: postData?.message ?? '',
    data: filteredPost
  };

  const handleReset = () => {
    // setSelectedStatus('')
    setSelectedViews('')
  }

  return (
    <>
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
        <Row className={`${h.filterBar} justify-content-between align-items-center w-auto`}>
          <Col xs={12} sm={12} md={4} className={`${h.filterBar__group} w-auto`} >
            <Row className={`${h.filterBar__menu} bg-white d-flex align-items-center rounded-lg justify-content-between py-3 rounded-3`}>
              <Col xs="auto" className="d-flex justify-content-center align-items-center px-0">
                <img src="/img_admin/action.svg" alt="Action" />
              </Col>
              <Col xs="auto" className="d-flex justify-content-center align-items-center">
                <select aria-label="Trạng thái" className={`${h.formSelect}`}>
                  <option>Trạng thái</option>
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
                </select>
              </Col>
              <Col xs="auto" className="d-flex justify-content-center align-items-center">
                <select aria-label="Lượt xem" className={`${h.formSelect}`} value={selectedViews} onChange={(e) => setSelectedViews(e.target.value)}>
                  <option>Lượt xem</option>
                  <option value="1">0-100</option>
                  <option value="2">1000+</option>
                </select>
              </Col>
              <Col xs="auto" className="d-flex justify-content-center align-items-center" onClick={handleReset}>
                <img src="/img_admin/restart.svg" alt="Reset" />
                <span className="text-danger">Cài lại</span>
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={4} className="align-items-end d-flex justify-content-end mb-4 mb-md-0 mb-sm-0">
            <div className={`${h.searchInputGroup} `}>
              <Form.Control
                type="text"
                placeholder="Tìm kiếm bài viết"
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
      {loading ? (
        <Article postData={array} loading={true}></Article>
      ) : (
        <Article postData={array} loading={false}></Article>
      )}
    </>
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
