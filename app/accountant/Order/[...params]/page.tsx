'use client'
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap"
import { useParams } from "next/navigation";
import c from "../TransionDetail.module.css"
import CardCourse from "@app/(user-global)/component/course/CardCourse";
import { ShowNameElement, formatCurrency, calculateTimeAgo, formatParamString, decodeAndFormatDateTime } from '@app/(user-global)/component/globalControl/commonC'
const TransionDetail = () => {
    const params = useParams();
    const [id, status_tran, amount, payment_discription, created_at] = params.params;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [transion, setTransition] = useState<Course>();
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
            console.log(result)
            setTransition(result.course);
            setUser(result.user);
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
                            <Col xs={6}>
                                <h4>Thông tin người dùng</h4>
                                <p className={c.userName}>{user?.fullname}</p>
                                <p className={c.userName}>{user?.email}</p>
                            </Col>
                            <Col xs={6}>
                                <h4>Thông tin thanh toán</h4>
                                <p className={c.userName}>{formatCurrency(amountNumber)}</p>
                                <p className={c.userName}>{status}</p>
                                <p className={c.userName}>{decodeAndFormatDateTime(created_at)}</p>
                                <p className={c.userName}>{formatParamString(payment_discription)}</p>
                            </Col>

                        </Row>
                    </Col>

                </Row>
            )}


        </Container>
    )

}

export default TransionDetail