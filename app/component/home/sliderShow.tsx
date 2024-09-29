'use client'
import styles from '@public/styles/home/SliderShow.module.css'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'

const SliderShow: React.FC = () => {
    return (
        <>
            <Container className={styles.container}>
                <div className={styles.top__gaden}>

                </div>
                <section className={styles.container__body}>
                    <Row className={styles.body__header}>
                        <Button className={styles.btn__prev}>
                            <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke="#15C8E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={styles.stroke__icon}/>
                            </svg>
                        </Button>
                        <Col className={styles.title}>
                            <div className={styles.title__main}>
                                <h4 className={styles.title__subTitle}>COURSE</h4>  
                                <h2 className={styles.title__mainTitle}>UI/UX Designer</h2>
                            </div>

                        </Col>
                        <Col className={styles.main}>
                            <section className={styles.main__container}>
                                <div className={styles.main__container__header}>
                                    <Image src='/img/main_hero_mos.svg' alt='' className={styles.main__container__header__img} />
                                    <div className={styles.main__container__header__bg}></div>
                                </div>
                                <div className={styles.main__container__footer}>
                                    Khóa học UI/UX Designer giúp bạn nắm vững kỹ năng thiết kế giao diện và trải nghiệm người dùng.
                                    Học từ cơ bản đến nâng cao, sử dụng các công cụ như Figma, Adobe XD.
                                    Thực hành qua dự án thực tế, xây dựng portfolio,
                                    và sẵn sàng cho môi trường làm việc chuyên nghiệp.
                                </div>
                            </section>
                        </Col>
                        <Col className={styles.under}>
                            <div className={styles.under__box}>
                                <Image src="/img/img_cpuse_mos.svg" alt="" className={styles.under__box__img} />
                                <div className={styles.under__box__bg}></div>
                            </div>
                        </Col>
                        <Button className={styles.btn__next}>
                            <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="#15C8E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </Button>
                    </Row>
                    <Row className={styles.body__footer}>
                        <Col className={styles.box__user}>
                            <Image src="/img/avt.jpg" alt="" className={styles.box__user__img} />
                            <h3 className={styles.box__user__title}>Nguyễn Phương Thảo</h3>
                        </Col>
                        <Col className={styles.box__user}>
                            <Image src="/img/avt.jpg" alt="" className={`${styles.box__user__img} ${styles.border__cyan}`} />
                            <h3 className={`${styles.box__user__title} ${styles.color__cyan}`}>Nguyễn Phương Thảo</h3>
                            <div className={styles.box__user__border}>
                                <div className={styles.box__user__element}></div>
                            </div>
                        </Col>
                        <Col className={styles.box__user}>
                            <Image src="/img/avt.jpg" alt="" className={styles.box__user__img} />
                            <h3 className={styles.box__user__title}>Nguyễn Phương Thảo</h3>
                        </Col>
                    </Row>
                </section>
                <div className={styles.bottom__gaden}>
                </div>
            </Container>
        </>
    )
}

export default SliderShow