"use client";

import React from "react";
import { Nav } from "react-bootstrap";
import h from "../Sidebar/sidebar.module.css";
import Link from "next/link";
import { IconCourse, IconPost, IconOut, IconDasd, IconShoping } from "@app/(user-global)/component/icon/icons"
const Sidebar: React.FC = () => {
  return (
    <Nav className={` ${h.sidebar} `}>
      <Link href={"/accountant"}>
        <Nav.Item className={`${h.navItem} mb-3`}>
          <IconDasd />
          <span className={h.itemTitle}>Dashboard</span>
        </Nav.Item>
      </Link>

      <Link href={"/accountant/CoursePage"}>
        <Nav.Item className={`${h.navItem} mb-3`}>
          <IconCourse />
          <span className={h.itemTitle}>Thống kê Khóa học</span>
        </Nav.Item>
      </Link>
      <Link href={"/accountant/Order"}>
        <Nav.Item className={`${h.navItem} mb-3`}>
          <IconShoping />
          <span className={h.itemTitle}>Đơn mua</span>
        </Nav.Item>
      </Link>

      <Nav.Item className={`${h.navbottom} mb-3`}>
        <IconOut />
        <span className={h.itemTitle}>Thoát</span>
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;
