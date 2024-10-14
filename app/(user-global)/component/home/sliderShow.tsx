'use client'
import styles from '@public/styles/home/SliderShow.module.css'
import { useState } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'

const SliderShow: React.FC = () => {
    const [isFocus1, setIsFocus1] = useState(true)
    const [isFocus2, setIsFocus2] = useState(false)
    const [isFocus3, setIsFocus3] = useState(false)


    const handleFocus1 = () => {
        setIsFocus1(true)
        setIsFocus2(false)
        setIsFocus3(false)
    }

    const handleFocus2 = () => {
        setIsFocus1(false)
        setIsFocus2(true)
        setIsFocus3(false)
    }

    const handleFocus3 = () => {
        setIsFocus1(false)
        setIsFocus2(false)
        setIsFocus3(true)
    }

    return (

        <div className={styles.container}>
            <div className={styles.top__gaden}>

            </div>

            <div className={styles.white}>

            </div>
            <section className={styles.container__body}>
                <Row className={styles.body__header}>
                    <div className={styles.blue}>

                    </div>
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
                </Row>
                <section className={styles.footer}>
                    <Button className={styles.btn__prev}>
                        <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="#15C8E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={styles.stroke__icon} />
                        </svg>
                    </Button>
                    <section className={styles.body__footer}>
                        <Col className={styles.box__user} onClick={handleFocus1}>
                            <Image src="/img/avt.jpg" alt="" className={`${styles.box__user__img} ${isFocus1 ? styles.border__cyan : ''}`} />
                            <h3 className={`${styles.box__user__title} ${isFocus1 ? styles.color__cyan : ''}`}>Nguyễn Phương Thảo</h3>
                            <div className={styles.box__user__border}>
                                <div className={`${styles.box__user__element} ${isFocus1 ? styles.active : ''}`}></div>
                            </div>
                        </Col>
                        <Col className={styles.box__user} onClick={handleFocus2}>
                            <Image src="/img/avt.jpg" alt="" className={`${styles.box__user__img} ${isFocus2 ? styles.border__cyan : ''}`} />
                            <h3 className={`${styles.box__user__title} ${isFocus2 ? styles.color__cyan : ''}`}>Nguyễn Phương Thảo</h3>
                            <div className={styles.box__user__border}>
                                <div className={`${styles.box__user__element} ${isFocus2 ? styles.active : ''}`}></div>
                            </div>
                        </Col>
                        <Col className={styles.box__user} onClick={handleFocus3}>
                            <Image src="/img/avt.jpg" alt="" className={`${styles.box__user__img} ${isFocus3 ? styles.border__cyan : ''}`} />
                            <h3 className={`${styles.box__user__title} ${isFocus3 ? styles.color__cyan : ''}`}>Nguyễn Phương Thảo</h3>
                            <div className={styles.box__user__border}>
                                <div className={`${styles.box__user__element} ${isFocus3 ? styles.active : ''}`}></div>
                            </div>
                        </Col>
                        <Col className={styles.box__user} onClick={handleFocus3}>
                            <Image src="/img/avt.jpg" alt="" className={`${styles.box__user__img} ${isFocus3 ? styles.border__cyan : ''}`} />
                            <h3 className={`${styles.box__user__title} ${isFocus3 ? styles.color__cyan : ''}`}>Nguyễn Phương Thảo</h3>
                            <div className={styles.box__user__border}>
                                <div className={`${styles.box__user__element} ${isFocus3 ? styles.active : ''}`}></div>
                            </div>
                        </Col>
                    </section>
                    <Button className={styles.btn__next}>
                        <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="#15C8E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </Button>
                </section>
            </section>
            <div className={styles.bottom__gaden}>
            </div>
        </div>

    )
}

export default SliderShow