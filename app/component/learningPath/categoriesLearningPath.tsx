'use client'

import { Col, Image, Row } from "react-bootstrap"
import styles from '@public/styles/learningPath/CategoriesLearningPath.module.css'

const CategoriesLearningPath: React.FC = () => {
    return (
        <>
            <Row className={styles.cateMain}>
                <Col className={styles.cateBox}>
                    <section className={styles.cateSec}>
                        <h2 className={styles.secTitle}>FRONT-END</h2>
                        <h2 className={styles.secBlueTitle}>WEB DEVELOPMENT</h2>
                        <section className={styles.img__group}>
                            <Image src="/img/htmlIcon.svg" className={styles.img__elenment} />
                            <Image src="/img/jsIcon.svg" className={styles.img__elenment} />
                            <Image src="/img/cssIcon.svg" className={styles.img__elenment} />
                            <Image src="/img/reactIcon.svg" className={styles.img__elenment} />
                            <Image src="/img/figmaIcon.svg" className={styles.img__elenment} />
                        </section>
                    </section>
                    <Image src="/img/aboutFe.svg" className={styles.img__about} />
                </Col>
                <Col className={styles.cateBox}>
                    <section className={styles.cateSec}>
                        <h2 className={styles.secTitle}>BACK-END</h2>
                        <h2 className={styles.secBlueTitle}>WEB DEVELOPMENT</h2>
                        <section className={styles.img__group}>
                            <Image src="/img/Document.svg" className={styles.img__elenment} />
                            <Image src="/img/phpIcon.svg" className={styles.img__elenment} />
                            <Image src="/img/nodejsIcon.svg" className={styles.img__elenment} />
                            <Image src="/img/mysqlIcon.svg" className={styles.img__elenment} />
                            <Image src="/img/apiIcon.svg" className={styles.img__elenment} />
                        </section>
                    </section>
                    <Image src="/img/aboutBe.svg" className={styles.img__about} />
                </Col>
                <Col className={styles.cateBox}>
                    <section className={styles.cateSec}>
                        <h2 className={styles.secTitle}>FRONT-END</h2>
                        <h2 className={styles.secBlueTitle}>WEB DEVELOPMENT</h2>
                        <section className={styles.img__group}>
                            <Image src="/img/htmlIcon.svg" className={styles.img__elenment} />
                            <Image src="/img/jsIcon.svg" className={styles.img__elenment} />
                            <Image src="/img/cssIcon.svg" className={styles.img__elenment} />
                            <Image src="/img/reactIcon.svg" className={styles.img__elenment} />
                            <Image src="/img/figmaIcon.svg" className={styles.img__elenment} />
                        </section>
                    </section>
                    <Image src="/img/aboutFe.svg" className={styles.img__about} />
                </Col>
            </Row>
        </>
    )
}

export default CategoriesLearningPath