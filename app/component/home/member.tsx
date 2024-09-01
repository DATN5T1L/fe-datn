'use client'
import React from 'react';
import styles from '@public/styles/home/Member.module.css'
import { Button, Card, Container, Image } from 'react-bootstrap';

const Member: React.FC = () => {
    return (
        <>
            <Container className={styles.container}>
                <section className={styles.header}>
                    <div className={styles.header__left}>
                        <Image src="/img/User Check Rounded.svg" alt="" className={styles.header__left__img} />
                        <h3 className={styles.header__left__title}>Thành viên</h3>
                    </div>
                    <div className={styles.header__function}>
                        <div className={`${styles.header__function__element} ${styles.header__function__borderBottom}`}>
                            Đang hoạt động
                        </div>
                        <div className={`${styles.header__function__element}`}>
                            Mới
                        </div>
                        <div className={`${styles.header__function__element}`}>
                            Tất cả
                        </div>
                    </div>
                </section>
                <main className={styles.main}>
                    <Button
                        className={styles.main__btnLeft}
                    >
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.main__btnLeft__svg}>
                            <path d="M16.2803 4.46967C16.5466 4.73594 16.5708 5.1526 16.3529 5.44621L16.2803 5.53033L9.811 12L16.2803 18.4697C16.5466 18.7359 16.5708 19.1526 16.3529 19.4462L16.2803 19.5303C16.0141 19.7966 15.5974 19.8208 15.3038 19.6029L15.2197 19.5303L8.21967 12.5303C7.9534 12.2641 7.9292 11.8474 8.14705 11.5538L8.21967 11.4697L15.2197 4.46967C15.5126 4.17678 15.9874 4.17678 16.2803 4.46967Z" fill="#656161" className={styles.main__btnLeft__path}/>
                        </svg>
                    </Button>
                    <article className={styles.main__content}>
                        <Card className={styles.main__content__box}>
                            <div className={styles.main__content__wrap}>
                                <div className={styles.main__content__imgWrap}>
                                    <Image src="/img/avt.jpg" width="360" height="360" alt="" className={styles.main__content__imgBg} />
                                </div>
                            </div>
                            <Card.Body className={styles.main__content__name}>
                                <Card.Title className={styles.main__content__title}>Tuấn Huỳnh</Card.Title>
                                <div className={styles.main__content__tick}>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className={styles.main__content__box}>
                            <div className={styles.main__content__wrap}>
                                <div className={styles.main__content__imgWrap}>
                                    <Image src="/img/avt.jpg" width="360" height="360" alt="" className={styles.main__content__imgBg} />
                                </div>
                            </div>
                            <Card.Body className={styles.main__content__name}>
                                <Card.Title className={styles.main__content__title}>Tuấn Huỳnh</Card.Title>
                                <div className={styles.main__content__tick}>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className={styles.main__content__box}>
                            <div className={styles.main__content__wrap}>
                                <div className={styles.main__content__imgWrap}>
                                    <Image src="/img/avt.jpg" width="360" height="360" alt="" className={styles.main__content__imgBg} />
                                </div>
                            </div>
                            <Card.Body className={styles.main__content__name}>
                                <Card.Title className={styles.main__content__title}>Tuấn Huỳnh</Card.Title>
                                <div className={styles.main__content__tick}>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className={styles.main__content__box}>
                            <div className={styles.main__content__wrap}>
                                <div className={styles.main__content__imgWrap}>
                                    <Image src="/img/avt.jpg" width="360" height="360" alt="" className={styles.main__content__imgBg} />
                                </div>
                            </div>
                            <Card.Body className={styles.main__content__name}>
                                <Card.Title className={styles.main__content__title}>Tuấn Huỳnh</Card.Title>
                                <div className={styles.main__content__tick}>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className={styles.main__content__box}>
                            <div className={styles.main__content__wrap}>
                                <div className={styles.main__content__imgWrap}>
                                    <Image src="/img/avt.jpg" width="360" height="360" alt="" className={styles.main__content__imgBg} />
                                </div>
                            </div>
                            <Card.Body className={styles.main__content__name}>
                                <Card.Title className={styles.main__content__title}>Tuấn Huỳnh</Card.Title>
                                <div className={styles.main__content__tick}>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className={styles.main__content__box}>
                            <div className={styles.main__content__wrap}>
                                <div className={styles.main__content__imgWrap}>
                                    <Image src="/img/avt.jpg" width="360" height="360" alt="" className={styles.main__content__imgBg} />
                                </div>
                            </div>
                            <Card.Body className={styles.main__content__name}>
                                <Card.Title className={styles.main__content__title}>Tuấn Huỳnh</Card.Title>
                                <div className={styles.main__content__tick}>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className={styles.main__content__box}>
                            <div className={styles.main__content__wrap}>
                                <div className={styles.main__content__imgWrap}>
                                    <Image src="/img/avt.jpg" width="360" height="360" alt="" className={styles.main__content__imgBg} />
                                </div>
                            </div>
                            <Card.Body className={styles.main__content__name}>
                                <Card.Title className={styles.main__content__title}>Tuấn Huỳnh</Card.Title>
                                <div className={styles.main__content__tick}>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className={styles.main__content__box}>
                            <div className={styles.main__content__wrap}>
                                <div className={styles.main__content__imgWrap}>
                                    <Image src="/img/avt.jpg" width="360" height="360" alt="" className={styles.main__content__imgBg} />
                                </div>
                            </div>
                            <Card.Body className={styles.main__content__name}>
                                <Card.Title className={styles.main__content__title}>Tuấn Huỳnh</Card.Title>
                                <div className={styles.main__content__tick}>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className={styles.main__content__box}>
                            <div className={styles.main__content__wrap}>
                                <div className={styles.main__content__imgWrap}>
                                    <Image src="/img/avt.jpg" width="360" height="360" alt="" className={styles.main__content__imgBg} />
                                </div>
                            </div>
                            <Card.Body className={styles.main__content__name}>
                                <Card.Title className={styles.main__content__title}>Tuấn Huỳnh</Card.Title>
                                <div className={styles.main__content__tick}>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className={styles.main__content__box}>
                            <div className={styles.main__content__wrap}>
                                <div className={styles.main__content__imgWrap}>
                                    <Image src="/img/avt.jpg" width="360" height="360" alt="" className={styles.main__content__imgBg} />
                                </div>
                            </div>
                            <Card.Body className={styles.main__content__name}>
                                <Card.Title className={styles.main__content__title}>Tuấn Huỳnh</Card.Title>
                                <div className={styles.main__content__tick}>
                                </div>
                            </Card.Body>
                        </Card>
                    </article>
                    <Button
                        className={styles.main__btnRight}
                    >
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"  className={styles.main__btnRight__svg}>
                            <path d="M8.21967 19.5303C7.9534 19.2641 7.9292 18.8474 8.14705 18.5538L8.21967 18.4697L14.689 12L8.21967 5.53033C7.9534 5.26406 7.9292 4.8474 8.14705 4.55379L8.21967 4.46967C8.48594 4.2034 8.9026 4.1792 9.19621 4.39705L9.28033 4.46967L16.2803 11.4697C16.5466 11.7359 16.5708 12.1526 16.3529 12.4462L16.2803 12.5303L9.28033 19.5303C8.98744 19.8232 8.51256 19.8232 8.21967 19.5303Z" fill="#656161"  className={styles.main__btnRight__path}/>
                        </svg>
                    </Button>
                </main>
            </Container>
        </>
    )
}

export default Member