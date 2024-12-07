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
import h from "./course.module.css";
import Link from "next/link";
import "./course.css";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import useFormatDate from "@/app/(user-global)/component/globalControl/useFormatDate";

interface Apidata<T> {
  status: string;
  message: string;
  data: T[]
}
interface Course {
  id: string;
  name_course: string;
  instructor_name: string;
}
interface Chapter {
  status: string;
  data: [
    {
      id: string;
      name_chapter: string;
    }
  ]
}
interface Document {
  status: string;
  data: [
    {
      del_flag: string;
      document_id: string;
      name_document: string;
      serial_document: number;
      discription_document: string;
      type_document: string;
      updated_at: string;
    }
  ]
}

const CourseList: React.FC<{}> = () => {
  const token = useCookie('token')
  const [dataCourse, setDataCourse] = useState<Apidata<Course> | null>(null)
  const [dataChapter, setDataChapter] = useState<Chapter | null>(null)
  const [dataDoc, setDataDoc] = useState<Document | null>(null)
  const [nameTeacher, setNameTeacher] = useState<string>("")
  const [idCourse, setIdCourse] = useState<string>("")
  const [idChapter, setIdChapter] = useState<string>("")
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
            console.log(data);
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
        });
      const nameInstructor = dataCourse?.data.find(item => item.id === idCourse)
      if (nameInstructor) {
        setNameTeacher(nameInstructor?.instructor_name)
      }
    }
  }, [token, idCourse])

  useEffect(() => {
    if (token && idChapter) {
      fetch(`/api/allDocumentAdmin/${idChapter}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data) {
            setDataDoc(data)
          }
        })
        .catch(error => {
          console.error('Có lỗi xảy ra: ', error);
        })
    }
  }, [token, idChapter])

  const totalPages = Math.ceil((dataDoc?.data?.length || 0) / catePerPage)
  const indexOfLastCate = currentPage * catePerPage;
  const indexOfFirstCate = indexOfLastCate - catePerPage;
  const currentData =
    dataDoc?.data && Array.isArray(dataDoc.data)
      ? dataDoc.data.slice(indexOfFirstCate, indexOfLastCate)
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
  console.log(currentData);

  return (
    <>
      <div className={`${h.mainheader} d-flex flex-column `}>
        <div className="mx-4 mx-xs-2 mx-sm-3">
          <div
            className={`d-flex justify-content-between align-items-center my-4 flex-wrap`}
          >
            <div className="col-12 col-md-6">
              <h2 className={h.heading}>Danh sách khóa học </h2>
            </div>
            <Link className={h.heading__link} href="/giangvien/Lesson/LessonAdd">
              <div className={`${h.actions} d-flex`}>
                <Button className={`${h.btnCTA}`}>Thêm bài học</Button>
              </div>
            </Link>
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
                {dataCourse?.data?.map((item, index) => (
                  <option key={index} value={`${item.id}`}>{item.name_course}</option>
                ))}
              </select>
            </div>
            <div className="bg-white border-end p-4">
              <select
                aria-label="Chapter"
                className={`${h.formSelect} bg-transparent`}
                onChange={(e) => setIdChapter(e.target.value)}
              >
                {idCourse ? (
                  <>
                    <option value="">Mời chọn chapter</option>
                    {dataChapter?.data?.map((item, index) => (
                      <option key={index} value={`${item.id}`}>{item.name_chapter}</option>
                    ))}
                  </>
                ) : (
                  <option value="">Mời chọn chapter</option>
                )}
              </select>
            </div>
          </div>
          <div>
            <InputGroup className={h.searchInputGroup}>
              <input
                type="text"
                placeholder="Tìm kiếm khóa học"
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
      </div>
      <div className={`${h.main} d-flex flex-column  align-items-start `}>
        {/* Post List */}
        <div
          className="d-flex overflow-auto w-100"
          style={{ whiteSpace: "nowrap" }}
        >
          <Table bordered hover className={`${h.table} table-responsive`}>
            <thead>
              <tr>
                <td>Số thứ tự</td>
                <td>Hình ảnh</td>
                <td>Tên khóa học</td>
                <td>Mô tả</td>
                <td>Trạng thái</td>
                <td>Ngày cập nhật</td>
                <td>Hành động</td>
              </tr>
            </thead>
            <tbody>
              {currentData && idChapter && idCourse ? (
                <>
                  {
                    currentData?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          {item.serial_document}
                        </td>
                        <td>
                          <Card.Header className={h.headerContent}>
                            <section className={h.headerContent__text}>
                              <Card.Title className={h.text__hedding2}>
                                {item.name_document}
                              </Card.Title>
                              <Card.Subtitle className={h.text__hedding3}>
                                by {nameTeacher}
                              </Card.Subtitle>
                              <Card.Img
                                src="/img/iconReact.svg"
                                alt=""
                                className={h.text__img}
                              />
                            </section>
                            <Card.Img
                              src="/img/tuan.png"
                              alt=""
                              className={h.headerContent__avt}
                            />
                          </Card.Header>
                        </td>
                        <td>{item.name_document}</td>

                        <td>
                          {item.discription_document}
                        </td>
                        <td>
                          <span className={h.active_text}>{item.del_flag ? 'Active' : 'Anactive'}</span>
                        </td>
                        <td>
                          {useFormatDate(item.updated_at)}
                        </td>
                        <td className={h.option_button_group}>
                          <div
                            className={`justify-content-between border d-flex py-2 rounded`}
                          >
                            <Link href="/giangvien/Lesson/LessonDetail" className="w-50 border-end">
                              <img src="/img_admin/action1.svg" alt="Edit" />
                            </Link>
                            <Link href="/#!" className="w-50 border-end">
                              <img src="/img_admin/dautick.png" alt="Edit" />
                            </Link>

                            <Link href="/giangvien/Lesson/LessonEdit" className="w-50">
                              <img src="/img_admin/action2.svg" alt="Edit" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </>
              ) : (
                <tr style={{ minHeight: '50vh' }}>
                  <td colSpan={7} style={{ padding: '100px', width: '100%', minHeight: '100%', textAlign: 'center', fontSize: '32px', fontWeight: '600', color: 'var(--gray-70)' }}>
                    {!idCourse
                      ? "Vui lòng chọn khóa học"
                      : !idChapter
                        ? "Vui lòng chọn chapter"
                        : "Loading..."}
                  </td>
                </tr>
              )
              }
              {idCourse && idChapter && currentData.length === 0 || idCourse && idChapter && currentData === undefined ? (
                <td colSpan={7} style={{ padding: '100px', width: '100%', minHeight: '100%', textAlign: 'center', fontSize: '32px', fontWeight: '600', color: 'var(--gray-70)' }}>
                  Không có bài học nào ở đây
                </td>
              ) : ''}
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
    </>
  );
};

export default CourseList;
