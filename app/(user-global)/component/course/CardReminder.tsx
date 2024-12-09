import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Card, Col, Image, Row } from 'react-bootstrap';
import ProgressCircle from './ProgressCircle';
import styles from '@public/styles/globalControl/CourseCard.module.css';
import { IconPlus, IconX, IconEdit, IconPush } from "@app/(user-global)/component/icon/icons";
import Tippy from '@tippyjs/react/headless';
import { useEscapeKey } from "@app/(user-global)/component/globalControl/commonC";

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
                    <Card.Header className={styles.headerContent}>
                        <section className={styles.headerContent__text}>
                            <Link href={`/course/${data.id}`}>
                                <Card.Title className={styles.text__hedding2}>
                                    {data.name_course}
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

                                            {Array.from({ length: Math.round(data.rating_course) }).map((_, index) => (
                                                <Image key={index} src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                            ))}

                                        </div>
                                        <Card.Text className={styles.starNumber}>
                                            {'('} {data.rating_course} {')'}
                                        </Card.Text>
                                    </div>
                                    <div className={styles.headContent__percent}>
                                        <Card.Text className={styles.evaluete__note}>
                                            {'('} {data.views_course} phản hồi {')'}
                                        </Card.Text>
                                    </div>
                                </div>
                            </div>
                            <ProgressCircle progress={data.progress_percentage} />
                        </section>
                        <section className={styles.bodyContent}>
                            <div className={styles.bodyContent__element}>
                                <Image src="/img/bookoffgreen.svg" alt="" className={styles.element__img} />
                                <Card.Text className={styles.element__text}>{data.num_chapter} Chương</Card.Text>
                            </div>
                            <div className={styles.bodyContent__element}>
                                <Image src="/img/bookopenblue.svg" alt="" className={styles.element__img} />
                                <Card.Text className={styles.element__text}>{data.num_document} Bài tập</Card.Text>
                            </div>
                            <div className={styles.bodyContent__element}>
                                <Link href={`/learningCourse/${data.id}`} className={styles.linkCta}>
                                    <Image src="/img/bookopenyellow.svg" alt="" className={styles.element__img} />
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
            </Col>
            {isTippy && (
                <ReminderDetail course_id={data.id} name_course={data.name_course} token={token} onLose={tonggleTippy} key={data.id} />
            )}

        </>
    );
};

export default CourseCardReminder;
