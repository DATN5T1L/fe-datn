import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { Card, Col, Image } from 'react-bootstrap';
import styles from '@public/styles/globalControl/CourseCard.module.css';
import { IconStar } from "@app/(user-global)/component/icon/icons"
interface CourseCardProps {
    course: {
        id: string;
        name_course: string;
        rating_course: number;
        views_course: number;
        instructor_avatar: string;
        instructor_name: string;
        num_chapter: number;
        num_document: number;
    };
    titleAction: number;
    onCourseClick?: (course: any) => void;
    showProgress?: boolean; // Prop để quyết định hiển thị ProgressCircle
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onCourseClick, showProgress = true, titleAction }) => {

    const handleCourseClick = () => {
        if (onCourseClick) onCourseClick(course);
    };
    const [title, setTitle] = useState<string>("")

    useEffect(() => {
        if (titleAction) {
            switch (titleAction) {
                case 1:
                    setTitle("Học ngay");
                    break;
                case 2:
                    setTitle("Xem chi tiết");
                    break;
                default:
                    setTitle("");
            }
        }

    }, [titleAction])

    return (
        <Col xs={12} sm={6} md={4} lg={3} className={styles.mainBox} key={course.id}>
            <Card className={styles.mainBox__content}>
                <Card.Header className={styles.headerContent}>
                    <section className={styles.headerContent__text}>
                        <Link href={`/course/${course.id}`}>
                            <Card.Title className={styles.text__hedding2}>
                                {course.name_course}
                            </Card.Title>
                        </Link>
                        <Card.Subtitle className={styles.text__hedding3}>by {course.instructor_name}</Card.Subtitle>
                        <Card.Img src="/img/iconReact.svg" alt="" className={styles.text__img} />
                    </section>
                    <Card.Img src="/img/tuan.png" alt="" className={styles.headerContent__avt} />
                </Card.Header>
                <Card.Body className={styles.mainContent}>
                    <section className={styles.mainContent__headContent}>
                        <div className={styles.headContent__evaluete}>
                            <div className={styles.evaluete__main}>
                                <div className={styles.starGroup}>
                                    {Array.from({ length: Math.round(course.rating_course) }).map((_, index) => (
                                        <IconStar />
                                    ))}
                                </div>
                                <Card.Text className={styles.starNumber}>
                                    {'('} {course.rating_course} {')'}
                                </Card.Text>
                            </div>
                        </div>
                        <div className={styles.headContent__percent}>
                            <Card.Text className={styles.evaluete__note}>
                                {'('} {course.views_course} lượt xem {')'}
                            </Card.Text>
                        </div>


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
                                <Card.Text className={styles.element__text}>{title}</Card.Text>
                            </Link>
                        </div>
                    </section>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default CourseCard;
