"use client";

import React, { FC, useEffect, useState } from "react";
import {
  Table,
  Pagination,
} from "react-bootstrap";
import h from "./users.module.css";
import Link from "next/link";
import "./users.css";
import useFormatDate from "@/app/(user-global)/component/globalControl/useFormatDate";
import ReactLoading from 'react-loading';

interface User {
  id: string | number;
  fullname: string;
  email: string;
  phonenumber: string;
  created_at: string;
  role: string;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T[];
}

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

const Users: React.FC = () => {

  const token = getCookie('token')

  const [userData, setUserData] = useState<ApiResponse<User> | null>(null)
  const [isLoading, setIsloading] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [searchTerm, setSearchTerm] = useState<string>(""); // Giá trị tìm kiếm
  const [filterRole, setFilterRole] = useState<string>("all");
  useEffect(() => {
    setIsloading(true)
    if (token) {
      fetch(`/api/allUser/client`, {
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setUserData(data)
          setIsloading(false)
        })
        .catch(error => {
          setIsloading(false)
          console.log(error);

        })
    }
  }, [token])


  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // const currentUsers =
  //   userData?.data && Array.isArray(userData.data)
  //     ? userData.data.slice(indexOfFirstUser, indexOfLastUser)
  //     : [];


  const renderPaginationItems = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      pageNumbers.push(
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => setCurrentPage(1)}
        >
          1
        </Pagination.Item>
      );

      if (currentPage > 3) {
        pageNumbers.push(<Pagination.Ellipsis key="start-ellipsis" />);
      }

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pageNumbers.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </Pagination.Item>
        );
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(<Pagination.Ellipsis key="end-ellipsis" />);
      }

      pageNumbers.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }
    return pageNumbers;
  };

  const filteredUsers = userData?.data.filter((user) => {
    const fullname = user.fullname || ""; // Nếu null thì gán chuỗi rỗng
    const email = user.email || ""; // Nếu null thì gán chuỗi rỗng

    const matchesSearch =
      fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      filterRole === "all" || user.role.toLowerCase() === filterRole;

    return matchesSearch && matchesRole;
  }) || [];

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);


  return (
    <div
      className={`${h.container} d-flex flex-column flex-grow-1 align-items-start`}
    >
      <div className="d-flex justify-content-between w-100 mb-3">
        {/* Ô tìm kiếm */}
        <input
          type="text"
          className="form-control w-50 me-3"
          placeholder="Tìm kiếm theo tên hoặc email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Dropdown lọc vai trò */}
        <select
          className="form-select w-25"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">Tất cả vai trò</option>
          <option value="client">Học viên</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="d-flex overflow-auto w-100" style={{ whiteSpace: 'nowrap' }}>
        <Table id="cssTable" bordered hover className={`${h.table}`}>
          <thead>
            <tr>
              <td>Tên</td>
              <td>Email</td>
              <td>Số điện thoại</td>
              <td>Vai trò</td>
              <td>Ngày đăng kí</td>
              <td>Trạng thái</td>
              <td>Hành động</td>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((item, index) => (
              <tr key={index}>
                <td>{item.fullname}</td>
                <td>{item.email}</td>
                <td>{item.phonenumber ? item.phonenumber : 'Chưa thêm số'}</td>
                <td>{item.role === 'client' ? 'Học viên' : 'Admin'}</td>
                <td>{useFormatDate(item.created_at)}</td>
                <td>
                  <span className={h.active_text}>Active</span>
                </td>
                <td className={h.option_button_group}>
                  {/* Hành động */}
                  <div className={`justify-content-between border d-flex py-2`}>
                    <Link href={`/admin/UsersPage/${item.id}`} className="w-50 border-end">
                      <img src="/img_admin/action1.svg" alt="Action 1" />
                    </Link>
                    <Link href={`/admin/UsersPage/${item.id}`} className="w-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="" className="bi bi-eye" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                      </svg>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </Table>
      </div>

      {/* Pagination */}
      <div className="paginationWrapper">
        <Pagination>
          <Pagination.Prev onClick={handlePrevPage} />
          {renderPaginationItems()}
          <Pagination.Next onClick={handleNextPage} />
        </Pagination>
      </div>
    </div>
  );
};

export default Users;