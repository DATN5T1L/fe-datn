"use client";

import React, { FC, useEffect, useMemo, useState } from "react";
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
  id: number | string;
  fullname: string;
  email: string;
  role: string;
  del_flag: boolean;
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
        console.log(data);

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

  const handleHiddenUser = async (id: number | string) => {
    try {
      const res = await fetch(`/api/hiddenUser/${id}`, {
        cache: "no-cache",
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      const data = await res.json();
      if (res.ok) {
        alert('Thay đổi trạng thái thành công')
        console.log(data);
        setRoleData((prevData) => {
          if (!prevData) return null;
          return {
            ...prevData,
            data: prevData.data.map((user: Role) =>
              user.id === id ? { ...user, del_flag: !user.del_flag } : user
            )
          }
        })
      }
      else {
        console.log(await res.json());
      }
    } catch (error) {
      console.error(error)
    }
  }

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
              {currentRole.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
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
                      <div onClick={() => handleHiddenUser(item.id)} className="w-30 border-end justify-content-center align-item-center d-flex col-4">
                        {item.del_flag ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="" className="bi bi-eye" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="" className="bi bi-eye-slash" viewBox="0 0 16 16">
                            <path d="M13.359 11.238A13.134 13.134 0 0 0 15 8s-3-5.5-8-5.5a7.654 7.654 0 0 0-2.66.483l.823.823A6.64 6.64 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457.56.56 1.023 1.203 1.35 1.743-.244.4-.544.854-.9 1.297l.741.741zM11.717 13.04l-.823-.823A6.64 6.64 0 0 1 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1 8a13.16 13.16 0 0 1 2.777-2.658L1.354 2.93a.5.5 0 1 1 .707-.707l12 12a.5.5 0 0 1-.707.707l-2.637-2.637zm-4.03-1.108a2.5 2.5 0 0 0 3.111-3.111l-3.11-3.111a2.5 2.5 0 0 0-3.112 3.112l3.111 3.11zm-2.287-5.62 1.385 1.386a1.5 1.5 0 0 1 1.718 1.718l1.386 1.385a2.5 2.5 0 0 0-4.49-4.49z" />
                          </svg>
                        )}
                      </div>
                      <Link href="/#!" className="w-30 justify-content-center align-item-center d-flex col-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="orange" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
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
