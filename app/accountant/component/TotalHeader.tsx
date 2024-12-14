import { useEffect, useState } from "react";
import h from "../component/Course/course.module.css";
import useCookie from '@app/(user-global)/component/hook/useCookie';
import { IconTotalUser, IconTotalOrder, IconTotalProfit, IconTotalOrderToday } from "@app/(user-global)/component/icon/icons";
import { formatCurrency, formatToVietnameseCurrencyText, ShowNameElement } from "@app/(user-global)/component/globalControl/commonC"
import { Col, Row } from "react-bootstrap";
const TotalHeader = () => {
    const [totalUser, setTotalUser] = useState<number>(0);
    const [totalCourse, setTotalCourse] = useState<number>(0);
    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const [totalToday, setTotalToday] = useState<number>(0);
    const token = useCookie('token');
    const fetchMultipleAPIs = async () => {
        try {
            if (token) {
                const responses = await Promise.all([
                    fetch(`/api/accountant/totalUser`, {
                        method: "GET",
                        headers: {
                            Authorization: `Barser ${token}`,
                        },
                    }),
                    fetch(`/api/accountant/totalEnroll`, {
                        method: "GET",
                        headers: {
                            Authorization: `Barser ${token}`,
                        },
                    }),

                    fetch(`/api/accountant/totalprofits`, {
                        method: "GET",
                        headers: {
                            Authorization: `Barser ${token}`,
                        },
                    }),
                    fetch(`/api/accountant/enrollmentToday`, {
                        method: "GET",
                        headers: {
                            Authorization: `Barser ${token}`,
                        },
                    }),

                ]);
                const failedResponse = responses.find((res) => !res.ok);
                if (failedResponse) {
                    throw new Error("One or more API requests failed");
                }

                // Parse tất cả phản hồi thành JSON
                const data = await Promise.all(responses.map((res) => res.json()));

                // Lấy dữ liệu từ các endpoint
                const totalUser = data[0].data.user_count;
                const totalCourse = data[1].data.enrollCount;
                const totalRevenue = data[2].totalRevenue;
                const totalTotal = data[3].enrollCountToday;

                console.log({ totalUser, totalCourse, totalRevenue });

                // Cập nhật state hoặc xử lý dữ liệu
                setTotalUser(totalUser);
                setTotalCourse(totalCourse);
                setTotalRevenue(totalRevenue);
                setTotalToday(totalTotal);
            }
        } catch (err: any) {
            console.error("Error:", err.message);
        }
    };
    useEffect(() => {
        if (token) {
            fetchMultipleAPIs()
        }
    }, [token])
    return (
        <Row className={h.container}>
            <Col xs={3} className={h.card_notice}>
                <div className={h.card_noticeContent}>
                    <p className={h.titleNotice}>Tổng người dùng</p>
                    <h6 className={h.totalNotice}>{totalUser}</h6>
                </div>
                <IconTotalUser />
            </Col>
            <Col xs={3} className={h.card_notice}>
                <div className={h.card_noticeContent}>
                    <p className={h.titleNotice}>Tổng đơn hàng</p>
                    <h6 className={h.totalNotice}>{totalCourse}</h6>
                </div>
                <IconTotalOrder />
            </Col>
            <Col xs={3} className={h.card_notice}>
                <div className={h.card_noticeContent}>
                    <p className={h.titleNotice}>Tổng lợi nhuận</p>
                    <h6 className={h.totalNotice}>{formatToVietnameseCurrencyText(totalRevenue)}</h6>
                </div>
                <IconTotalProfit />
            </Col>
            <Col xs={3} className={h.card_notice}>
                <div className={h.card_noticeContent}>
                    <p className={h.titleNotice}>Đơn hàng hôm nay</p>
                    <h6 className={h.totalNotice}>{totalToday}</h6>
                </div>
                <IconTotalOrderToday />
            </Col>
        </Row>
    )
}

export default TotalHeader;