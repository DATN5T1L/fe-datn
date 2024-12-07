"use client";

import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Table,
  Pagination,
} from "react-bootstrap";
import h from "./fqa.module.css";
import Link from "next/link";
import "./fqa.css";
import { useRouter, useSearchParams } from "next/navigation";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import useFormatDate from "@/app/(user-global)/component/globalControl/useFormatDate";

interface Faq {
  id: string;
  question_faq: string;
  answer_faq: string;
  del_flag: boolean;
  course_id: string;
  created_at: string;
  updated_at: string;
}
interface ApiResponse<T> {
  status: string;
  message: string;
  data: T[];
}

const FQA: React.FC<{}> = () => {
  const [faqData, setFaqData] = useState<ApiResponse<Faq> | null>(null);
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
      fetch(`/api/faqCourse/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setFaqData(data)
          setLoading(false)
          console.log(data);
        })
        .catch(err => {
          console.log(err)
          setLoading(false);
        });
    }
  }, [token]);

  console.log(faqData);


  const totalPages = Math.ceil((faqData?.data?.length || 0) / catePerPage)
  const indexOfLastCate = currentPage * catePerPage;
  const indexOfFirstCate = indexOfLastCate - catePerPage;
  const currentData =
    faqData?.data && Array.isArray(faqData.data)
      ? faqData.data.slice(indexOfFirstCate, indexOfLastCate)
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
    if (id) {
      router.replace(`/giangvien/CoursePage/CourseFQA/add?id=${id}`)
    }
  }

  const handleHidden = (id: string) => {
    if (confirm('Bạn có muốn thay đổi trạng thái của faq không ?')) {
      fetch(`/api/statusFaqCourse/${id}`, {
        method: 'GET'
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.status === 'success') {
            setFaqData((newData) => {
              if (!newData) return newData;
              return {
                ...newData,
                data: newData.data.map((faq) =>
                  faq.id === id ?
                    { ...faq, del_flag: !faq.del_flag }
                    : faq
                )
              }
            })
            alert('Thay đổi thành công !!!')
          }
        })
        .catch(error => {
          console.error('Có lỗi xảy ra: ', error);
        })
    }
  }

  return (
    <div className={`${h.main} d-flex flex-column `}>
      <div
        className={`${h.header} d-flex justify-content-between align-items-center`}
      >
        <h2 className={h.heading}>FQA Khóa học</h2>

        <div className={`${h.actions} d-flex`}>
          <Button
            variant="outline-primary"
            className={`${h.btnCTA1} ${h.btnCTAOutline1} me-2`}
          >
            Demo
          </Button>
          <Button className={`${h.btnCTA}`} onClick={() => handlePushAdd()}>Thêm câu hỏi</Button>
        </div>
      </div>
      <div className={`${h.left_right}`}>
        <div className={h.left}>
          Khóa học: <span>Website Design UI/UX</span>
        </div>
        <div className={`${h.right} `}>
          <InputGroup className={h.searchInputGroup}>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm chapter"
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

      {/* Post List */}
      <div
        className={`${h.bodytable}d-flex overflow-auto w-100`}
        style={{ whiteSpace: "nowrap" }}
      >
        <Table bordered hover className={`${h.table}`}>
          <thead >
            <tr >
              <td className="text-lg-center">Số thứ tự</td>
              <td className="w-25">Câu hỏi</td>
              <td className="w-25">Câu trả lời</td>
              <td className="w-25">Ngày thêm</td>
              <td className="w-25">Ngày sửa</td>
              <td className="text-lg-center">Hành động</td>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} >
                <td className='text-lg-center'>{index + 1}</td>
                <td>{item.question_faq}</td>
                <td>{item.answer_faq}</td>
                <td>{useFormatDate(item.created_at)}</td>
                <td>{useFormatDate(item.updated_at)}</td>
                <td className={`${h.option_button_group} text-lg-center`}>
                  <div
                    className={`w-50 justify-content-between border d-flex py-2 rounded row mx-1`}
                  >
                    <div
                      onClick={() => handleHidden(item.id)}
                      className="w-50 border-end justify-content-center align-item-center d-flex col-6"
                    >
                      {item.del_flag ? (
                        <img src="/img/action.svg" alt="Delete" />
                      ) : (
                        <img src="/img/hiddenEye.svg" alt="Delete" />
                      )}
                    </div>
                    <Link
                      href={`/giangvien/CoursePage/CourseFQA/edit?id=${item.id}&courseId=${id}`}
                      className="w-50 border-end justify-content-center align-item-center d-flex col-6"
                    >
                      <img src="/img_admin/action2.svg" alt="Delete" />
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
          {renderPaginationItems}
          <Pagination.Next onClick={handleNextPage} />
        </Pagination>
      </div>
    </div>
  );
};

export default FQA;
