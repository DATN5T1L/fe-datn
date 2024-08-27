'use client'
import React from 'react';
import styles from '../../../public/styles/home/Banner.module.css'
import {  Button } from 'react-bootstrap';

const Banner: React.FC = () => {
    return (
        <>
            <section className={styles.bannerContainer}>
                <div className={styles.mainBanner}>
                    <div className={styles.wrap}>
                        <div className={styles.imgWrap}>
                            <img src="/img/avt.jpg" width="360" height="360" alt="" className={styles.imgBg} />
                        </div>
                    </div>
                    <div className={styles.containerMainBanner}>
                        <div className={styles.contentBanner}>
                            <h3><span className={styles.textBlue}>30% </span>hoàn thành</h3>
                            <h2>Xin chào, <span className={styles.textBlue}>Hoàng Tuấn</span></h2>
                            <small>Bấm vào học ngay để học khóa còn chưa hoàn thành</small>
                        </div>
                        <div className={styles.btnBanner}>
                            <Button className={styles.btnContentBanner}>
                                <div className={styles.nameBtnBanner}>Học ngay</div>
                                <div className={styles.iconBtnBanner}>
                                    {'>'}
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Banner