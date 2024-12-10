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
import useFormatDate from "@/app/(user-global)/component/globalControl/useFormatDate";
import { useRouter } from "next/navigation";

interface Apidata<T> {
  status: string;
  message: string;
  data: T[]
}
interface Course {
  id: string;
  name_course: string
}
interface Chapter {
  status: string;
  data: Array<
    {
      course_id: string;
      created_at: string;
      del_flag: boolean;
      id: string;
      name_chapter: string;
      serial_chapter: number;
      updated_at: string;
    }
  >
}

const Chapter: React.FC<{}> = () => {
  const token = useCookie('token')
  const router = useRouter()
  const [dataCourse, setDataCourse] = useState<Apidata<Course> | null>(null)
  const [dataChapter, setDataChapter] = useState<Chapter | null>(null)
  const [idCourse, setIdCourse] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const catePerPage = 5;

  useEffect(() => {
    if (token) {
      fetch(`/api/allCourseAdmin`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data) {
            setDataCourse(data)
          }
        })
        .catch(error => {
          console.error('Có lỗi xảy ra: ', error);
        })
    }
  }, [token])

  useEffect(() => {
    if (token && idCourse) {
      fetch(`/api/allChapterAdmin/${idCourse}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data) {
            setDataChapter(data)
          }
        })
        .catch(error => {
          console.error('Có lỗi xảy ra: ', error);
        })
    }
  }, [idCourse])

  console.log(idCourse);


  const totalPages = Math.ceil((dataChapter?.data?.length || 0) / catePerPage)
  const indexOfLastCate = currentPage * catePerPage;
  const indexOfFirstCate = indexOfLastCate - catePerPage;
  const currentData =
    dataChapter?.data && Array.isArray(dataChapter.data)
      ? dataChapter.data.slice(indexOfFirstCate, indexOfLastCate)
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
    if (idCourse) {
      router.replace(`/giangvien/ChapterPage/ManagerChapter/ChapterAdd?id=${idCourse}`)
    } else {
      alert('Vui lòng chọn khóa học')
    }
  }

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
            setDataChapter((prev) => {
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

  return (
    <div
      className={`d-flex flex-column flex-grow-1 align-items-start mx-4 mx-xs-2 mx-sm-3`}
    >
      <div
        className={`${h.header} d-flex justify-content-between align-items-center`}
      >
        <h2 className={h.heading}>Danh sách chapter</h2>
        <div className={h.heading__link}>
          <div className={`${h.actions} d-flex`}>
            <Button className={`${h.btnCTA}`} onClick={() => handlePushAdd()}>Thêm chapter</Button>
          </div>
        </div>
      </div>
      <div className={`${h.filter_bar} d-flex justify-content-between `}>
        <div className="d-flex">
          <img
            src="/img_admin/action.svg"
            className="bg-white border-end p-4 "
            alt="Action"
          />
          <div className="bg-white border-end p-4">
            <select
              aria-label="Trạng thái"
              className={`${h.formSelect} bg-transparent`}
              onChange={(e) => setIdCourse(e.target.value)}
            >
              <option value="">Khóa học</option>
              {dataCourse && dataCourse.data.map((item, index) => (
                <option
                  key={index}
                  value={`${item.id}`}
                >{item.name_course}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div
        className={`${h.bodytable}d-flex overflow-auto w-100`}
        style={{ whiteSpace: "nowrap" }}
      >
        <Table bordered hover className={`${h.table}`}>
          <thead>
            <tr>
              <td className={`text-lg-center ${h.td__stt}`}>Số thứ tự</td>
              <td className="">Tên chapter</td>
              <td className="">Id</td>
              <td className="text-lg-center">Ngày thêm</td>
              <td className="text-lg-center w-1">Ngày cập nhật</td>
              <td className="text-lg-center">Hành động</td>
            </tr>
          </thead>
          <tbody>
            {currentData ? (
              <>
                {currentData.length !== 0 ? (<>{
                  currentData.map((item, index) => (
                    <tr key={index}>
                      <td className="text-lg-center">{item.serial_chapter}</td>
                      <td className="">{item.name_chapter}</td>
                      <td className="">{item.id}</td>
                      <td className="text-lg-center">{useFormatDate(item.created_at)}</td>
                      <td className="text-lg-center">{useFormatDate(item.updated_at)}</td>
                      <td className={h.option_button_group}>
                        <div
                          className={`justify-content-space-between border d-flex py-2 rounded row mx-1`}
                        >
                          <Link
                            href="/giangvien/ChapterPage/ChapterDetail"
                            className="w-33 border-end justify-content-center d-flex col-3"
                          >
                            <img src="/img/actionDetail.svg" alt="Edit" />
                          </Link>
                          <Link
                            href={`/giangvien/ChapterPage/ChapterEdit`}
                            className="w-33 border-end justify-content-center d-flex col-3"
                          >
                            <img src="/img_admin/action2.svg" alt="Delete" />
                          </Link>
                          <Link
                            href={`/giangvien/ChapterPage/ManagerDocument`}
                            className="w-33 border-end justify-content-center d-flex col-3"
                          >
                            <img src="/img_admin/vitien.svg" alt="Delete" />
                          </Link>
                          <div
                            onClick={() => handleHidden(item.id)}
                            className="w-33 border-end justify-content-center d-flex col-3"
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
                  ))
                }</>) : (
                  <>
                    <tr style={{ minHeight: '50vh' }}>
                      <td colSpan={6} style={{ padding: '100px', width: '100%', minHeight: '100%', textAlign: 'center', fontSize: '32px', fontWeight: '600', color: 'var(--gray-70)' }}>Khóa học này không có chapter nào</td>
                    </tr>
                  </>
                )

                }
              </>
            ) : (
              <tr style={{ minHeight: '50vh' }}>
                <td colSpan={6} style={{ padding: '100px', width: '100%', minHeight: '100%', textAlign: 'center', fontSize: '32px', fontWeight: '600', color: 'var(--gray-70)' }}>Vui lòng chọn khóa học</td>
              </tr>
            )}
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

export default Chapter;
