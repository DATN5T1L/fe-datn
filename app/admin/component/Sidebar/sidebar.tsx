"use client";

import React from "react";
import { Col, Nav } from "react-bootstrap";
import h from "../Sidebar/sidebar.module.css"; // Import the CSS module

const Sidebar: React.FC = () => {
  return (
    <Col md={2} className={h.sidebar}>
      <Nav className="flex-column">
        <Nav.Item className={`${h.navItem} mb-3`}>
          <img src="/img/dashbord.svg" alt="Dashboard" />
          <span className={h.itemTitle}>Dashboard</span>
        </Nav.Item>
        <Nav.Item className={`${h.navItem} mb-3`}>
          <img src="/img/post.svg" alt="Posts" />
          <span className={h.itemTitle}>Bài viết</span>
        </Nav.Item>
        <Nav.Item className={`${h.navItem} mb-3`}>
          <img src="/img_admin/cmt.svg" alt="Comments" />
          <span className={h.itemTitle}>Bình luận</span>
        </Nav.Item>
        <Nav.Item className={`${h.navItem} mb-3`}>
          <img src="/img_admin/admin12.svg" alt="Categories" />
          <span className={h.itemTitle}>Danh mục</span>
        </Nav.Item>
      </Nav>
    </Col>
  );
};

export default Sidebar;
