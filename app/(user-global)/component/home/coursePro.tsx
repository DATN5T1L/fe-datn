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
    const [router, setRouter] = useState<string>("lo-trinh-front-end"); // Lộ trình mặc định là FE
    const [limit, setLimit] = useState<number>(8);
    const [isCount, setIsCount] = useState(false);
    // const [selectedPath, setSelectedPath] = useState<string>("lo-trinh-front-end"); // Để hiển thị nút nào được chọn

    const { data, error, isValidating } = useSWR<{ status: string; message: string; data: Course[] }>(
        `/api/coursetype/pro/${router}/${limit}`,
        fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            revalidateIfStale: false
        }
    );

    const courses = Array.isArray(data?.data) ? data?.data : [];

    const handlePathChange = (path: string) => {
        setRouter(path);
        // setSelectedPath(path);
    };

    const handleCountAll = () => {
        setIsCount(!isCount);
        setLimit(isCount ? 8 : 20); // Hiển thị 8 khóa học hoặc toàn bộ
    };

    if (error) return <div>Error loading courses</div>;

    return (
        <Container className={styles.container}>
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

            <Row className={styles.nav}>
                <Col className={styles.nav__btn__muti}>
                    <Button
                        type={"premary"} // Đổi màu nếu nút được chọn
                        status="hover"
                        size="S"
                        leftIcon={false}
                        rightIcon={false}
                        height={40}
                        onClick={() => handlePathChange("lo-trinh-front-end")}
                    >
                        Khóa học lộ trình FE
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
                        Khóa học lộ trình BE
                    </Button>
                    <Button
                        type={"premary"}
                        status="hover"
                        size="S"
                        leftIcon={false}
                        rightIcon={false}
                        width={225}
                        height={40}
                        onClick={() => handlePathChange("Tester")}
                    >
                        Khóa học lộ trình Tester
                    </Button>
                    <Button
                        type={"premary"}
                        status="hover"
                        size="S"
                        leftIcon={false}
                        rightIcon={false}
                        width={245}
                        height={40}
                        onClick={() => handlePathChange("Designer")}
                    >
                        Khóa học lộ trình Designer
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
                        {isCount ? 'Ẩn bớt' : 'Xem thêm'}
                    </Button>
                </Col>
            </Row>

            {isValidating && (
                <ReactLoading type={"spin"} color={'rgba(7, 85, 192, 1)'} height={'32px'} width={'32px'} className={styles.align} />
            )}

            <Row md={12} className={styles.main__course}>
                {courses?.map((course, index) => (
                    <CourseCard key={index} course={course} titleAction={2} />
                ))}
            </Row>
        </Container>
    );
};

export default CoursePro;
