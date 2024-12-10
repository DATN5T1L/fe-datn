"use client";

import React, { FC, useEffect, useMemo, useState } from "react";
import {
    Button,
    Form,
    InputGroup,
    Pagination,
    Container,
    Card,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import h from "./Router.module.css";
import Link from "next/link";
import "./router.css";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import useFormatDate from "@/app/(user-global)/component/globalControl/useFormatDate";

interface RouterData {
    id: string;
    name_route: string;
    slug_route: string;
    img_route: string;
    discription_route: string;
    del_flag: boolean;
    created_at: string;
    updated_at: string;
}
interface RouterProps {
    data: RouterData[];
}

const RouterIndex: React.FC<RouterProps> = ({ data }) => {
    const token = useCookie('token')
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const currentData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return data.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, data]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPaginationItems = useMemo(() => {

        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <Pagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </Pagination.Item>
                );
            }
        } else {
            if (currentPage > 3) {
                pages.push(
                    <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
                        1
                    </Pagination.Item>
                );
                pages.push(<Pagination.Ellipsis key="start-ellipsis" />);
            }

            const startPage = Math.max(1, currentPage - 1);
            const endPage = Math.min(totalPages, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <Pagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </Pagination.Item>
                );
            }

            if (currentPage < totalPages - 2) {
                pages.push(<Pagination.Ellipsis key="end-ellipsis" />);
                pages.push(
                    <Pagination.Item
                        key={totalPages}
                        onClick={() => handlePageChange(totalPages)}
                    >
                        {totalPages}
                    </Pagination.Item>
                );
            }
        }

        return pages;
    }, [currentPage, totalPages]);

    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    const handleCensorCourse = (id: string) => {
        if (token && id) {
            fetch(`/api/censorCourse/${id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
    }

    return (
        <div
            className={`${h.main} d-flex flex-column  align-items-start `}
        >
            <div
                className="d-flex overflow-auto w-100"
                style={{ whiteSpace: "nowrap" }}
            >
                <Table bordered hover className={`${h.table} table-responsive`}>
                    <thead>
                        <tr>
                            <td>Hình ảnh</td>
                            <td>Tên lộ trình </td>
                            <td>Chi tiết lộ trình</td>
                            <td>Slug</td>
                            <td>Ngày thêm</td>
                            <td>Ngày sửa</td>
                            <td className="text-lg-center">Hành động</td>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <Card.Header className={h.headerContent}>
                                        <section className={h.headerContent__text}>
                                            <Card.Title className={h.text__hedding2}>
                                                {item.name_route}
                                            </Card.Title>
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
                                <td>{item.name_route}</td>
                                <td>{item.discription_route} </td>
                                <td>{item.slug_route}</td>
                                <td>
                                    {useFormatDate(item.created_at)}
                                </td>
                                <td>
                                    {useFormatDate(item.updated_at)}
                                </td>
                                <td className={h.option_button_group}>
                                    <div
                                        className={h.option_optimai}
                                    >
                                        <Link href={`/giangvien/CoursePage/CourseVideoDetail`} className={h.link__item}>
                                            <img src="/img_admin/vitien.svg" alt="Edit" />
                                        </Link>
                                        <Link href={`/giangvien/ChapterPage/ManagerChapter`} className={h.link__item}>
                                            {item.del_flag ? (
                                                <img src="/img/action.svg" alt="Edit" />
                                            ) : (
                                                <img src="/img/hiddenEye.svg" alt="Edit" />
                                            )}
                                        </Link>
                                        <Link href={`/giangvien/CoursePage/CourseEdit?id=${item.id}`} className={h.link__item}>
                                            <img src="/img_admin/action2.svg" alt="Edit" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <div className="paginationWrapper">
                <Pagination className="pagination">
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)}>
                        <img src="/img_admin/prep.svg" alt="Previous" width="8" height="16" />
                    </Pagination.Prev>
                    {renderPaginationItems}
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)}>
                        <img src="/img_admin/prep2.svg" alt="Next" width="8" height="16" />
                    </Pagination.Next>
                </Pagination>
            </div>
        </div>
    );
};

export default RouterIndex;
