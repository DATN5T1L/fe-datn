import { Card, Col, Container, Image, Row } from "react-bootstrap";
import Button from "../globalControl/btnComponent";
import styles from '@public/styles/home/CoursePro.module.css';
import styleFor from "@public/styles/course/coursefor.module.css";
import useSWR from "swr";
import CourseCard from "./CardCourse";
import { Course } from "@app/(user-global)/model/course"
import Link from "next/link";
import ProgressCircle from './ProgressCircle';

interface CourseForProps {
    id: number;
}
interface CourseCardProps extends Course {
    progress: number;
}
const fetcher = (url: string) => fetch(url).then(res => res.json());

const CourseFor: React.FC<CourseForProps> = ({ id }) => {
    const { data, error } = useSWR<{ status: string; message: string; data: CourseCardProps[] }>(`/api/courseFor/${id}`, fetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
    });

    if (error) return <div>Error loading courses</div>;
    if (!data) return <div>Loading...</div>;

    const courses = Array.isArray(data.data) ? data.data : [];

    console.log(courses);

    const courseData = {
        id: 1,
        name_course: 'React for Beginners',
        img_course: '/img/react-course.jpg',
        price_course: 49.99,
        rating_course: 4.5,
        chapters_count: 12,
        documents_count: 5,
        num_lesson: 50,
        instructor_id: 12,
        progress: 75,
        status_course: 'active', // Đảm bảo giá trị là 'active', 'inactive', hoặc 'archived'
        views_course: 1000,
        tax_rate: 0.1,
        del_flag: false,
        created_at: '2023-01-01',
        updated_at: '2023-01-10',
    };

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
                        <Col md={4} className={styles.mainBox} key={course.id}>
                            <Card className={styles.mainBox__content}>
                                <Card.Header className={styles.headerContent}>
                                    <section className={styles.headerContent__text}>
                                        <Link href={`/course/${course.id}`}>
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