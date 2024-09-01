'use client'
import React from 'react';
import styles from '@public/styles/home/Banner.module.css'
import { Container, Button, Image } from 'react-bootstrap';


const Banner: React.FC = () => {
    return (
        <>
            <Container className={styles.bannerContainer}>
                <article className={styles.mainBanner}>
                    <section className={styles.wrap}>
                        <div className={styles.imgWrap}>
                            <Image src="/img/avt.jpg" width="360" height="360" alt="" className={styles.imgBg} />
                        </div>
                    </section>
                    <section className={styles.mainBanner__Container}>
                        <hgroup className={styles.contentBanner}>
                            <h3 className={styles.contentBanner__hedding1}><bdi className={styles.textBlue}>30% </bdi>hoàn thành</h3>
                            <h2 className={styles.contentBanner__hedding2}>Xin chào, <bdi className={styles.textBlue}>Hoàng Tuấn</bdi></h2>
                            <small className={styles.contentBanner__hedding3}>Bấm vào học ngay để học khóa còn chưa hoàn thành</small>
                        </hgroup>
                        <Button className={styles.btnBanner__Content}>
                            <div className={styles.btnBanner__Content__Title}>Học ngay</div>
                            <Image src='/img/arrowlightblue.svg' className={styles.btnBanner__Content__Icon} />
                        </Button>
                    </section>
                </article>
            </Container>
        </>
    )
}

export default Banner