'use client'
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useEffect, useState } from 'react';
import Button from "../globalControl/btnComponent";
import styles from '@public/styles/home/CoursePro.module.css';
import useSWR from 'swr';
import { Course } from "@/app/(user-global)/model/course";
import CourseCard from "../course/CardCourse";
import ReactLoading from 'react-loading';
import Link from 'next/link'
const fetcher = (url: string) => fetch(url).then(res => res.json());

const CoursePro: React.FC = () => {
    const [router, setRouter] = useState<string | undefined>('all'); // Mặc định là tất cả
    const [limit, setLimit] = useState<number | undefined>(); // Không giới hạn mặc định
    const [isCount, setIsCount] = useState(true); // Mặc định hiển thị tất cả

    // Hàm tạo URL API động
    const buildApiUrl = () => {
        let url = `/api/coursetype/pro`;
        const params = [];

        if (router) params.push(router);
        if (limit !== undefined) params.push(limit);

        if (params.length > 0) {
            url += `/${params.join('/')}`;
        }
        return url;
    };

    const url = buildApiUrl();
    console.log(url)

    // Sử dụng SWR để gọi API
    const { data, error, isValidating } = useSWR<{ status: string; message: string; data: Course[] }>(
        buildApiUrl(),
        fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            revalidateIfStale: false,
        }
    );

    const courses = Array.isArray(data?.data) ? data?.data : [];

    // Xử lý khi thay đổi lộ trình
    const handlePathChange = (path: string) => {
        setRouter(path);
        setLimit(8); // Hiển thị 8 khóa học mặc định khi chọn lộ trình
        setIsCount(false);
    };

    // Xử lý khi chọn Ẩn bớt/Xem thêm
    const handleCountAll = () => {
        setRouter('all'); // Đặt lại về lộ trình tất cả
        setIsCount(!isCount); // Toggle trạng thái
        setLimit(isCount ? 8 : undefined); // Giới hạn hoặc không giới hạn
    };

    return (
        <Container className={styles.container}>
            {/* Header */}
            <Row className={styles.header}>
                <Col className={styles.header__content}>
                    <Image src="/img/GroupLeft.svg" alt="Học lập trình bài bản với TTO.sh" className={styles.header__content__leftIcon} />
                    <section className={styles.main}>
                        <div className={styles.main__title}>
                            <div className={styles.main__title__strokeLeft}>
                                <div className={styles.strokeLeft__element}></div>
                            </div>
                            <h2 className={styles.main__title__content} aria-hidden={true}>Khóa học Pro</h2>
                            <div className={styles.main__title__strokeRight}>
                                <div className={styles.strokeRight__element}></div>
                            </div>
                        </div>
                        <div className={styles.main__subTitle}>
                            Chương trình học đa dạng sẽ giúp bạn tiến gần hơn đến ước mơ của mình.
                            Dù học trực tiếp hay trực tuyến,
                            bạn chắc chắn sẽ tìm thấy khóa học phù hợp với mục tiêu của mình.
                        </div>
                    </section>
                    <Image src="/img/GroupRight.svg" alt="Chọn lộ trình học Frontend tại tto.SH" className={styles.header__content__rightIcon} />
                </Col>
            </Row>

            {/* Navigation */}
            <Row className={styles.nav}>
                <Col className={styles.nav__btn__muti}>
                    <Button
                        type={"premary"}
                        status="hover"
                        size="S"
                        leftIcon={false}
                        rightIcon={false}
                        height={40}
                        onClick={() => handlePathChange("lo-trinh-front-end")}
                    >
                        Lộ trình Front-end
                    </Button>
                    <Button
                        type={"premary"}
                        status="hover"
                        size="S"
                        leftIcon={false}
                        rightIcon={false}
                        height={40}
                        onClick={() => handlePathChange("lo-trinh-hoc-back-end")}
                    >
                        Lộ trình Back-end
                    </Button>
                    <Button
                        type={"premary"}
                        status="hover"
                        size="S"
                        leftIcon={false}
                        rightIcon={false}
                        width={225}
                        height={40}
                        onClick={() => handlePathChange("lo-trinh-designer")}
                    >
                        Lộ trình Desiger
                    </Button>
                    <Button
                        type={"premary"}
                        status="hover"
                        size="S"
                        leftIcon={false}
                        rightIcon={false}
                        width={245}
                        height={40}
                        onClick={() => handlePathChange("lo-trinh-tester")}
                    >
                        Lộ trình Tester
                    </Button>
                </Col>
                <Col className={styles.nav__btn__single}>
                    <Button
                        type="secondery"
                        status="hover"
                        size="S"
                        leftIcon={false}
                        rightIcon={true}
                        width={145}
                        height={40}
                        chevron={4}
                        onClick={handleCountAll}
                    >
                        {isCount ? 'Ẩn bớt' : 'Xem tất cả'}
                    </Button>
                </Col>
            </Row>

            {/* Loading */}
            {isValidating && (
                <ReactLoading type={"spin"} color={'rgba(7, 85, 192, 1)'} height={'32px'} width={'32px'} className={styles.align} />
            )}

            {/* Course List */}
            <Row md={12} className={styles.main__course}>
                {courses?.map((course, index) => (
                    <CourseCard key={index} course={course} titleAction={2} />
                ))}
            </Row>
        </Container>
    );
};
export default CoursePro;
