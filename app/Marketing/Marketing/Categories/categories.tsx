"use client";

import React, { useEffect, useState, useMemo, useCallback, useLayoutEffect } from "react";
import { Pagination } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import h from "../marketing.module.css";
import Link from "next/link";
import "../marketing.css";
import { useRouter } from "next/navigation";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import useFormatDate from "@/app/(user-global)/component/globalControl/useFormatDate";
import ReactLoading from 'react-loading';

interface Category {
  id: string;
  name_category: string;
  created_at: string;
  updated_at: string;
  tags: string;
  del_flag: boolean;
}

interface Data<T> {
  status: string;
  message: string;
  data: T[];
}

const Categories = () => {
  const router = useRouter();
  const token = useCookie('token')
  const [data, setData] = useState<Data<Category> | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const catePerPage = 5;
  const [statusCate, setStatusCate] = useState('')
  const [dataFilter, setDataFilter] = useState<Category[] | null>(null)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    if (token) {
      fetch(`/api/post_categories`, {
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => res.json())
        .then(data => {
          console.log(data);
          setData(data)
          setLoading(false)
        })
        .catch(error => {
          setLoading(false)
          console.error(error)
        })
        .finally(() => {
          console.log('done');
          setLoading(false)

        })
    }
  }, [token])


  const filteredPost = useMemo(() => {
    return data?.data?.filter((categories) => {
      const matchViews = statusCate === '1' ? categories.del_flag : statusCate === '2' ? !categories.del_flag : true;
      return matchViews;
    }) || [];
  }, [data, statusCate]);

  const array: Data<Category> = {
    status: data?.status ?? '',
    message: data?.message ?? '',
    data: filteredPost
  };

  const totalPages = Math.ceil((array?.data.length || 0) / catePerPage)
  const indexOfLastCate = currentPage * catePerPage;
  const indexOfFirstCate = indexOfLastCate - catePerPage;
  const currentStatus =
    array?.data && Array.isArray(array.data)
      ? array.data.slice(indexOfFirstCate, indexOfLastCate)
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

  const handleReset = () => {
    setStatusCate('')
  }

  const handleHiddenCate = (id: string) => {
    if (token && id) {
      if (confirm('Bạn có muốn thay đổi trạng thái danh mục')) {
        fetch(`/api/hiddenCategoriesPost/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.status === 'success') {
              setData((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  data: prev.data.map((cate) =>
                    cate.id === id
                      ? { ...cate, del_flag: !cate.del_flag }
                      : cate
                  ),
                };
              })
              alert('Thay đổi thành công')
            } else {
              alert('Thay đổi thất bại')
              console.error(data.message);
            }
          })
          .catch(error => console.error(error))
      }
    }
  }

  return (
    <>
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between mx-3">
          <div className="d-flex">
            <img
              src="/img_admin/action.svg"
              className="bg-white border-end p-4 rounded-start-4"
              alt="Hoàn thiện dự án e-commerce cùng TTo"
            />
            <div className="bg-white border-end p-4">
              <select
                aria-label="Trạng thái"
                className={`${h.formSelect} bg-transparent`}
                onChange={(e) => setStatusCate(e.target.value)}
                value={statusCate}
              >
                <option value="">Trạng thái</option>
                <option value="1">Active</option>
                <option value="2">Inactive</option>
              </select>
            </div>
            <div className="bg-white p-4 d-inline-flex align-items-center rounded-end-4" onClick={() => handleReset()}>
              <img src="/img_admin/restart.svg" alt="Hoàn thiện dự án e-commerce cùng TTo" />
              <span className="text-danger">Cài lại</span>
            </div>
          </div>
          <div>
            <ChapterSearchBar />
          </div>
        </div>
      </div>
      <div
        className="d-flex overflow-auto mt-4 mx-4"
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
              <td className="text-start">Tên danh mục</td>
              <td>Tags</td>
              <td>Ngày đăng</td>
              <td>Ngày cập nhật</td>
              <td className="text-center">Trạng thái</td>
              <td>Hành động</td>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={6}>
                  <ReactLoading type={"bubbles"} color={'rgba(153, 153, 153, 1)'} height={'10%'} width={'10%'} className={h.align} />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {currentStatus?.map((item, index) => (
                <tr
                  key={index}
                >
                  <td className="text-start">{item.name_category}</td>
                  <td>{item.tags.replace(/\s+/g, ', ')}</td>
                  <td>{useFormatDate(item.created_at)}</td>
                  <td>{useFormatDate(item.updated_at)}</td>
                  <td className="text-center">
                    <span className={`${h.active_text}`}>{item.del_flag === true ? 'active' : 'anactive'}</span>
                  </td>
                  <td className={`${h.category_btns}`}>
                    <div
                      className={`d-flex justify-content-evenly border py-2 rounded`}
                    >
                      <Link href="Marketing/MarketingCategories/EditCategory">
                        <img src="/img_admin/action1.svg" alt="Hoàn thiện dự án e-commerce cùng TTo" />
                      </Link>
                      <div className="border-end" />
                      <Link href={`/Marketing/MarketingCategories/EditCategory?id=${item.id}`} className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                        >
                          <path
                            d="M12.5 1.25H12.4426C10.1342 1.24999 8.32519 1.24998 6.91371 1.43975C5.46897 1.63399 4.32895 2.03933 3.43414 2.93414C2.53933 3.82895 2.13399 4.96897 1.93975 6.41371C1.74998 7.82519 1.74999 9.63423 1.75 11.9426V12.0574C1.74999 14.3658 1.74998 16.1748 1.93975 17.5863C2.13399 19.031 2.53933 20.1711 3.43414 21.0659C4.32895 21.9607 5.46897 22.366 6.91371 22.5603C8.32519 22.75 10.1342 22.75 12.4426 22.75H12.5574C14.8658 22.75 16.6748 22.75 18.0863 22.5603C19.531 22.366 20.6711 21.9607 21.5659 21.0659C22.4607 20.1711 22.866 19.031 23.0603 17.5863C23.25 16.1748 23.25 14.3658 23.25 12.0574V12C23.25 11.5858 22.9142 11.25 22.5 11.25C22.0858 11.25 21.75 11.5858 21.75 12C21.75 14.3782 21.7484 16.0864 21.5736 17.3864C21.4018 18.6648 21.0749 19.4355 20.5052 20.0052C19.9355 20.5749 19.1648 20.9018 17.8864 21.0736C16.5864 21.2484 14.8782 21.25 12.5 21.25C10.1218 21.25 8.41356 21.2484 7.11358 21.0736C5.83517 20.9018 5.06445 20.5749 4.4948 20.0052C3.92514 19.4355 3.59825 18.6648 3.42637 17.3864C3.25159 16.0864 3.25 14.3782 3.25 12C3.25 9.62178 3.25159 7.91356 3.42637 6.61358C3.59825 5.33517 3.92514 4.56445 4.4948 3.9948C5.06445 3.42514 5.83517 3.09825 7.11358 2.92637C8.41356 2.75159 10.1218 2.75 12.5 2.75C12.9142 2.75 13.25 2.41421 13.25 2C13.25 1.58579 12.9142 1.25 12.5 1.25Z"
                            fill="#4D4D4D"
                          />
                          <path
                            d="M22.0303 3.53033C22.3232 3.23744 22.3232 2.76256 22.0303 2.46967C21.7374 2.17678 21.2626 2.17678 20.9697 2.46967L13.25 10.1893V6.65625C13.25 6.24204 12.9142 5.90625 12.5 5.90625C12.0858 5.90625 11.75 6.24204 11.75 6.65625V12C11.75 12.4142 12.0858 12.75 12.5 12.75H17.8438C18.258 12.75 18.5938 12.4142 18.5938 12C18.5938 11.5858 18.258 11.25 17.8438 11.25H14.3107L22.0303 3.53033Z"
                            fill="#4D4D4D"
                          />
                        </svg>
                      </Link>
                      <div className="border-end" />
                      <div onClick={() => handleHiddenCate(item.id)} className="">
                        {item.del_flag ? (
                          <img src="/img/action.svg" alt="Hoàn thiện dự án e-commerce cùng TTo" />
                        ) : (
                          <img src="/img/hiddenEye.svg" alt="Hoàn thiện dự án e-commerce cùng TTo" />
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </div>
      <div className="paginationWrapper">
        <Pagination>
          <Pagination.Prev onClick={handlePrevPage} />
          {renderPaginationItems}
          <Pagination.Next onClick={handleNextPage} />
        </Pagination>
      </div>
    </>
  );
};

export default Categories;


const ChapterSearchBar = () => {
  return (
    <div className="input-group">
      <input
        placeholder="Tìm kiếm bài viết"
        type="text"
        className="form-control rounded-start-5 border-end-0 p-2"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
      />
      <div>
        <span
          className="input-group-text bg-white border-start-0 rounded-end-5 rounded-end-0 p-2"
          id="inputGroup-sizing-default"
        >
          {/* Search icon start */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 12 12"
            fill="none"
          >
            <g clipPath="url(#clip0_3435_8010)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.75 1.375C3.33375 1.375 1.375 3.33375 1.375 5.75C1.375 8.16625 3.33375 10.125 5.75 10.125C8.16625 10.125 10.125 8.16625 10.125 5.75C10.125 3.33375 8.16625 1.375 5.75 1.375ZM0.625 5.75C0.625 2.91954 2.91954 0.625 5.75 0.625C8.58046 0.625 10.875 2.91954 10.875 5.75C10.875 7.03026 10.4056 8.20087 9.62943 9.0991L11.2652 10.7348C11.4116 10.8813 11.4116 11.1187 11.2652 11.2652C11.1187 11.4116 10.8813 11.4116 10.7348 11.2652L9.0991 9.62943C8.20087 10.4056 7.03026 10.875 5.75 10.875C2.91954 10.875 0.625 8.58046 0.625 5.75Z"
                fill="#999999"
              />
            </g>
            <defs>
              <clipPath id="clip0_3435_8010">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {/* Search icon end */}
        </span>
      </div>
    </div>
  );
};
