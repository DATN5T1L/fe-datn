'use client'

import styles from '@public/styles/learningPath/LearningPathSection.module.css'
import { Card, Col, Image, Row } from "react-bootstrap"

interface LearningPathSectionProps{
    title: string;
    img: string;
}

const LearningPathSection: React.FC<LearningPathSectionProps> = ({title='', img=''}) => {
    return (
        <>
            <Row className={styles.skillContainer}>
                <Col className={styles.skillMain}>
                    <section className={styles.skill__header}>
                        <section className={styles.skill__header__title}>
                            <h2 className={styles.header__title}>
                                Lộ Trình Học {title} Development 
                            </h2>
                            <h4 className={styles.header__subTitle}>
                                Thiết kế web luôn là một nghề hấp dẫn bất kì thời điểm nào, bạn thử Google từ khoá "Tuyển dụng Lập trình Front End" sẽ thấy ngay các nhà tuyển dụng đang săn đón với mức lương cực hấp dẫn. Nếu bạn đam mê thiết kế web, bạn có những ý tưởng giao diện bá đạo, việc còn lại là kỹ năng lập trình Front-End hãy để khoá học này dẫn đường bạn nhé.
                            </h4>
                        </section>
                        <Image src={`${img}`} alt='ảnh lộ trình' className={styles.imgHeader} />
                    </section>
                    <section className={styles.skill__body}>
                        <section className={styles.skill__body__header}>
                            <h2 className={styles.body__title}>
                                Những kĩ năng đạt được sau kết thúc lộ trình
                            </h2>
                            <h4 className={styles.body__subTitle}>
                                Sau khi hoàn thành lộ trình học này, bạn sẽ có khả năng tạo ra các trang web hiện đại và tương tác, từ thiết kế cơ bản đến ứng dụng React.js phức tạp, cùng với kỹ năng UI/UX để tối ưu trải nghiệm người dùng.
                            </h4>
                        </section>
                        <section className={styles.body__main}>
                            <Card className={styles.box}>
                                <Card.Img alt='icon fe' className={styles.box__icon} src='/img/htmlIcon.svg' />
                                <Card.Body className={styles.box__body}>
                                    <Card.Title className={styles.box__title}>
                                        Tạo cấu trúc cho website
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                            <Card className={styles.box}>
                                <Card.Img alt='icon fe' className={styles.box__icon} src='/img/cssIcon.svg' />
                                <Card.Body className={styles.box__body}>
                                    <Card.Title className={styles.box__title}>
                                        Tương thích nhiều thiết bị
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                            <Card className={styles.box}>
                                <Card.Img alt='icon fe' className={styles.box__icon} src='/img/jsIcon.svg' />
                                <Card.Body className={styles.box__body}>
                                    <Card.Title className={styles.box__title}>
                                        Tạo tương tác cho website
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                            <Card className={styles.box}>
                                <Card.Img alt='icon fe' className={styles.box__icon} src='/img/reactIcon.svg' />
                                <Card.Body className={styles.box__body}>
                                    <Card.Title className={styles.box__title}>
                                        Xây dựng ứng dụng website động
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                            <Card className={styles.box}>
                                <Card.Img alt='icon fe' className={styles.box__icon} src='/img/figmaIcon.svg' />
                                <Card.Body className={styles.box__body}>
                                    <Card.Title className={styles.box__title}>
                                        Thiết kế giao diện website
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </section>
                        <Image src='/img/demo.png' alt='demo skill' className={styles.demoImg}/>
                    </section>
                </Col>
            </Row>
        </>
    )
}

export default LearningPathSection