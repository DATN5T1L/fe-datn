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


type FeedBackArr = (string | null)[][];

const MainFeedBack: React.FC<{}> = () => {
    const router = useRouter();
    const [dataCmt, setDataCmt] = useState<FeedBackArr>([]);
    const token = useCookie('token')
    const [currentPage, setCurrentPage] = useState(1)
    const catePerPage = 5;

    console.log(dataCmt);


    useEffect(() => {
        if (token) {
            fetch(`/api/feedBackMarketing/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        console.log(data);

                        setDataCmt(data.data)
                    }
                })
                .catch(error => {
                    console.error('Có lỗi xảy ra: ', error);

                })
        }
    }, [token])

    console.log(dataCmt);


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

    console.log(currentData);

    return (
        <div
            className={`d-flex flex-column flex-grow-1 align-items-start mx-4 mx-xs-2 mx-sm-3`}
        >
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
                            <td>Người bình luận</td>
                            <td>Email</td>
                            <td>Bình luận</td>
                            <td >Trả lời</td>
                            <td className="text-center">Ngày phản hồi</td>
                            <td className="text-center">Giờ phản hồi</td>
                            <td>Hành động</td>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData && currentData?.map((item, idx) => (
                            <tr
                                key={idx}
                            >
                                <td>{item[0]}</td>
                                <td>{item[1]}</td>
                                <td>
                                    {item[2]}
                                </td>
                                <td>
                                    {item[3]}
                                </td>
                                <td>
                                    {item[6]}
                                </td>
                                {item[5] && (
                                    <td className="text-center">{item[5]?.split(' ')[0]}</td>
                                )}
                                {item[5] && (
                                    <td className="text-center">{item[5]?.split(' ')[1]}</td>
                                )}
                                <td className={h.option_button_group}>
                                    <Link href={`/Marketing/feedBack/${item[0]}`}
                                        className={`d-flex justify-content-evenly border py-2 rounded`}
                                    >
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
                                        </svg>
                                    </Link>
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

export default MainFeedBack;
