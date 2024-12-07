import React from 'react';
import { Card } from 'react-bootstrap';
import Image from 'next/image';
import ProgressCircle from './ProgressCircle';
import styles from "@public/styles/course/CourseCard.module.css";
import { Course } from "@app/(user-global)/model/course";

interface CourseCardProps extends Course {
    progress: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
    name_course,
    img_course,
    price_course,
    rating_course,
    chapters_count,
    documents_count,
    num_lesson,
    instructor_id,
    progress,
}) => {
    return (
        <Card className={styles.courseCard}>
            <Card.Header className={styles.header}>
                <section className={styles.headerText}>
                    <Card.Title className={styles.title}>
                        {name_course}
                    </Card.Title>
                    <Card.Subtitle className={styles.subtitle}>
                        by Team {instructor_id}
                    </Card.Subtitle>
                    <Card.Img src="/img/iconReact.svg" alt="Icon" className={styles.icon} />
                </section>
                <Card.Img src={img_course} alt="Course Image" className={styles.courseImage} />
            </Card.Header>
            <Card.Body className={styles.body}>
                <section className={styles.headerContent}>
                    <div className={styles.evaluation}>
                        <div className={styles.evaluationMain}>
                            <div className={styles.starGroup}>
                                {[...Array(5)].map((_, index) => (
                                    <Image
                                        key={index}
                                        src="/img/iconStar.svg"
                                        alt="Star Icon"
                                        className={styles.star}
                                    />
                                ))}
                            </div>
                            <Card.Text className={styles.ratingText}>
                                {'('} {rating_course} {')'}
                            </Card.Text>
                        </div>
                    </div>
                    <ProgressCircle progress={progress} />
                </section>
                <section className={styles.bodyContent}>
                    <div className={styles.contentElement}>
                        <Image src="/img/bookoffgreen.svg" alt="Chapters Icon" className={styles.elementIcon} />
                        <Card.Text className={styles.elementText}>{chapters_count} Chương</Card.Text>
                    </div>
                    <div className={styles.contentElement}>
                        <Image src="/img/bookopenblue.svg" alt="Exercises Icon" className={styles.elementIcon} />
                        <Card.Text className={styles.elementText}>{num_lesson} Bài tập</Card.Text>
                    </div>
                    <div className={styles.contentElement}>
                        <Image src="/img/bookopenyellow.svg" alt="Documents Icon" className={styles.elementIcon} />
                        <Card.Text className={styles.elementText}>{documents_count}Học ngay</Card.Text>
                    </div>
                </section>
            </Card.Body>
        </Card>

    );
};

export default CourseCard;
