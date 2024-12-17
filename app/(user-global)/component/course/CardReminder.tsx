import React, { useState } from 'react';
import Link from 'next/link';
import { Card, Col, Image, Row } from 'react-bootstrap';
import ProgressCircle from './ProgressCircle';
import styles from '@public/styles/globalControl/CourseCard.module.css';
import { IconPlus, IconStart } from "@app/(user-global)/component/icon/icons";
import { getInitials, useEscapeKey } from "@app/(user-global)/component/globalControl/commonC";

import Button from "@app/(user-global)/component/globalControl/btnComponent";
import r from '@public/styles/course/Reminder.module.css';
import ReminderDetail from "@app/(user-global)/Reminder/RinmenderDetail";

interface DataReminderItem {
    data: CourseReminders,
    token: string | null
}

const CourseCardReminder: React.FC<DataReminderItem> = ({ data, token }) => {
    console.log(data)
    const [isTippy, setIsTippy] = useState<boolean>(false);

    // const [idReminder, setIdReminder] = useState<string>("")
    const tonggleTippy = () => {
        setIsTippy(prev => !prev)
    }

    useEscapeKey(tonggleTippy);
    return (
        <>
            <Col md={6} className={r.mainBox} style={{
                padding: "16px 0px"
            }}>
                <Card className={styles.mainBox__content} style={{
                    minWidth: "272px",
                    maxWidth: "272px",
                }}>
                    <Link href={`/course/${data.slug_course}`}>
                        <Card.Header className={styles.headerContent}>
                            <section className={styles.headerContent__text}>
                                <Card.Title className={styles.text__hedding2}>
                                    {data.name_course}
                                </Card.Title>
                                <Card.Subtitle className={styles.text__hedding3}>by {getInitials(data.instructor_name)}</Card.Subtitle>
                                <Card.Img src="/img/iconReact.svg" alt="Khóa học Node.js cơ bản tại TTO.sh" className={styles.text__img} />
                            </section>
                            <Card.Img src="https://res.cloudinary.com/dnmc89c8b/image/upload/v1734067208/fe_image/Hinhgau.png" alt="Xây dựng giao diện web chuyên nghiệp tại TTO.sh" className={styles.headerContent__avt} />
                        </Card.Header>
                    </Link>
                    <Card.Body className={styles.mainContent}>
                        <section className={styles.mainContent__headContent}>
                            <div className={styles.topHeader}>
                                <div className={`${styles.headContent__evaluete} ${styles.headContent__evalueteFor}`}>
                                    <div className={styles.evaluete__main}>
                                        <div className={styles.starGroup}>

                                            {Array.from({ length: Math.round(data.rating_course) }).map((_, index) => (
                                                <Image key={index} src="/img/iconStar.svg" alt="Học HTML5 và CSS3 cùng TTO.sh" className={styles.starElement} />
                                            ))}

                                        </div>

                                    </div>
                                    <div className={styles.headContent__percent}>
                                        <Card.Text className={styles.evaluete__note}>
                                            {'('} {data.views_course} phản hồi {')'}
                                        </Card.Text>
                                    </div>
                                </div>
                            </div>
                            {data.progress_percentage === 100 ? (
                                <div className={styles.Completed}>
                                    <span>Đã hoàn thành</span>
                                </div>
                            ) : data.progress_percentage > 0 ? (
                                <ProgressCircle progress={data.progress_percentage} />
                            ) : (
                                <div className={styles.StartLearning}>
                                    <IconStart />
                                </div>
                            )}
                        </section>
                        <section className={styles.bodyContent}>
                            <div className={styles.bodyContent__element}>
                                <Image src="/img/bookoffgreen.svg" alt="Chứng chỉ hoàn thành khóa học" className={styles.element__img} />
                                <Card.Text className={styles.element__text}>{data.num_chapter} Chương</Card.Text>
                            </div>
                            <div className={styles.bodyContent__element}>
                                <Image src="/img/bookopenblue.svg" alt="Chứng chỉ hoàn thành khóa học" className={styles.element__img} />
                                <Card.Text className={styles.element__text}>{data.num_document} Bài tập</Card.Text>
                            </div>
                            <div className={styles.bodyContent__element}>
                                <Link href={`/learningCourse/${data.id}`} className={styles.linkCta}>
                                    <Image src="/img/bookopenyellow.svg" alt="Chứng chỉ hoàn thành khóa học" className={styles.element__img} />
                                    <Card.Text className={styles.element__Watched}>{data.watchedVideos} đã học</Card.Text>
                                </Link>
                            </div>
                        </section>
                    </Card.Body>
                </Card>
                <div className={r.Reminders}>
                    <div className={r.content}>
                        <div className={r.TimeDetail}>

                            {data.has_reminders ? (
                                <p> Xem chi tiết lịch học</p>
                            ) : (
                                <p>Chưa tạo nhắc nhỏ</p>
                            )}




                        </div>
                        <div className={r.ContentReminder}>
                            <p className={r.docFor}>Bạn đang học tới bài học</p>
                            <p className={r.docContent}>{data.name_documents}</p>
                        </div>
                        <div className={r.cta}>
                            <Link href={`/learningCourse/${data.id}`}>
                                <Button

                                    type="secondery"
                                    status="hover"
                                    size="S"
                                    height={40}
                                    leftIcon={false}
                                    rightIcon={false}
                                >
                                    Học ngay
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <span className={r.time} onClick={tonggleTippy}><IconPlus /></span>
                </div>
            </Col >
            {isTippy && (
                <ReminderDetail course_id={data.id} name_course={data.name_course} token={token} onLose={tonggleTippy} key={data.id} />
            )
            }

        </>
    );
};

export default CourseCardReminder;
