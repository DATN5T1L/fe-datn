
'use client'
import React, { useState } from "react";
import { Col, Dropdown, Nav } from "react-bootstrap";
import h from "../Sidebar/sidebar.module.css";
import Link from "next/link";
import MenuDrop from "../MenuDrop"
import { IconCourse, IconUser, IconPost, IconOut, IconDasd, IconRoll } from "@app/(user-global)/component/icon/icons"
const Sidebar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleToggle = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };
  const dropdownCourse = [
    { href: "/admin/CoursePage", label: "Khóa học miễn phí" },
    { href: "/giangvien/CoursePage", label: "Khóa học có phí" }
  ];

  const dropdownUser = [
    { href: "/admin/UsersPage", label: "Học viên" },
    { href: "/admin/AccessPage", label: "Quản trị viên" }
  ];

  const dropdownPost = [
    { href: "/admin/ArticlePage", label: "Bài viết" },
    { href: "/admin/ArticlePage", label: "Bình luận" },
  ];

  const dropdownRoll = [
    { href: "/admin/AccessPage", label: "Danh sách quyền truy cập" },
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
          isOpen={openMenu === "course"}
          onToggle={() => handleToggle("course")}
        />
        <MenuDrop
          icon={<IconUser />}
          title="Người dùng"
          items={dropdownUser}
          isOpen={openMenu === "user"}
          onToggle={() => handleToggle("user")}
        />
        <MenuDrop
          icon={<IconPost />}
          title="Bài viết"
          items={dropdownPost}
          isOpen={openMenu === "Marketing"}
          onToggle={() => handleToggle("Marketing")}
        />
        <MenuDrop
          icon={<IconRoll />}
          title="Quyền truy cập"
          items={dropdownRoll}
          isOpen={openMenu === "Roll"}
          onToggle={() => handleToggle("Roll")}
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