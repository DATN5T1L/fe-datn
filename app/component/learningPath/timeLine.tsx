'use client'

import { Col, Row } from "react-bootstrap"
import styles from '@public/styles/learningPath/TimeLine.module.css'

interface TimeLineProps {
    title: string;
}

const TimeLine: React.FC<TimeLineProps> = ({title=''}) => {
    return (
        <>
            <Row className={styles.conatiner}>
                <Col className={styles.main}>
                    <h2 className={styles.title}>
                        THỜI GIAN DỰ KIẾN CHO LỘ TRÌNH {title}
                    </h2>
                    <div className={styles.body}>
                        <article className={styles.body__start}>
                            <div className={styles.content}>
                                <div className={styles.content__left}>
                                    HTML&CSS
                                </div>
                                <div className={styles.content__right}>
                                    2-3 tuần
                                </div>
                            </div>
                            <div className={styles.content}>
                                <div className={styles.content__left}>
                                    JAVASCRIPT
                                </div>
                                <div className={styles.content__right}>
                                    4-6 tuần
                                </div>
                            </div>
                            <div className={styles.content}>
                                <div className={styles.content__left}>
                                    REPONSIVE WEB
                                </div>
                                <div className={styles.content__right}>
                                    4-6 tuần
                                </div>
                            </div>
                            <div className={styles.content}>
                                <div className={styles.content__left}>
                                    REACTJS
                                </div>
                                <div className={styles.content__right}>
                                    6-8 tuần
                                </div>
                            </div>
                            <div className={styles.content}>
                                <div className={styles.content__left}>
                                    UI/UX DESIGN
                                </div>
                                <div className={styles.content__right}>
                                    6-8 tuần
                                </div>
                            </div>
                            <div className={styles.content}>
                                <div className={styles.content__left}>
                                    Tổng thời gian học
                                </div>
                                <div className={styles.content__right}>
                                    6-7 tháng
                                </div>
                            </div>
                        </article>
                        <section className={styles.stroke}></section>
                        <section className={styles.body__end}>
                            <div className={styles.content}>
                                <div className={styles.content__left}>
                                    Tổng thời gian học
                                </div>
                                <div className={styles.content__right}>
                                    6-7 tháng
                                </div>
                            </div>
                        </section>
                    </div>

                </Col>
            </Row>
        </>
    )
}

export default TimeLine