'use client'
import React from 'react';
import styles from '@public/styles/home/Statistical.module.css';
import { Container, Nav, Image } from 'react-bootstrap';

const Statistical: React.FC = () => {
    return (
        <>
            <Container className={styles.container}>
                <Nav className={styles.container__content}>
                    <Nav.Link href='#' className={`${styles.navLink} ${styles.blueLight}`}>
                        <Image src="/img/greenBox.svg" alt="" className={styles.navLink__img}/>
                        <article className={styles.navLink__content}>
                            <div className={`${styles.navLink__content__number } ${styles.darkGreenNumber}`}>
                                39
                            </div>
                            <div className={styles.navLink__content__name}>
                                Khóa học
                            </div>
                        </article>
                    </Nav.Link>
                    <Nav.Link href='#' className={`${styles.navLink} ${styles.greenLight}`}>
                        <Image src="/img/mess.svg" alt="" className={styles.navLink__img}/>
                        <article className={styles.navLink__content}>
                            <div className={`${styles.navLink__content__number} ${styles.blueNumber}`}>
                                12
                            </div>
                            <div className={styles.navLink__content__name}>
                                Tin nhắn
                            </div>
                        </article>
                    </Nav.Link>
                    <Nav.Link href='#' className={`${styles.navLink} ${styles.redLight}`}>
                        <Image src="/img/electrical.svg" alt="" className={styles.navLink__img}/>
                        <article className={styles.navLink__content}>
                            <div className={`${styles.navLink__content__number} ${styles.blueLightNumber}`}>
                                24
                            </div>
                            <div className={styles.navLink__content__name}>
                                Hoạt động
                            </div>
                        </article>
                    </Nav.Link>
                    <Nav.Link href='#' className={`${styles.navLink} ${styles.darkGreenLight}`}>
                        <Image src="/img/peoplegreen.svg" alt="" className={styles.navLink__img}/>
                        <article className={styles.navLink__content}>
                            <div className={`${styles.navLink__content__number } ${styles.darkGreenNumber}`}>
                                24
                            </div>
                            <div className={styles.navLink__content__name}>
                                Nhóm lớp
                            </div>
                        </article>
                    </Nav.Link>
                </Nav>
            </Container>
        </>
    )
}

export default Statistical;