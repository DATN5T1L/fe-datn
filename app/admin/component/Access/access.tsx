"use client";

import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Table,
  Pagination,
  Container,
} from "react-bootstrap";
import h from "./access.module.css";
import Link from "next/link";
import "./access.css";
import ReactLoading from 'react-loading';

interface Role {
  user_id: number;
  fullname: string;
  email: string;
  role: string;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T[];
}

const Access: React.FC<{}> = () => {

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  const token = getCookie('token');

  const [roleData, setRoleData] = useState<ApiResponse<Role> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/allRole/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        setRoleData(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false);
      });
  }, [token]);


  const [currentPage, setCurrentPage] = useState(1);
  const rolePerPage = 5;
  const totalPages = Math.ceil((roleData?.data.length || 0) / rolePerPage);

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

  const indexOfLastUser = currentPage * rolePerPage;
  const indexOfFirstUser = indexOfLastUser - rolePerPage;
  const currentRole =
    roleData?.data && Array.isArray(roleData.data)
      ? roleData.data.slice(indexOfFirstUser, indexOfLastUser)
      : [];

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


  return (
    <div
      className={`d-flex flex-column flex-grow-1 align-items-start mx-4 mx-xs-2 mx-sm-3`}
    >
      <div className="d-flex overflow-auto w-100" style={{ whiteSpace: 'nowrap' }}>
        <Table bordered hover className={`${h.table}`}>
          <thead>
            <tr>
              <td>Id</td>
              <td>Người dùng</td>
              <td>Email</td>
              <td>Vai trò</td>
              <td>Hành động</td>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={5}>
                  <ReactLoading type={"bubbles"} color={'rgba(153, 153, 153, 1)'} height={'10%'} width={'10%'} className={h.align} />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {currentRole.map((item) => (
                <tr key={item.user_id}>
                  <td>{item.user_id}</td>
                  <td>
                    {item.fullname}
                  </td>
                  <td>{item.email}</td>
                  <td>
                    <span
                      className={`
                      ${item.role === 'admin' ?
                          h.active_text : item.role === 'instructor' ?
                            h.active_text1 : item.role === 'creator' ? h.active_text2
                              : h.active_text3
                        } `}
                    >{item.role}</span>
                  </td>

                  <td className={h.option_button_group}>
                    <div
                      className={`justify-content-between border d-flex py-2 rounded row mx-1`}
                    >
                      <Link href={`AccessPage?id=${1}`} as={`AccessPage/${1}`} className="w border-end justify-content-center align-item-center d-flex col-4">
                        <img src="/img_admin/action2.svg" alt="Delete" />
                      </Link>
                      <Link href="/#!" className="w-30 border-end justify-content-center align-item-center d-flex col-4">
                        <img src="/img_admin/action3.svg" alt="Delete" />
                      </Link>
                      <Link href="/#!" className="w-30 justify-content-center align-item-center d-flex col-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="orange" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                        </svg>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
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

export default Access;
