'use client';
import { useEffect, useState } from "react";
import { Pagination, Table, Form, ButtonGroup, Button } from "react-bootstrap";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import h from './history.module.css';

interface LogEntry {
    id: number;
    fullname: string;
    role: string;
    action: string;
    description: string;
    status: "success" | "fail";
    created_at: string;
    updated_at: string;
}

const History = () => {
    const [history, setHistory] = useState<LogEntry[]>([]);
    const [searchKeyword, setSearchKeyword] = useState(""); // State cho từ khóa tìm kiếm
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<"all" | "success" | "fail">("all"); // State cho tiêu chí sắp xếp
    const itemsPerPage = 20;
    const token = useCookie("token");

    useEffect(() => {
        if (token) {
            fetch(`/api/getAllHistory/desc`, {
                cache: "no-cache",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (!res.ok) throw new Error(`HTTP status ${res.status}`);
                    return res.json();
                })
                .then((data) => {
                    setHistory(data.data);
                })
                .catch((error) => console.error("Error fetching history:", error));
        }
    }, [token]);

    // Lọc dữ liệu dựa trên từ khóa tìm kiếm
    const filteredHistory = history.filter((entry) =>
        Object.values(entry)
            .some((value) =>
                String(value).toLowerCase().includes(searchKeyword.toLowerCase())
            )
    );

    // Lọc theo tiêu chí sắp xếp (success, fail, all)
    const sortedHistory = filteredHistory.filter((entry) => {
        if (sortBy === "all") return true;
        return entry.status === sortBy;
    });

    // Tính toán dữ liệu cho trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedHistory.slice(indexOfFirstItem, indexOfLastItem);

    // Tạo danh sách các trang
    const totalPages = Math.ceil(sortedHistory.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h2>Lịch sử hoạt động</h2>

            {/* Ô tìm kiếm */}
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Tìm kiếm theo từ khóa..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
            </Form.Group>

            {/* Bộ lọc theo trạng thái */}
            <ButtonGroup className="mb-3">
                <Button
                    variant={sortBy === "all" ? "primary" : "outline-primary"}
                    onClick={() => setSortBy("all")}
                >
                    Tất cả
                </Button>
                <Button
                    variant={sortBy === "success" ? "success" : "outline-success"}
                    onClick={() => setSortBy("success")}
                >
                    Thành công
                </Button>
                <Button
                    variant={sortBy === "fail" ? "danger" : "outline-danger"}
                    onClick={() => setSortBy("fail")}
                >
                    Thất bại
                </Button>
            </ButtonGroup>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Họ tên</th>
                        <th>Vai trò</th>
                        <th>Hành động</th>
                        <th>Mô tả</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                        <th>Ngày cập nhật</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.id}</td>
                                <td>{entry.fullname}</td>
                                <td>{entry.role}</td>
                                <td>{entry.action}</td>
                                <td>{entry.description}</td>
                                <td style={{ color: entry.status === "success" ? "green" : "red" }}>
                                    {entry.status === "success" ? "Thành công" : "Thất bại"}
                                </td>
                                <td>{new Date(entry.created_at).toLocaleString()}</td>
                                <td>{new Date(entry.updated_at).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} style={{ textAlign: "center" }}>
                                Không có dữ liệu lịch sử.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Phân trang */}
            <Pagination className="paginationWrapper">
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </div>
    );
};

export default History;
