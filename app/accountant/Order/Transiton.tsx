'use client';
import { useState, useEffect } from "react";
import h from "../component/Course/course.module.css";
import Table from "react-bootstrap/Table";
import Card from './CardTransition';
const Transion = () => {
    const [year, setYear] = useState<string>("year");
    const [type, setType] = useState<string>("all");
    const [arrange, setArrange] = useState<string>("desc");
    const [transion, setTransition] = useState<Payment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWeeklyStatistics = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/accountant/transtionStatisticsRequest/${year}/${type}/${arrange}`);
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const result = await response.json();
            setTransition(result.data || []);
        } catch (error: any) {
            console.error("Error fetching data:", error);
            setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWeeklyStatistics();
    }, [year, type, arrange]);

    return (
        <main>
            <h2 className={h.heading}>Lịch sử thanh toán của người dùng</h2>

            {/* Bộ lọc */}
            <div className={h.filters}>
                <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className={h.filter}
                >
                    <option value="day">Ngày</option>
                    <option value="week">Tuần</option>
                    <option value="month">Tháng</option>
                    <option value="year">Năm</option>
                </select>

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className={h.filter}
                >
                    <option value="all">Tất cả</option>
                    <option value="completed">Hoàn tất</option>
                    <option value="pending">Đang chờ</option>
                    <option value="canceled">Hủy bỏ</option>
                    <option value="failed">Thất bại</option>
                </select>
                <select
                    value={arrange}
                    onChange={(e) => setArrange(e.target.value)}
                    className={h.filter}
                >
                    <option value="desc">Cũ nhất</option>
                    <option value="asc">Mới nhất</option>

                </select>
            </div>

            {/* Hiển thị trạng thái loading / lỗi */}

            <Table bordered hover className={`${h.table} table-responsive`}>
                <thead>
                    <tr>
                        <th>Số thứ tự</th>
                        <th>Giá</th>
                        <th>Ghi chú</th>
                        <th>Trạng thái</th>
                        <th>Thời gian</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <p>Đang tải dữ liệu...</p>
                    ) : error ? (
                        <p className={h.error}>{error}</p>
                    ) : transion.length === 0 ? (
                        <p>Không có dữ liệu để hiển thị.</p>
                    ) : (

                        transion.map((item, index) => (
                            <Card key={index} data={item} />
                        ))
                    )}
                </tbody>
            </Table>
        </main>
    );
};

export default Transion;
