"use client";

import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Table,
  Pagination,
  Container,
} from "react-bootstrap";
import h from "./document.module.css";
import Link from "next/link";
import "./document.css";
import { useRouter, useSearchParams } from "next/navigation";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import useFormatDate from "@/app/(user-global)/component/globalControl/useFormatDate";

interface Document {
  id: string;
  name_document: string;
  serial_document: number;
  type_document: string;
  updated_at: string;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T[];
}

const ManagerDocumnet: React.FC = () => {
  const router = useRouter()
  const [documentData, setDocumnetData] = useState<ApiResponse<Document> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const token = useCookie('token');
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const nameChapter = searchParams.get('name')
  const [currentPage, setCurrentPage] = useState(1)
  const catePerPage = 5;

  console.log(id);


  useEffect(() => {
    if (token && id) {
      setLoading(true);
      fetch(`/api/allDocumentAdmin/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setDocumnetData(data)
          setLoading(false)
          console.log(data);
        })
        .catch(err => {
          console.log(err)
          setLoading(false);
        });
    }
  }, [token]);

  console.log(documentData);

  const totalPages = Math.ceil((documentData?.data.length || 0) / catePerPage)
  const indexOfLastCate = currentPage * catePerPage;
  const indexOfFirstCate = indexOfLastCate - catePerPage;
  const currentData =
    documentData?.data && Array.isArray(documentData.data)
      ? documentData.data.slice(indexOfFirstCate, indexOfLastCate)
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

  const handlePushAdd = () => {
    router.replace('/giangvien/Lesson/LessonAdd')
  }
  return (
    <div
      className={`${h.main} d-flex flex-column `}
    >
      <div
        className={`${h.header} d-flex justify-content-between align-items-center`}
      >
        <h2 className={h.heading}>Quản lý bài học</h2>

        <div className={`${h.actions} d-flex`}>
          <Button className={`${h.btnCTA}`} onClick={handlePushAdd}>Thêm bài học</Button>
        </div>
      </div>
      <div className={`${h.left_right}`}>
        <div className={h.left}>
          Chương: <span>{nameChapter}</span>
        </div>
        <div className={`${h.right} `}>
          <InputGroup className={h.searchInputGroup}>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm bài học"
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
      <div
        className={`${h.bodytable}d-flex overflow-auto w-100`}
        style={{ whiteSpace: "nowrap" }}
      >
        <Table bordered hover className={`${h.table}`}>
          <thead>
            <tr>
              <td className='text-lg-center w-auto'>Số thứ tự</td>
              <td className='text-lg-center'>Tên bài học</td>
              <td className='text-lg-center'>Dạng bài học</td>
              <td className='text-lg-center'>Ngày cập nhật</td>
              <td className='text-lg-center'>Hành động</td>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td className="text-lg-center w-auto">
                  {index + 1}
                </td>
                <td className="text-lg-center">{item.name_document}</td>
                <td className="text-center">
                  <span className={`text-lg-center ${h.active_text1}`}>{item.type_document}</span>
                </td>
                <td className="text-lg-center">{useFormatDate(item.updated_at)}</td>
                <td className={h.option_button_group}>
                  <div
                    className={` w-51 justify-content-between border d-flex py-2 rounded row mx-1`}
                  >
                    <Link
                      href="/giangvien/ChapterPage/ChapterDetail"
                      className="w border-end justify-content-center align-item-center d-flex col-4"
                    >
                      <img src="/img/actionDetail.svg" alt="Edit" />
                    </Link>
                    <Link
                      href={`ChapterPage?id=${1}`}
                      as={`ChapterPage/${1}`}
                      className="w border-end justify-content-center align-item-center d-flex col-4"
                    >
                      <img src="/img_admin/action2.svg" alt="Delete" />
                    </Link>
                    {/* <Link
                        href={`ChapterPage?id=${1}`}
                        as={`ChapterPage/${1}`}
                        className="w border-end justify-content-center align-item-center d-flex col-3"
                      >
                        <img src="/img_admin/vitien.svg" alt="Delete" />
                      </Link> */}
                    <Link
                      href={`ChapterPage?id=${1}`}
                      as={`ChapterPage/${1}`}
                      className="w border-end justify-content-center align-item-center d-flex col-4"
                    >
                      <img src="/img/action.svg" alt="Delete" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
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

export default ManagerDocumnet;
