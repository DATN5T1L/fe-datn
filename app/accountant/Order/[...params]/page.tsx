'use client'
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap"
import { useParams } from "next/navigation";
import c from "../TransionDetail.module.css"
import CardCourse from "@app/(user-global)/component/course/CardCourse";
import Table from "react-bootstrap/Table";
import { ShowNameElement, formatCurrency, calculateTimeAgo, formatParamString, decodeAndFormatDateTime } from '@app/(user-global)/component/globalControl/commonC'
import Card from "./CardTransition"
const TransionDetail = () => {
    const params = useParams();
    const [id, status_tran, amount, payment_discription, created_at] = params.params;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [transion, setTransition] = useState<Course>();
    const [transionUser, setTransitionUser] = useState<PaymentDetail[]>([]);
    const [user, setUser] = useState<UserBasic>()
    const amountNumber: number = Number(amount);
    const getSatus = () => {
        switch (status_tran) {
            case 'completed':
                return {
                    status: "Thanh toán thành công",
                };
            case 'pending':
                return {
                    status: "Thanh toán đang đợi để được thành công",
                };
            case 'failed':
                return {
                    status: 'Thanh toán thất bại',
                };

            default:
                return {
                    status: 'Thanh toán thất bại',
                };
        }
    };
    const { status } = getSatus()
    const fetchTransionDetail = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/accountant/getDetailTranstion/${id}`);

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const result = await response.json();
            // console.log(result)
            setTransition(result.course);
            setUser(result.user);
        } catch (error: any) {
            console.error("Error fetching data:", error);
            setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };
    const fetchTransionUser = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/accountant/userByTranstion/${user?.phonenumber === null ? user.email : user?.phonenumber}`);

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const result = await response.json();
            console.log(result)
            setTransitionUser(result.data);
        } catch (error: any) {
            console.error("Error fetching data:", error);
            setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (id) fetchTransionDetail();
    }, [id])
    useEffect(() => {
        if (user) fetchTransionUser();
    }, [user])
    return (
        <Container>
            <Row>
                <h2 className={c.heaing}>Chi tiết thanh toán</h2>
            </Row>


            {isLoading ? (
                <p>Đang tải dữ liệu...</p>
            ) : error ? (
                <p className={c.error}>{error}</p>
            ) : (
                <Row>
                    {transion && (
                        <CardCourse course={transion} titleAction={2} />
                    )}

                    <Col xs={9}>
                        <Row>
                            <Col xs={6} >
                                <h4 className={c.title}>Thông tin người dùng</h4>
                                <p className={c.content}>Tên người dùng: {user?.fullname}</p>
                                <p className={c.content}>Email: {user?.email}</p>
                                <p className={c.content}>Số điện thoại: {user?.phonenumber === null ? ("Chưa cập nhật") : user?.phonenumber}</p>
                            </Col>
                            <Col xs={6}>
                                <h4 className={c.title}>Thông tin thanh toán</h4>
                                <p className={c.content}>Tổng tiền: {formatCurrency(amountNumber)}</p>
                                <p className={c.content}>Trạng thái: {status}</p>
                                <p className={c.content}>Thời gian: {decodeAndFormatDateTime(created_at)}</p>
                                <p className={c.content}>Chi tiết: {formatParamString(payment_discription)}</p>
                            </Col>

                        </Row>
                    </Col>
                </Row>
            )}
            <Table bordered hover className={`${c.table} table-responsive`}>
                <thead>
                    <tr>
                        <th>Số thứ tự</th>
                        <th>Khóa học</th>
                        <th>Phương thức thanh toán</th>
                        <th>Giá</th>
                        <th>Ghi chú</th>
                        <th>Trạng thái</th>
                        <th>Thời gian</th>

                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <p>Đang tải dữ liệu...</p>
                    ) : error ? (
                        <p className={c.error}>{error}</p>
                    ) : transionUser && transionUser.length === 0 ? (
                        <p>Không có dữ liệu để hiển thị.</p>
                    ) : (
                        transionUser.map((item, index) => (
                            <Card key={index} data={item} index={index + 1} />
                        ))
                    )}
                </tbody>
            </Table>

        </Container>
    )

}

export default TransionDetail