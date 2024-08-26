'use client'
import React from 'react';
import styles from '../../public/styles/Member.module.css'
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
                            <img src="/img/leftarrow.svg" alt="" />
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
                            <img src="/img/rightarrow.svg" alt="" />
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Member