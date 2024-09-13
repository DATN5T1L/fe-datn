'use client'

import { Col, Image, Row } from "react-bootstrap"
import styles from '@public/styles/learningPath/ForWhom.module.css'

const ForWhom: React.FC = () => {
    return (
        <>
            <Row className={styles.container}>
                <Col className={styles.main}>
                    <h1 className={styles.header__title}>
                        KHÓA HỌC NÀY DÀNH CHO AI
                    </h1>
                    <Row className={styles.bodyConatiner}>
                        <Col className={styles.bodyContainer__left}>
                            <section className={styles.menu}>
                                <Image src="/img/Round Alt Arrow Right.svg" alt="icon menu" className={styles.menu__icon}/>
                                <div className={styles.menu__content}>
                                    <bdi className={styles.menu__content__b}>Sinh viên CNTT</bdi>{' '}
                                    chính quy cần môi trường học thực tế, đào tạo sát nhu cầu nhân lực doanh nghiệp.
                                </div>
                            </section>
                            <section className={styles.menu}>
                                <Image src="/img/Round Alt Arrow Right.svg" alt="icon menu" className={styles.menu__icon}/>
                                <div className={styles.menu__content}>
                                    <bdi className={styles.menu__content__b}>Sinh viên CNTT</bdi>{' '}
                                    chính quy cần môi trường học thực tế, đào tạo sát nhu cầu nhân lực doanh nghiệp.
                                </div>
                            </section>
                            <section className={styles.menu}>
                                <Image src="/img/Round Alt Arrow Right.svg" alt="icon menu" className={styles.menu__icon}/>
                                <div className={styles.menu__content}>
                                    <bdi className={styles.menu__content__b}>Sinh viên CNTT</bdi>{' '}
                                    chính quy cần môi trường học thực tế, đào tạo sát nhu cầu nhân lực doanh nghiệp.
                                </div>
                            </section>
                        </Col>
                        <Col className={styles.bodyContainer__right}>
                            <Image src="/img/forWhom.png" alt="for whom" className={styles.bodyContainer__right__img}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default ForWhom