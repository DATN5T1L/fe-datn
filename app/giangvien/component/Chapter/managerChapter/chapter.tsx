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
import h from "./chapter.module.css";
import Link from "next/link";
import "./chapter.css";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import { useRouter, useSearchParams } from "next/navigation";
import useFormatDate from "@/app/(user-global)/component/globalControl/useFormatDate";

interface Chapter {
  course_id: string;
  created_at: string;
  del_flag: boolean;
  id: string;
  name_chapter: string;
  serial_chapter: number;
  updated_at: string;
}
interface ApiResponse<T> {
  status: string;
  message: string;
  data: T[];
}

const ManagerChapter: React.FC = () => {
  const [chapterData, setChapterData] = useState<ApiResponse<Chapter> | null>(null);
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true);
  const token = useCookie('token');
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const nameCourse = searchParams.get('name')
  const [currentPage, setCurrentPage] = useState(1)
  const catePerPage = 5;

  useEffect(() => {
    if (token && id) {
      setLoading(true);
      fetch(`/api/allChapterAdmin/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setChapterData(data)
          setLoading(false)
          console.log(data);
        })
        .catch(err => {
          console.log(err)
          setLoading(false);
        });
    }
  }, [token]);

  console.log(chapterData);


  const totalPages = Math.ceil((chapterData?.data?.length || 0) / catePerPage)
  const indexOfLastCate = currentPage * catePerPage;
  const indexOfFirstCate = indexOfLastCate - catePerPage;
  const currentData =
    chapterData?.data && Array.isArray(chapterData.data)
      ? chapterData.data.slice(indexOfFirstCate, indexOfLastCate)
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

  const handleHidden = async (id: string) => {
    if (token) {
      if (confirm('Bạn có muốn ẩn chương này không?')) {
        try {
          const response = await fetch(`/api/hiddenChapter/${id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json()
          console.log(data);
          if (data.status === 'success') {
            setChapterData((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                data: prev.data.map((chapter) =>
                  chapter.id === id
                    ? { ...chapter, del_flag: !chapter.del_flag }
                    : chapter
                ),
              };
            });
            alert('Thay đổi thành công')
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error("Error updating del_flag:", error);
        }
      }
    }
  };

  const handlePushAdd = () => {
    router.replace(`/giangvien/ChapterPage/ManagerChapter/ChapterAdd?id=${id}`)
  }

  return (
    <div
      className={`${h.main} d-flex flex-column `}
    >
      <div
        className={`${h.header} d-flex justify-content-between align-items-center`}
      >
        <h2 className={h.heading}>Quản lý chapter</h2>
        <div className={`${h.actions} d-flex`}>
          <Button
            onClick={() => handlePushAdd()}
            className={`${h.btnCTA}`}
          >Thêm chapter</Button>
        </div>
      </div>
      <div className={`${h.left_right}`}>
        <div className={h.left}>
          Khóa học: <span>{nameCourse}</span>
        </div>
        <div className={`${h.right} `}>
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
      <div
        className={`${h.bodytable}d-flex overflow-auto w-100`}
        style={{ whiteSpace: "nowrap" }}
      >
        <Table bordered hover className={`${h.table}`}>
          <thead>
            <tr>
              <td className='text-lg-center w-auto'>Số thứ tự</td>
              <td className='text-lg-center'>Tên chapter</td>
              <td className='text-lg-center'>Ngày thêm</td>
              <td className='text-lg-center'>Ngày cập nhật</td>
              <td className='text-lg-center'>Hành động</td>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td className="text-lg-center w-auto">
                  {item.serial_chapter}
                </td>
                <td className="text-lg-center">{item.name_chapter}</td>
                <td className="text-lg-center">{useFormatDate(item.created_at)}</td>
                <td className="text-lg-center">{useFormatDate(item.updated_at)}</td>
                <td className={h.option_button_group}>
                  <div
                    className={` w-51 justify-content-between border d-flex py-2 rounded row mx-1`}
                  >
                    <Link
                      href={`/giangvien/ChapterPage/ChapterDetail?id=${item.id}&name=${item.name_chapter}`}
                      className="w border-end justify-content-center align-item-center d-flex col-3"
                    >
                      <img src="/img/actionDetail.svg" alt="Edit" />
                    </Link>
                    <Link
                      href={`/giangvien/ChapterPage/ChapterEdit?id=${id}&idChapter=${item.id}&stt=${item.serial_chapter}`}
                      className="w border-end justify-content-center align-item-center d-flex col-3"
                    >
                      <img src="/img_admin/action2.svg" alt="Delete" />
                    </Link>
                    <Link
                      href={`/giangvien/ChapterPage/ManagerDocument?id=${item.id}&name=${item.name_chapter}`}
                      className="w border-end justify-content-center align-item-center d-flex col-3"
                    >
                      <img src="/img_admin/vitien.svg" alt="Delete" />
                    </Link>
                    <div
                      onClick={() => handleHidden(item.id)}
                      className="w border-end justify-content-center align-item-center d-flex col-3"
                    >
                      {item.del_flag ? (
                        <img src="/img/action.svg" alt="Delete" />
                      ) : (
                        <img src="/img/hiddenEye.svg" alt="Delete" />
                      )}
                    </div>
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
    </div >
  );
};

export default ManagerChapter;
