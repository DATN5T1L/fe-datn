"use client";

import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Pagination,
  Container,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import h from "./marketing.module.css";
import Link from "next/link";
import "./marketing.css";
import header from "@/app/(user-global)/component/globalControl/header";
import { usePathname, useRouter } from "next/navigation";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import ReactLoading from 'react-loading';
import useFormatDate from "@/app/(user-global)/component/globalControl/useFormatDate";

interface Post {
  id: number | string;
  title_post: string;
  content_post: string;
  img_post: string;
  views_post: number;
  category_id: number | string;
  created_at: string;
  updated_at: string;
  del_flag: boolean;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T[];
}
interface PostProps {
  postData: ApiResponse<Post> | null;
}

const Marketing: React.FC<{}> = () => {
  const pathname = usePathname()
  const isMarketing = pathname === '/Marketing'
  const token = useCookie('token');
  const [currentPage, setCurrentPage] = useState(1)
  const catePerPage = 5;
  const [statusCate, setStatusCate] = useState('')
  const [dataFilter, setDataFilter] = useState<Post[] | null>(null)

  const [postData, setPostData] = useState<ApiResponse<Post> | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedViews, setSelectedViews] = useState<string>('');
  const [selectedDiscount, setSelectedDiscount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/allPost/')
      .then(res => res.json())
      .then(data => {
        setPostData(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false);
      });
  }, [token]);

  console.log(postData);


  const filteredPost = useMemo(() => {
    return postData?.data?.filter((post) => {
      const matchStatus = statusCate === '1' ? post.del_flag : statusCate === '2' ? !post.del_flag : true;

      let matchViews = true;
      if (selectedViews === '1') {
        matchViews = post.views_post >= 0 && post.views_post <= 1000;
      } else if (selectedViews === '2') {
        matchViews = post.views_post > 100;
      }

      return matchStatus && matchViews;
    }) || [];
  }, [postData, statusCate, selectedViews]);

  const array: ApiResponse<Post> = {
    status: postData?.status ?? '',
    message: postData?.message ?? '',
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
    setStatusCate('');
    setSelectedViews('');
  };

  const handleDelete = (id: string | number) => {
    if (token && id) {
      if (confirm('Bạn có muốn thay đổi trạng thái bài viết này không??')) {
        fetch(`/api/hiddenPost/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(res => res.json())
          .then(data => {
            alert(data.message)
            console.log(data);
            setPostData(prev => {
              if (!prev || !prev.data) return prev;
              const updatedData = prev.data.map(post => {
                if (post.id === id) {
                  return { ...post, del_flag: !post.del_flag };
                }
                return post;
              });
              return { ...prev, data: updatedData };
            });
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  }

  return (
    <>
      <div className="mx-4 mx-xs-2 mx-sm-3">
        <div className={`d-flex justify-content-between align-items-center my-4`}>
          <h2 className={h.heading}>Bài viết</h2>

          <div className={`${h.actions} d-flex`}>
            <Button
              variant="outline-primary"
              className={`${h.btnCTA} ${h.btnCTAOutline} me-2`}
            >
              Thêm danh mục bài viết
            </Button>
            <Link href="/Marketing/MarketingPosts/AddPost">
              <Button
                className={`${h.btnCTA}`}
              >
                Thêm bài viết
              </Button>
            </Link>
          </div>
        </div>

        <Row
          className={`${h.filterBar} justify-content-between align-items-center`}
        >
          <Col xs={12} sm={12} md={8} className="mb-4">
            <Row className="bg-white d-flex flex-row rounded-lg justify-content-between py-3 rounded-3">
              <Col
                xs={6}
                sm={2}
                md={1}
                className={`d-flex flex-row justify-content-center align-items-center  mb-4 mb-md-0 mb-sm-0 px-0`}
              >
                <img src="/img_admin/action.svg" alt="Làm thế nào để học tốt ReactJS với TTO.SH?" />
              </Col>
              <Col
                xs={6}
                sm={2}
                md={2}
                className=" justify-content-center align-items-center d-flex mb-4 mb-md-0 mb-sm-0"
              >
                <select
                  onChange={(e) => setStatusCate(e.target.value)}
                  value={statusCate}
                  aria-label="Trạng thái"
                  className={`${h.formSelect} `}
                >
                  <option>Trạng thái  </option>
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
                </select>
              </Col>
              <Col
                xs={6}
                sm={2}
                md={2}
                className=" justify-content-center align-items-center d-flex "
              >
                <select
                  aria-label="Lượt xem"
                  className={`${h.formSelect} `}
                  onChange={(e) => setSelectedViews(e.target.value)}
                  value={selectedViews}
                >
                  <option>Lượt xem  </option>
                  <option value="1">0-100</option>
                  <option value="2">1000+</option>
                </select>
              </Col>
              <Col xs={6} sm={2} md={3}>
                <div className="d-flex flex-row justify-content-center align-items-center mt-4 mt-md-0 mt-sm-0" onClick={() => handleReset()}>
                  <img src="/img_admin/restart.svg" alt="Làm thế nào để học tốt ReactJS với TTO.SH?" />
                  <span className="text-danger">  Cài lại</span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={4}
            className="align-items-end d-flex justify-content-end mb-4 mb-md-0 mb-sm-0"
          >
            <div className={`${h.searchInputGroup} `}>
              <Form.Control
                type="text"
                placeholder="Tìm kiếm bài viết"
                // className={h.searchInput}
                className="w-100"
              />
              <div className={h.searchIconWrapper}>
                <img
                  src="/img_admin/search.svg"
                  alt="Làm thế nào để học tốt ReactJS với TTO.SH?"
                  width={"24px"}
                  height={"24px"}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div
        className={`d-flex flex-column flex-grow-1 align-items-start mx-4 mx-xs-2 mx-sm-3`}
      >
        {/* Post List */}
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
                <td>Tiêu đề</td>
                <td>Nội dung</td>
                <td>Lượt xem</td>
                <td>Ngày đăng</td>
                <td>Ngày sửa</td>
                <td className="text-center">Trạng thái</td>
                <td>Hành động</td>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr>
                  <td colSpan={7}>
                    <ReactLoading type={"bubbles"} color={'rgba(153, 153, 153, 1)'} height={'10%'} width={'10%'} className={h.align} />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {currentStatus.map((item, idx) => (
                  <tr
                    key={idx}
                  >
                    <td>{item.title_post}</td>
                    <td className="text-truncate">
                      {item.content_post}
                    </td>
                    <td>{item.views_post.toLocaleString('vi-VN')}</td>
                    <td>{useFormatDate(item.created_at)}</td>
                    <td>{useFormatDate(item.updated_at)}</td>
                    <td className="text-center">
                      <span className={`${h.active_text}`}>{item.del_flag === true ? 'active' : 'anactive'}</span>
                    </td>
                    <td className={h.option_button_group}>
                      <div className="d-flex justify-content-evenly border py-2 rounded">
                        <Link href={`/Marketing/MarketingPosts/${item.id}`} className="">
                          <img src="/img_admin/action1.svg" alt="Làm thế nào để học tốt ReactJS với TTO.SH?" />
                        </Link>
                        <div className="border-end" />
                        <Link href={`/Marketing/MarketingPosts/editPost?id=${item.id}`} className="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
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
                        <Link href="" onClick={() => handleDelete(item.id)} className="">
                          {item.del_flag ? (
                            <img src="/img/action.svg" alt="Làm thế nào để học tốt ReactJS với TTO.SH?" />
                          ) : (
                            <img src="/img/hiddenEye.svg" alt="Làm thế nào để học tốt ReactJS với TTO.SH?" />
                          )}
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
            {renderPaginationItems}
            <Pagination.Next onClick={handleNextPage} />
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default Marketing;
