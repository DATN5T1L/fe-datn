'use client'
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useEffect, useState } from 'react';
import Button from "../globalControl/btnComponent";
import styles from '@public/styles/home/CoursePro.module.css';
import useSWR from 'swr';
import { Course } from "@/app/(user-global)/model/course";
import CourseCard from "../course/CardCourse";
import ReactLoading from 'react-loading';
const fetcher = (url: string) => fetch(url).then(res => res.json());

const CoursePro: React.FC = () => {
    const [router, setRouter] = useState<string>("FE"); // Lộ trình mặc định là FE
    const [limit, setLimit] = useState<number>(8);
    const [isCount, setIsCount] = useState(false);
    const [selectedPath, setSelectedPath] = useState<string>("FE"); // Để hiển thị nút nào được chọn

    const { data, error, isValidating } = useSWR<{ status: string; message: string; data: Course[] }>(
        `/api/coursetype/pro/${router}/${limit}`,
        fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            revalidateIfStale: false
        }
    );

    const courses = Array.isArray(data?.data) ? data.data : [];

    const handlePathChange = (path: string) => {
        setRouter(path);
        setSelectedPath(path);
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
                    <Image src="/img/GroupLeft.svg" alt="group left" className={styles.header__content__leftIcon} />
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
                    <Image src="/img/GroupRight.svg" alt="group right" className={styles.header__content__rightIcon} />
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
                        onClick={() => handlePathChange("FE")}
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
                        onClick={() => handlePathChange("BE")}
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

            <Row md={12} className={styles.main__course}>
                {isValidating && (<ReactLoading type={"bubbles"} color={'rgba(153, 153, 153, 1)'} height={'10%'} width={'10%'} className={styles.align} />)}
                {courses?.map((course,index) => (
                    <Col md={4} className={styles.mainBox} key={index}>
                        <Card className={styles.mainBox__content}>
                            <Card.Header className={styles.headerContent}>
                                <section className={styles.headerContent__text}>
                                    <Link href={`/course/${course.course_id}`}>
                                        <Card.Title className={styles.text__hedding2}>
                                            {course.name_course}
                                        </Card.Title>
                                    </Link>
                                    <Card.Subtitle className={styles.text__hedding3}>
                                        by My Team
                                    </Card.Subtitle>
                                    <Card.Img src="/img/iconReact.svg" alt="" className={styles.text__img} />
                                </section>
                                <Card.Img src="/img/tuan.png" alt="" className={styles.headerContent__avt} />
                            </Card.Header>
                            <Card.Body className={styles.mainContent}>
                                <section className={styles.bodyContent}>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookoffgreen.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>{course.num_lesson} Chương</Card.Text>
                                    </div>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookopenblue.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>{course.documents_count} Bài tập</Card.Text>
                                    </div>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookopenyellow.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>Học ngay</Card.Text>
                                    </div>
                                </section>
                                <section className={styles.mainContent__headContent}>
                                    <div className={styles.headContent__evaluete}>
                                        <div className={styles.evaluete__main}>
                                            <div className={styles.starGroup}>
                                                {/* Star rating */}
                                                {Array.from({ length: Math.round(course.rating_course) }).map((_, index) => (
                                                    <Image key={index} src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                ))}
                                            </div>
                                            <Card.Text className={styles.starNumber}>
                                                {'('} {course.rating_course} {')'}
                                            </Card.Text>
                                        </div>
                                    </div>
                                    <div className={styles.headContent__percent}>
                                        <Card.Text className={styles.evaluete__note}>
                                            {'('} {course.views_course} phản hồi {')'}
                                        </Card.Text>
                                    </div>
                                </section>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CoursePro;
