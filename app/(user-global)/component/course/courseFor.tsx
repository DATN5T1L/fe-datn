import { Card, Col, Container, Image, Row } from "react-bootstrap";
import Button from "../globalControl/btnComponent";
import styles from '@public/styles/home/CoursePro.module.css';
import styleFor from "@public/styles/course/coursefor.module.css";
import useSWR from "swr";
import { Course } from "@app/(user-global)/model/course"
import Link from "next/link";
import ProgressCircle from './ProgressCircle';


interface CourseForProps {
    id: number;
}
interface CourseCardProps extends Course {
    progress_percentage: number;
}
const fetcher = (url: string) => fetch(url).then(res => res.json());

const CourseFor: React.FC<CourseForProps> = ({ id }) => {

    const { data, error } = useSWR<{ status: string; message: string; courses: { user_id: string; data: CourseCardProps[] } }>(`/api/courseFor/${id}`, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    if (error) return <div>Error loading courses</div>;
    if (!data) return <div>Loading...</div>;

    const courses = Array.isArray(data?.courses?.data) ? data.courses.data : [];

    const progressList = courses.map((course) => ({
        course_id: course.course_id,
        progress_percentage: course.progress_percentage,
    }));

    localStorage.setItem('progress_percentages', JSON.stringify(progressList));

    return (

        <Container className={styleFor.container}>
            <section className={styleFor.main}>
                <h2 className={styleFor.main__title} aria-hidden={true}>Khóa học của bạn</h2>
                <p className={styleFor.main__subTitle}>
                    Khóa học của bạn là khóa học mà bạn đang học, bao gồm các khóa học mà bạn đã mua hoặc các khóa học miễn phí.
                </p>
            </section>
            <section className={styleFor.cta}>

                <div className={styleFor.ctaLeft}>
                    <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} height={40}>Khóa học có phí</Button>
                    <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} height={40}>Khóa học miễn phí</Button>
                </div>
                <Button type="secondery" status="hover" size="S" leftIcon={false} rightIcon={true} chevron={4} width={145} height={40}>Xem tất cả</Button>
            </section>
            <section className={styleFor.listCard}>
                <Row className={styleFor.mainCard}>
                    {courses.map(course => (
                        <Col md={4} className={styles.mainBox} key={course.course_id}>
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
                                    <section className={styles.mainContent__headContent}>
                                        <div className={styleFor.topHeader}>
                                            <div className={`${styles.headContent__evaluete} ${styleFor.headContent__evalueteFor}`}>
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
                                                <div className={styles.headContent__percent}>
                                                    <Card.Text className={styles.evaluete__note}>
                                                        {'('} {course.views_course} phản hồi {')'}
                                                    </Card.Text>
                                                </div>
                                            </div>
                                        </div>
                                        <ProgressCircle progress={course.progress_percentage} />
                                    </section>
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
                                            <Link href={`/learningCourse/${id}`} className={styleFor.linkCta}>
                                                <Image src="/img/bookopenyellow.svg" alt="" className={styles.element__img} />
                                                <Card.Text className={styles.element__text}>Học ngay</Card.Text>
                                            </Link>
                                        </div>
                                    </section>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>
        </Container>

    )
}

export default CourseFor