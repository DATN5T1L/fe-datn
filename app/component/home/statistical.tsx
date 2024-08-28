'use client'
import React from 'react';
import styles from '../../../public/styles/home/Statistical.module.css'
import { Button, Nav } from 'react-bootstrap';
import Link from 'next/link';

const Statistical: React.FC = () => {
    return (
        <>
            <section className={styles.container}>
                <div className={styles.contentContainer}>
                    <Link href='#' className={`${styles.navLink} ${styles.blueLight}`}>
                        <img src="/img/greenBox.svg" alt="" />
                        <div className={styles.content}>
                            <div className={`${styles.number} ${styles.darkGreenNumber}`}>
                                39
                            </div>
                            <div className={styles.name}>
                                Khóa học
                            </div>
                        </div>
                    </Link>
                    <Link href='#' className={`${styles.navLink} ${styles.greenLight}`}>
                        <img src="/img/mess.svg" alt="" />
                        <div className={styles.content}>
                            <div className={`${styles.number} ${styles.blueNumber}`}>
                                12
                            </div>
                            <div className={styles.name}>
                                Tin nhắn
                            </div>
                        </div>
                    </Link>
                    <Link href='#' className={`${styles.navLink} ${styles.redLight}`}>
                        <img src="/img/electrical.svg" alt="" />
                        <div className={styles.content}>
                            <div className={`${styles.number} ${styles.blueLightNumber}`}>
                                24
                            </div>
                            <div className={styles.name}>
                                Hoạt động
                            </div>
                        </div>
                    </Link>
                    <Link href='#' className={`${styles.navLink} ${styles.darkGreenLight}`}>
                        <img src="/img/peoplegreen.svg" alt="" />
                        <div className={styles.content}>
                            <div className={`${styles.number} ${styles.darkGreenNumber}`}>
                                24
                            </div>
                            <div className={styles.name}>
                                Nhóm lớp
                            </div>
                        </div>
                    </Link>
                </div>
            </section>
        </>
    )
}

export default Statistical;