import React from 'react';
import Link from 'next/link';
import { Card, Col, Image } from 'react-bootstrap';
import Button from "../globalControl/btnComponent";
import ProgressCircle from './ProgressCircle';
import styles from '@public/styles/globalControl/CourseCard.module.css';
import r from '@public/styles/course/Reminder.module.css'
import { IconDetai } from "@app/(user-global)/component/icon/icons";
interface CourseCardProps {
    course: {
        id: string;
        name_course: string;
        rating_course: number;
        views_course: number;
        progress_percentage: number;
        instructor_avatar: string;
        num_chapter: number;
        num_document: number;
    };
    onCourseClick?: (course: any) => void;
    showProgress?: boolean; // Prop để quyết định hiển thị ProgressCircle
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onCourseClick, showProgress = true }) => {

    const handleCourseClick = () => {
        if (onCourseClick) onCourseClick(course);
    };

    return (
        <Col md={6} className={r.mainBox} key={course.id} style={{
            padding: "0px"
        }}>
            <Card className={styles.mainBox__content} style={{
                maxWidth: "272px"
            }}>
                <Card.Header className={styles.headerContent}>
                    <section className={styles.headerContent__text}>
                        <Link href={`/course/${course.id}`}>
                            <Card.Title className={styles.text__hedding2}>
                                {course.name_course}
                            </Card.Title>
                        </Link>
                        <Card.Subtitle className={styles.text__hedding3}>by My Team</Card.Subtitle>
                        <Card.Img src="/img/iconReact.svg" alt="" className={styles.text__img} />
                    </section>
                    <Card.Img src="/img/tuan.png" alt="" className={styles.headerContent__avt} />
                </Card.Header>
                <Card.Body className={styles.mainContent}>
                    <section className={styles.mainContent__headContent}>
                        <div className={styles.topHeader}>
                            <div className={`${styles.headContent__evaluete} ${styles.headContent__evalueteFor}`}>
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
                            <Card.Text className={styles.element__text}>{course.num_chapter} Chương</Card.Text>
                        </div>
                        <div className={styles.bodyContent__element}>
                            <Image src="/img/bookopenblue.svg" alt="" className={styles.element__img} />
                            <Card.Text className={styles.element__text}>{course.num_document} Bài tập</Card.Text>
                        </div>
                        <div className={styles.bodyContent__element}>
                            <Link href={`/learningCourse/${course.id}`} className={styles.linkCta} onClick={handleCourseClick}>
                                <Image src="/img/bookopenyellow.svg" alt="" className={styles.element__img} />
                                <Card.Text className={styles.element__text}>Học ngay</Card.Text>
                            </Link>
                        </div>
                    </section>
                </Card.Body>
            </Card>
            <div className={r.Reminders}>
                <div className={r.TimeDetail}>
                    <div className={r.time}>
                        Thứ 6  - 12:20
                    </div>
                    <span className={r.time}><IconDetai /></span>
                </div>
                <div className={r.ContentReminder}>
                    <p className={r.docFor}>Bạn đang học tới bài học</p>
                    <p className={r.docContent}>Bài học Javascipt</p>
                    <Link href={`learningCourse/`} className={r.docLearning}>Học tiếp</Link>
                </div>
                <div className={r.cta}>
                    <Button

                        type="premary"
                        status="noBorder"
                        size="S"
                        height={40}
                        leftIcon={false}
                        rightIcon={false}
                    >
                        Hủy
                    </Button>
                    <Button

                        type="premary"
                        status="hover"
                        size="S"
                        height={40}
                        leftIcon={false}
                        rightIcon={false}
                    >
                        Lưu
                    </Button>
                </div>
            </div>
        </Col>
    );
};

export default CourseCard;
