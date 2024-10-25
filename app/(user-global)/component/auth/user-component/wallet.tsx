
'use client'

import styles from '@public/styles/user-component/Wallet.module.css'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'

const Wallet: React.FC = () => {
    return (
        <>
            <Container className={styles.container}>
                <Row className={styles.pay}>
                    <Col className={styles.left__info}>
                        <section className={styles.name__info}>
                            <h4 className={styles.name__info__title}>
                                Tên chủ tài khoản
                            </h4>
                            <h3 className={styles.name__info__subTitle}>
                                Con Văn Người
                            </h3>
                        </section>
                        <section className={styles.name__info}>
                            <h4 className={styles.name__info__title}>
                                Tên ngân hàng liên kết
                            </h4>
                            <h3 className={styles.name__info__subTitle}>
                                Ngân hàng MB Bank
                            </h3>
                        </section>
                        <section className={styles.balance__user}>
                            <h4 className={styles.name__info__title}>
                                Số dư tài khoản
                            </h4>
                            <h3 className={styles.balance__user__number}>
                                100,000,000 đ
                            </h3>
                        </section>
                        <section className={styles.deposit}>
                            <h4 className={styles.deposit__title}>
                                Nạp tiền
                            </h4>
                            <Image src="/img/deposit.svg" alt="" className={styles.deposit__icon} />
                        </section>
                    </Col>
                    <Col className={styles.card}>
                        <section className={styles.card__header}>
                            <h3 className={styles.card__header__title}>Tài khoản thanh toán</h3>
                            <section className={styles.card__header__iconGroup}>
                                <Image src="/img/chip.svg" alt="" className={styles.leftIcon} />
                                <Image src="/img/wifi.svg" alt="" className={styles.rightIcon} />
                            </section>
                            <h2 className={styles.card__header__number}>3234 **** **** 7628 </h2>
                        </section>
                        <div className={styles.line__bg}>
                            <section className={styles.card__body__titleGroup}>
                                <div className={styles.title__element1}>
                                    <h3 className={styles.card__title}>Card Holder name</h3>
                                    <h2 className={styles.card__name}>VAN NGUOI</h2>
                                </div>
                                <div className={styles.title__element2}>
                                    <h3 className={styles.card__title1}>Expiry date</h3>
                                    <h2 className={styles.card__pass}>
                                        ****4
                                    </h2>
                                </div>
                            </section>
                            <Image src="/img/visa.svg" alt="" className={styles.logo__visa} />
                        </div>
                    </Col>
                </Row>
                <Row className={styles.history}>
                    <Col className={styles.history__header}>
                        <h3 className={styles.history__header__title}>Lịch sử giao dịch</h3>
                    </Col>
                    <Col className={styles.history__main}>
                        <section className={styles.history__main__white}>
                            <h3 className={styles.history__main__title}>Thanh toán khóa học Html css</h3>
                            <h3 className={styles.history__main__subTitle}>Ví TTO</h3>
                            <h3 className={styles.history__main__number}>+100,000 </h3>
                            <div className={styles.history__main__icon}>
                                <Image src="/img/tick-green.svg" alt="" className={styles.history__main__icon__img} />
                            </div>
                        </section>
                        <section className={styles.history__main__gray}>
                            <h3 className={styles.history__main__title}>Thanh toán khóa học</h3>
                            <h3 className={styles.history__main__subTitle}>Ví TTO</h3>
                            <h3 className={styles.history__main__number}>-100,000  </h3>
                            <div className={styles.history__main__icon}>
                                <Image src="/img/tick-blue.svg" alt="" className={styles.history__main__icon__img} />
                            </div>
                        </section>
                        <section className={styles.history__main__white}>
                            <h3 className={styles.history__main__title}>Thanh toán khóa học thất bại</h3>
                            <h3 className={styles.history__main__subTitle}>Ví TTO</h3>
                            <h3 className={styles.history__main__number}>-100,000  </h3>
                            <div className={styles.history__main__icon}>
                                <Image src="/img/tick-red.svg" alt="" className={styles.history__main__icon__img} />
                            </div>
                        </section>
                        <section className={styles.history__main__gray}>
                            <h3 className={styles.history__main__title}>Nạp tiền không thành công</h3>
                            <h3 className={styles.history__main__subTitle}>Ví TTO</h3>
                            <h3 className={styles.history__main__number}>+100,000  </h3>
                            <div className={styles.history__main__icon}>
                                <Image src="/img/tick-yellow.svg" alt="" className={styles.history__main__icon__img} />
                            </div>
                        </section>
                        <section className={styles.history__main__white}>
                            <h3 className={styles.history__main__title}>Thanh toán khóa học Html css</h3>
                            <h3 className={styles.history__main__subTitle}>Ví TTO</h3>
                            <h3 className={styles.history__main__number}>-100,000  </h3>
                            <div className={styles.history__main__icon}>
                                <Image src="/img/tick-green.svg" alt="" className={styles.history__main__icon__img} />
                            </div>
                        </section>
                        <section className={styles.history__main__gray}>
                            <h3 className={styles.history__main__title}>Thanh toán khóa học</h3>
                            <h3 className={styles.history__main__subTitle}>Ví TTO</h3>
                            <h3 className={styles.history__main__number}>-100,000  </h3>
                            <div className={styles.history__main__icon}>
                                <Image src="/img/tick-red.svg" alt="" className={styles.history__main__icon__img} />
                            </div>
                        </section>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Wallet;