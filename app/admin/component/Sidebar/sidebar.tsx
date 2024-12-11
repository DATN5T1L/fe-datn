

import React from "react";
import { Col, Dropdown, Nav } from "react-bootstrap";
import h from "../Sidebar/sidebar.module.css";
import Link from "next/link";
import MenuDrop from "../MenuDrop"
import { IconCourse, IconUser, IconPost, IconOut, IconDasd, IconRoll } from "@app/(user-global)/component/icon/icons"
const Sidebar: React.FC = () => {

  const dropdownCourse = [
    { href: "/admin/CoursePage", label: "Khóa học miễn phí" },
    { href: "/giangvien/CoursePage", label: "Khóa học có phí" }
  ];

  const dropdownUser = [
    { href: "/admin/UsersPage", label: "Học viên" },
    { href: "/admin/ArticlePage", label: "Quảng trị viên" }
  ];

  const dropdownPost = [
    { href: "/admin/ArticlePage", label: "Học viên" },
    { href: "/admin/ArticlePage", label: "Quảng trị viên" },
    { href: "/admin/ArticlePage", label: "Bình luận" },
  ];

  const dropdownRoll = [
    { href: "/admin/AccessPage", label: "Danh sách quyền truy cập" },
    { href: "/admin/CreateAccess", label: "Tạo mới quyền truy cập" },
    { href: "/admin", label: "Admin" },
    { href: "/accountant", label: "Kế toán" },
    { href: "/Marketing", label: "Marketing" },
    { href: "/giangvien", label: "Giảng viên" },
  ];

  return (
    <Nav className={` ${h.sidebar} `}>

      <Link href={"/admin"}>
        <Nav.Item className={`${h.navItem} mb-3`}>
          <IconDasd />
          <span className={h.itemTitle}>Dashboard</span>
        </Nav.Item>
      </Link>
      <div className={h.Menu}>
        <MenuDrop
          icon={<IconCourse />}
          title=" Khóa Học"
          items={dropdownCourse}
        />
        <MenuDrop
          icon={<IconUser />}
          title="Người dùng"
          items={dropdownUser}
        />
        <MenuDrop
          icon={<IconPost />}
          title="Bài viết"
          items={dropdownPost}
        />
        <MenuDrop
          icon={<IconRoll />}
          title="Quyền truy cập"
          items={dropdownRoll}
        />
      </div>
      <Nav.Item className={`${h.navbottom} mb-3`}>
        <IconOut />
        <span className={h.itemTitle}>Thoát</span>
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;