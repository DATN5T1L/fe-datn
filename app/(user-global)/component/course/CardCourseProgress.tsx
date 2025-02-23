import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';
import { Card, Col, Image } from 'react-bootstrap';
import ProgressCircle from './ProgressCircle'; // Component vòng tròn tiến độ
import styles from '@public/styles/globalControl/CourseCard.module.css';// CSS module
import { IconStart } from "@app/(user-global)/component/icon/icons"
import { getInitials } from '../globalControl/commonC';
interface CourseCardProps {
    course: {
        id: string;
        name_course: string;
        rating_course: number;
        views_course: number;
        progress_percentage: number;
        instructor_avatar: string;
        instructor_name: string;
        num_chapter: number;
        num_document: number;
        slug_course: string;
        img_course: string;
        status_course_enrollment: string;
    };
    onCourseClick?: (course: any) => void;
    showProgress?: boolean; // Prop để quyết định hiển thị ProgressCircle
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onCourseClick, showProgress = true }) => {

    const handleCourseClick = () => {
        if (onCourseClick) onCourseClick(course);
    };

    return (
        <Col md={3} className={styles.mainBox} key={course.id}>
            <Card className={styles.mainBox__content}>
                <Link href={`/course/${course.slug_course}`}>
                    <Card.Header className={styles.headerContent}>
                        <section className={styles.headerContent__text}>

                            <Card.Title className={styles.text__hedding2}>
                                {course.name_course}
                            </Card.Title>

                            <Card.Subtitle className={styles.text__hedding3}>by {getInitials(course.instructor_name)}</Card.Subtitle>
                            <Card.Img src={course.img_course} alt="" className={styles.text__img} />
                        </section>
                        <Card.Img src="https://res.cloudinary.com/dnmc89c8b/image/upload/v1734067691/fe_image/hinhgau2.png" alt="" className={styles.headerContent__avt} />
                    </Card.Header>
                </Link>
                <Card.Body className={styles.mainContent}>
                    <section className={styles.mainContent__headContent}>
                        <div className={styles.topHeader}>
                            <div className={`${styles.headContent__evaluete} ${styles.headContent__evalueteFor}`}>
                                <div className={styles.evaluete__main}>
                                    <div className={styles.starGroup}>
                                        {/* Star rating */}
                                        {Array.from({ length: Math.round(course.rating_course) }).map((_, index) => (
                                            <Image key={index} src="/img/iconStar.svg" alt="Lập trình ReactJS từ cơ bản đến nâng cao với tto" className={styles.starElement} />
                                        ))}

                                    </div>
                                    <Card.Text className={styles.starNumber}>
                                        {course.rating_course > 0 ? (
                                            <span></span>
                                        ) : (
                                            <span className={styles.ratingCourse}>Chưa có đánh giá</span>
                                        )}
                                    </Card.Text>
                                </div>
                                <div className={styles.headContent__percent}>
                                    <Card.Text className={styles.evaluete__note}>
                                        {'('} {course.views_course} lượt xem{')'}
                                    </Card.Text>
                                </div>
                            </div>
                        </div>
                        {course.progress_percentage === 100 ? (
                            <div className={styles.Completed}>
                                <span>Đã hoàn thành</span>
                            </div>
                        ) : course.progress_percentage > 0 ? (
                            <ProgressCircle progress={course.progress_percentage} />
                        ) : (
                            <div className={styles.StartLearning}>
                                <IconStart />
                            </div>
                        )}

                    </section>
                    <section className={styles.bodyContent}>
                        <div className={styles.bodyContent__element}>
                            <Image src="/img/bookoffgreen.svg" alt="Xây dựng website responsive cùng tto.sh" className={styles.element__img} />
                            <Card.Text className={styles.element__text}>{course.num_chapter} Chương</Card.Text>
                        </div>
                        <div className={styles.bodyContent__element}>
                            <Image src="/img/bookopenblue.svg" alt="Xây dựng website responsive cùng tto.sh" className={styles.element__img} />
                            <Card.Text className={styles.element__text}>{course.num_document} Bài tập</Card.Text>
                        </div>
                        <div className={styles.bodyContent__element}>
                            <Link href={`/learningCourse/${course.slug_course}/${course.status_course_enrollment}`} className={styles.linkCta} onClick={handleCourseClick}>
                                <Image src="/img/bookopenyellow.svg" alt="Xây dựng website responsive cùng tto.sh" className={styles.element__img} />
                                <Card.Text className={styles.element__text}>{course.progress_percentage ? "Tiếp tục học" : "Học ngay"}</Card.Text>
                            </Link>
                        </div>
                    </section>
                </Card.Body>
            </Card>
        </Col>
    );
};
export default CourseCard;
