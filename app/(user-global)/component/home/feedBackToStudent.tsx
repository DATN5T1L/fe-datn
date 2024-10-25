<<<<<<< HEAD:app/component/home/feedBackToStudent.tsx
import { Col, Container, Image, Row } from "react-bootstrap"
=======
import Link from "next/link"
import { Col, Container, Image, Row } from "react-bootstrap"
import styles from '@public/styles/home/FeedBackToStudent.module.css'
>>>>>>> 26dc6a0010ceea61d683aae35921c15cea720f28:app/(user-global)/component/home/feedBackToStudent.tsx


const FeedBackToStudent: React.FC = () => {
    return (
        <>
<<<<<<< HEAD:app/component/home/feedBackToStudent.tsx
            <Container>
                <Row>
                    <Col>

                    </Col>
                    <Col>
                        <h3>
                            Phản hồi từ học viên TTO.SH 
                        </h3>
                    </Col>
                    <Col>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <section>
                            <Row>
                                <Col>
                                    <Image src="" alt="" />
                                </Col>
                                <Col></Col>
                            </Row>
                        </section>
                    </Col>
                </Row>
=======
            <Container className={styles.container}>
                <section className={styles.main}>
                    <Row className={styles.header}>
                        <Col className={styles.header__group}>
                            <div className={styles.left__box}>
                                <Image src="/img/blue-green.svg" alt="" className={styles.left__box__img} />
                            </div>
                            <h3 className={styles.heading}>Phản hồi từ học viên TTO.SH</h3>
                            <div className={styles.right__box}></div>
                        </Col>
                    </Row>
                    <Row className={styles.body}>
                        <Col className={styles.body__container__feedBack}>
                            <section className={styles.body__feedBack__title}>
                                <div className={styles.feedBack__icon__group}>
                                    <Image src="/img/iconStar.svg" alt="" className={styles.feedBack__star} />
                                    <Image src="/img/iconStar.svg" alt="" className={styles.feedBack__star} />
                                    <Image src="/img/iconStar.svg" alt="" className={styles.feedBack__star} />
                                    <Image src="/img/iconStar.svg" alt="" className={styles.feedBack__star} />
                                    <Image src="/img/iconStar.svg" alt="" className={styles.feedBack__star} />
                                </div>
                                <div className={styles.feedBack__content}>
                                    “Nội dung khóa học chất lượng, dễ hiểu”
                                </div>
                            </section>
                            <section className={styles.feedBack__tagName__group}>
                                <div className={styles.tagName__icon}>
                                    <Image src="/img/box-blue.svg" alt="" className={styles.tagName__img} />
                                </div>
                                <div className={styles.tagName__box}>
                                    <Link href={'/'} className={styles.tagName__content__noBlack}>#HTML CSS</Link>
                                </div>
                                <div className={styles.tagName__box1}>
                                    <Link href={'/'} className={styles.tagName__content}><bdi className={styles.tagName__content__black}>#</bdi>{' '}khoahochtml</Link>
                                </div>
                                <div className={styles.tagName__box1}>
                                    <Link href={'/'} className={styles.tagName__content}><bdi className={styles.tagName__content__black}>#</bdi>{' '}phanhoicuanguoidung</Link>
                                </div>
                                <div className={styles.tagName__box1}>
                                    <Link href={'/'} className={styles.tagName__content}><bdi className={styles.tagName__content__black}>#</bdi>{' '}laptrinhkhongkho</Link>
                                </div>
                                <div className={styles.tagName__box1}>
                                    <Link href={'/'} className={styles.tagName__content}><bdi className={styles.tagName__content__black}>#</bdi>{' '}hoclaptrinhtrong2thang</Link>
                                </div>
                            </section>
                        </Col>
                        <Col className={styles.post__feedBack}>
                            <section className={styles.post__feedBack__container}>
                                <div className={styles.left__post__feedBack}>
                                    <Image src="/img/feedBackToStudent.svg" alt="" className={styles.left__post__feedBack__img} />
                                </div>
                                <div className={styles.right__post__feedBack}>
                                    <div className={styles.right__post__feedBack__content}>
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
                                        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
                                        mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
                                        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
                                        mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
                                        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
                                        mattis ligula consectetur, ultrices mauris.
                                        Maecenas vitae mattis tellus.
                                    </div>
                                </div>
                            </section>
                        </Col>
                    </Row>
                    <Row className={styles.body}>
                        <Col className={styles.body__container__feedBack}>
                            <section className={styles.body__feedBack__title}>
                                <div className={styles.feedBack__icon__group}>
                                    <Image src="/img/iconStar.svg" alt="" className={styles.feedBack__star} />
                                    <Image src="/img/iconStar.svg" alt="" className={styles.feedBack__star} />
                                    <Image src="/img/iconStar.svg" alt="" className={styles.feedBack__star} />
                                    <Image src="/img/iconStar.svg" alt="" className={styles.feedBack__star} />
                                    <Image src="/img/iconStar.svg" alt="" className={styles.feedBack__star} />
                                </div>
                                <div className={styles.feedBack__content}>
                                    “Nội dung khóa học chất lượng, dễ hiểu”
                                </div>
                            </section>
                            <section className={styles.feedBack__tagName__group}>
                                <div className={styles.tagName__icon}>
                                    <Image src="/img/box-blue.svg" alt="" className={styles.tagName__img} />
                                </div>
                                <div className={styles.tagName__box}>
                                    <Link href={'/'} className={styles.tagName__content__noBlack}>#HTML CSS</Link>
                                </div>
                                <div className={styles.tagName__box1}>
                                    <Link href={'/'} className={styles.tagName__content}><bdi className={styles.tagName__content__black}>#</bdi>{' '}khoahochtml</Link>
                                </div>
                                <div className={styles.tagName__box1}>
                                    <Link href={'/'} className={styles.tagName__content}><bdi className={styles.tagName__content__black}>#</bdi>{' '}phanhoicuanguoidung</Link>
                                </div>
                                <div className={styles.tagName__box1}>
                                    <Link href={'/'} className={styles.tagName__content}><bdi className={styles.tagName__content__black}>#</bdi>{' '}laptrinhkhongkho</Link>
                                </div>
                                <div className={styles.tagName__box1}>
                                    <Link href={'/'} className={styles.tagName__content}><bdi className={styles.tagName__content__black}>#</bdi>{' '}hoclaptrinhtrong2thang</Link>
                                </div>
                            </section>
                        </Col>
                        <Col className={styles.post__feedBack}>
                            <section className={styles.post__feedBack__container}>
                                <div className={styles.left__post__feedBack}>
                                    <Image src="/img/feedBackToStudent.svg" alt="" className={styles.left__post__feedBack__img} />
                                </div>
                                <div className={styles.right__post__feedBack}>
                                    <div className={styles.right__post__feedBack__content}>
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
                                        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
                                        mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
                                        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
                                        mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
                                        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
                                        mattis ligula consectetur, ultrices mauris.
                                        Maecenas vitae mattis tellus.
                                    </div>
                                </div>
                            </section>
                        </Col>
                    </Row>
                    <Row className={styles.body}>
                        <Col className={styles.body__container__feedBack}>
                            <section className={styles.body__feedBack__title}>
                                <div className={styles.feedBack__icon__group}>
                                    <Image src="/img/iconStar.svg" alt="" className={styles.feedBack__star} />
                                    <Image src="/img/iconStar.svg" alt="" className={styles.feedBack__star} />
                                    <Image src="/img/iconStar.svg" alt="" className={styles.feedBack__star} />
                                    <Image src="/img/iconStar.svg" alt="" className={styles.feedBack__star} />
                                    <Image src="/img/iconStar.svg" alt="" className={styles.feedBack__star} />
                                </div>
                                <div className={styles.feedBack__content}>
                                    “Nội dung khóa học chất lượng, dễ hiểu”
                                </div>
                            </section>
                            <section className={styles.feedBack__tagName__group}>
                                <div className={styles.tagName__icon}>
                                    <Image src="/img/box-blue.svg" alt="" className={styles.tagName__img} />
                                </div>
                                <div className={styles.tagName__box}>
                                    <Link href={'/'} className={styles.tagName__content__noBlack}>#HTML CSS</Link>
                                </div>
                                <div className={styles.tagName__box1}>
                                    <Link href={'/'} className={styles.tagName__content}><bdi className={styles.tagName__content__black}>#</bdi>{' '}khoahochtml</Link>
                                </div>
                                <div className={styles.tagName__box1}>
                                    <Link href={'/'} className={styles.tagName__content}><bdi className={styles.tagName__content__black}>#</bdi>{' '}phanhoicuanguoidung</Link>
                                </div>
                                <div className={styles.tagName__box1}>
                                    <Link href={'/'} className={styles.tagName__content}><bdi className={styles.tagName__content__black}>#</bdi>{' '}laptrinhkhongkho</Link>
                                </div>
                                <div className={styles.tagName__box1}>
                                    <Link href={'/'} className={styles.tagName__content}><bdi className={styles.tagName__content__black}>#</bdi>{' '}hoclaptrinhtrong2thang</Link>
                                </div>
                            </section>
                        </Col>
                        <Col className={styles.post__feedBack}>
                            <section className={styles.post__feedBack__container}>
                                <div className={styles.left__post__feedBack}>
                                    <Image src="/img/feedBackToStudent.svg" alt="" className={styles.left__post__feedBack__img} />
                                </div>
                                <div className={styles.right__post__feedBack}>
                                    <div className={styles.right__post__feedBack__content}>
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
                                        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
                                        mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
                                        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
                                        mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
                                        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
                                        mattis ligula consectetur, ultrices mauris.
                                        Maecenas vitae mattis tellus.
                                    </div>
                                </div>
                            </section>
                        </Col>
                    </Row>
                    <Row className={styles.body}>
                        <Col className={styles.body__container__feedBack}>
                            <section className={styles.body__feedBack__title}>
                                <div className={styles.feedBack__icon__group}>
                                    <Image src="/img/iconStar.svg" alt="" className={styles.feedBack__star} />
                                    <Image src="/img/iconStar.svg" alt="" className={styles.feedBack__star} />
                                    <Image src="/img/iconStar.svg" alt="" className={styles.feedBack__star} />
                                    <Image src="/img/iconStar.svg" alt="" className={styles.feedBack__star} />
                                    <Image src="/img/iconStar.svg" alt="" className={styles.feedBack__star} />
                                </div>
                                <div className={styles.feedBack__content}>
                                    “Nội dung khóa học chất lượng, dễ hiểu”
                                </div>
                            </section>
                            <section className={styles.feedBack__tagName__group}>
                                <div className={styles.tagName__icon}>
                                    <Image src="/img/box-blue.svg" alt="" className={styles.tagName__img} />
                                </div>
                                <div className={styles.tagName__box}>
                                    <Link href={'/'} className={styles.tagName__content__noBlack}>#HTML CSS</Link>
                                </div>
                                <div className={styles.tagName__box1}>
                                    <Link href={'/'} className={styles.tagName__content}><bdi className={styles.tagName__content__black}>#</bdi>{' '}khoahochtml</Link>
                                </div>
                                <div className={styles.tagName__box1}>
                                    <Link href={'/'} className={styles.tagName__content}><bdi className={styles.tagName__content__black}>#</bdi>{' '}phanhoicuanguoidung</Link>
                                </div>
                                <div className={styles.tagName__box1}>
                                    <Link href={'/'} className={styles.tagName__content}><bdi className={styles.tagName__content__black}>#</bdi>{' '}laptrinhkhongkho</Link>
                                </div>
                                <div className={styles.tagName__box1}>
                                    <Link href={'/'} className={styles.tagName__content}><bdi className={styles.tagName__content__black}>#</bdi>{' '}hoclaptrinhtrong2thang</Link>
                                </div>
                            </section>
                        </Col>
                        <Col className={styles.post__feedBack}>
                            <section className={styles.post__feedBack__container}>
                                <div className={styles.left__post__feedBack}>
                                    <Image src="/img/feedBackToStudent.svg" alt="" className={styles.left__post__feedBack__img} />
                                </div>
                                <div className={styles.right__post__feedBack}>
                                    <div className={styles.right__post__feedBack__content}>
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
                                        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
                                        mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
                                        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
                                        mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
                                        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
                                        mattis ligula consectetur, ultrices mauris.
                                        Maecenas vitae mattis tellus.
                                    </div>
                                </div>
                            </section>
                        </Col>
                    </Row>
                </section>
>>>>>>> 26dc6a0010ceea61d683aae35921c15cea720f28:app/(user-global)/component/home/feedBackToStudent.tsx
            </Container>
        </>
    )
}

export default FeedBackToStudent