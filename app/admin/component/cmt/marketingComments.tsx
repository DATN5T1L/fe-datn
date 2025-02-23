"use client";

import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Pagination,
  Container,
  Card,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import h from "./article.module.css";
import Link from "next/link";
import "./article.css";
import header from "@/app/(user-global)/component/globalControl/header";
import { useRouter } from "next/navigation";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import useFormatDate from "@/app/(user-global)/component/globalControl/useFormatDate";

interface Comment {
  id: string;
  comment_title: string;
  comment_text: string;
  del_flag: boolean;
  post_id: string;
  user_id: string;
  comment_to: string | null;
  created_at: string;
  updated_at: string;
  fullname: string;
}

const Comments: React.FC<{}> = () => {
  const router = useRouter();
  const [dataCmt, SetDataCmt] = useState<Comment[]>([])
  const token = useCookie('token')
  const [currentPage, setCurrentPage] = useState(1)
  const catePerPage = 5;

  console.log(dataCmt);


  useEffect(() => {
    if (token) {
      fetch(`/api/allComment/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data) {
            console.log(data);

            SetDataCmt(data.data)
          }
        })
        .catch(error => {
          console.error('Có lỗi xảy ra: ', error);

        })
    }
  }, [token])

  const totalPages = Math.ceil((dataCmt?.length || 0) / catePerPage)
  const indexOfLastCate = currentPage * catePerPage;
  const indexOfFirstCate = indexOfLastCate - catePerPage;
  const currentData =
    dataCmt && Array.isArray(dataCmt)
      ? dataCmt?.slice(indexOfFirstCate, indexOfLastCate)
      : [];


  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }, [currentPage, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }, [currentPage]);

  useLayoutEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage, setCurrentPage]);

  const renderPaginationItems = useMemo(() => {
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
  }, [totalPages, currentPage]);

  const handleHidden = (id: string, idPost: string) => {
    if (id && idPost && token) {
      if (confirm('Bạn có muốn thay đổi trạng thái bình luận hay không?')) {
        fetch(`/api/hiddenCmtPost/${idPost}/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            SetDataCmt((prev) =>
              prev.map((cmt) =>
                cmt.id === id
                  ? { ...cmt, del_flag: !cmt.del_flag }
                  : cmt
              )
            );
            alert(data.message);
          })
          .catch(error => {
            console.error('Có lỗi xảy ra khi ẩn bình luận:', error);
          });
      }
    }
  };



  return (
    <div
      className={`d-flex flex-column flex-grow-1 align-items-start mx-4 mx-xs-2 mx-sm-3`}
    >
      <div className={`d-flex justify-content-between align-items-center my-4`}>
        <h2 className={h.heading}>Phản hồi</h2>

        <div className={`${h.actions} d-flex`}>
        </div>
      </div>
      <div
        className="d-flex overflow-auto w-100"
        style={{ whiteSpace: "nowrap" }}
      >
        <Table
          id="cssTable"
          bordered
          hover
          className={`${h.table} table-responsive`}
        >
          <thead>
            <tr>
              <td>ID</td>
              <td>Bình luận</td>
              <td>Người bình luận</td>
              <td>Ngày đăng</td>
              <td className="text-center">Trạng thái</td>
              <td>Hành động</td>
            </tr>
          </thead>
          <tbody>
            {currentData && currentData?.map((item, idx) => (
              <tr
                key={idx}
              >
                <td>{idx + 1}</td>
                <td>{item.comment_text}</td>
                <td>
                  {item.fullname}
                </td>
                <td>{useFormatDate(item.created_at)}</td>
                <td className="text-center">
                  {item.del_flag ? (
                    <span className={h.active_text}>Bình thường</span>
                  ) : (
                    <span className={h.rejected_text}>Đã ẩn</span>
                  )}
                </td>
                <td className={h.option_button_group}>
                  <div
                    className={`d-flex justify-content-evenly border py-2 rounded`}
                    onClick={() => handleHidden(item.id, item.post_id)}
                  >
                    {item.del_flag ? (
                      <img src="/img/action.svg" alt="Ẩn" />
                    ) : (
                      <img src="/img/hiddenEye.svg" alt="hiện" />
                    )}

                    {/* <div className="border border-start" />
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.0703 22C17.5932 22 22.0703 17.5228 22.0703 12C22.0703 6.47715 17.5932 2 12.0703 2C6.54747 2 2.07031 6.47715 2.07031 12C2.07031 13.5997 2.44593 15.1116 3.11378 16.4525C3.29125 16.8088 3.35032 17.2161 3.24743 17.6006L2.65183 19.8267C2.39327 20.793 3.27733 21.677 4.24366 21.4185L6.4697 20.8229C6.85425 20.72 7.26152 20.7791 7.61784 20.9565C8.95868 21.6244 10.4706 22 12.0703 22Z"
                        stroke="#438FF7"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M9.07031 12.08L11.0703 14L15.0703 10"
                        stroke="#438FF7"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg> */}
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
          {renderPaginationItems}
          <Pagination.Next onClick={handleNextPage} />
        </Pagination>
      </div>
    </div>
  );
};

export default Comments;
