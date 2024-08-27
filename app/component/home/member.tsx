'use client'
import React from 'react';
import styles from '../../../public/styles/home/Member.module.css'
import { Button } from 'react-bootstrap';

const Member: React.FC = () => {
    return (
        <>
            <section className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.left}>
                        <img src="/img/User Check Rounded.svg" alt="" />
                        <h3>Thành viên</h3>
                    </div>
                    <div className={styles.function}>
                        <div className={`${styles.element} ${styles.borderBottom}`}>
                            Đang hoạt động
                        </div>
                        <div className={`${styles.element}`}>
                            Mới
                        </div>
                        <div className={`${styles.element}`}>
                            Tất cả
                        </div>
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.btnLeft}>
                        <Button
                            className={styles.btnMainLeft}
                        >
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.2803 4.46967C16.5466 4.73594 16.5708 5.1526 16.3529 5.44621L16.2803 5.53033L9.811 12L16.2803 18.4697C16.5466 18.7359 16.5708 19.1526 16.3529 19.4462L16.2803 19.5303C16.0141 19.7966 15.5974 19.8208 15.3038 19.6029L15.2197 19.5303L8.21967 12.5303C7.9534 12.2641 7.9292 11.8474 8.14705 11.5538L8.21967 11.4697L15.2197 4.46967C15.5126 4.17678 15.9874 4.17678 16.2803 4.46967Z" fill="#656161" />
                            </svg>
                        </Button>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.box}>
                            <div className={styles.wrap}>
                                <div className={styles.imgWrap}>
                                    <img src="/img/avt.jpg" width="360" height="360" alt="" className={styles.imgBg} />
                                </div>
                            </div>
                            <div className={styles.name}>
                                <p>Tuấn Huỳnh</p>
                                <div className={styles.tick}>
                                </div>
                            </div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.wrap}>
                                <div className={styles.imgWrap}>
                                    <img src="/img/avt.jpg" width="360" height="360" alt="" className={styles.imgBg} />
                                </div>
                            </div>
                            <div className={styles.name}>
                                <p>Tuấn Huỳnh</p>
                                <div className={styles.tick}>
                                </div>
                            </div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.wrap}>
                                <div className={styles.imgWrap}>
                                    <img src="/img/avt.jpg" width="360" height="360" alt="" className={styles.imgBg} />
                                </div>
                            </div>
                            <div className={styles.name}>
                                <p>Tuấn Huỳnh</p>
                                <div className={styles.tick}>
                                </div>
                            </div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.wrap}>
                                <div className={styles.imgWrap}>
                                    <img src="/img/avt.jpg" width="360" height="360" alt="" className={styles.imgBg} />
                                </div>
                            </div>
                            <div className={styles.name}>
                                <p>Tuấn Huỳnh</p>
                                <div className={styles.tick}>
                                </div>
                            </div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.wrap}>
                                <div className={styles.imgWrap}>
                                    <img src="/img/avt.jpg" width="360" height="360" alt="" className={styles.imgBg} />
                                </div>
                            </div>
                            <div className={styles.name}>
                                <p>Tuấn Huỳnh</p>
                                <div className={styles.tick}>
                                </div>
                            </div>
                        </div>

                        <div className={styles.box}>
                            <div className={styles.wrap}>
                                <div className={styles.imgWrap}>
                                    <img src="/img/avt.jpg" width="360" height="360" alt="" className={styles.imgBg} />
                                </div>
                            </div>
                            <div className={styles.name}>
                                <p>Tuấn Huỳnh</p>
                                <div className={styles.tick}>
                                </div>
                            </div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.wrap}>
                                <div className={styles.imgWrap}>
                                    <img src="/img/avt.jpg" width="360" height="360" alt="" className={styles.imgBg} />
                                </div>
                            </div>
                            <div className={styles.name}>
                                <p>Tuấn Huỳnh</p>
                                <div className={styles.tick}>
                                </div>
                            </div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.wrap}>
                                <div className={styles.imgWrap}>
                                    <img src="/img/avt.jpg" width="360" height="360" alt="" className={styles.imgBg} />
                                </div>
                            </div>
                            <div className={styles.name}>
                                <p>Tuấn Huỳnh</p>
                                <div className={styles.tick}>
                                </div>
                            </div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.wrap}>
                                <div className={styles.imgWrap}>
                                    <img src="/img/avt.jpg" width="360" height="360" alt="" className={styles.imgBg} />
                                </div>
                            </div>
                            <div className={styles.name}>
                                <p>Tuấn Huỳnh</p>
                                <div className={styles.tick}>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={styles.btnRight}>
                        <Button
                            className={styles.btnMainRight}
                        >
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.21967 19.5303C7.9534 19.2641 7.9292 18.8474 8.14705 18.5538L8.21967 18.4697L14.689 12L8.21967 5.53033C7.9534 5.26406 7.9292 4.8474 8.14705 4.55379L8.21967 4.46967C8.48594 4.2034 8.9026 4.1792 9.19621 4.39705L9.28033 4.46967L16.2803 11.4697C16.5466 11.7359 16.5708 12.1526 16.3529 12.4462L16.2803 12.5303L9.28033 19.5303C8.98744 19.8232 8.51256 19.8232 8.21967 19.5303Z" fill="#656161" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Member