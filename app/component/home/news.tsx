'use client'
import Link from 'next/link';
import React from 'react';
import styles from '../../../public/styles/home/News.module.css'
import { Container, Row, Col, Button, Spinner, Nav, Navbar, Form, NavDropdown } from 'react-bootstrap';
import { Bell, Box, BoxArrowLeft, BoxFill, Calendar, CalendarFill, ChatFill, Coin, GearFill, HouseDoorFill, PeopleFill, Search } from 'react-bootstrap-icons';

const News: React.FC = () => {
    return (
        <>
            <section className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div>
                            <img src="/img/Document.svg" alt="" />
                        </div>
                        <h1>Tin tức</h1>
                    </div>
                    <Link href={'/'} className={styles.headerRight}>
                        <h2>Xem thêm</h2>
                        <img src="/img/arrowRightBlue.svg" alt="" />
                    </Link>
                </div>
                <div className={styles.main}>
                    <div className={styles.box}>
                        <div className={styles.headerMain}>
                            <img src="/img/post1.png" alt="" />
                        </div>
                        <div className={styles.containerMain}>
                            <h2 className={styles.name}>
                                Bộ công nghệ thông tin vừa ra mắt robot 5.0
                            </h2>
                            <div className={styles.content}>
                                <div className={styles.leftContent}>
                                    <img src="/img/Calendarblue.svg" alt="" />
                                    <div>
                                        28/08/2024
                                    </div>
                                </div>
                                <div className={styles.rightContent}>
                                    <p>
                                        999
                                    </p>
                                    <img src="/img/eyeYellow.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.headerMain}>
                            <img src="/img/post2.png" alt="" />
                        </div>
                        <div className={styles.containerMain}>
                            <h2 className={styles.name}>
                                Bộ công nghệ thông tin vừa ra mắt robot 5.0
                            </h2>
                            <div className={styles.content}>
                                <div className={styles.leftContent}>
                                    <img src="/img/Calendarblue.svg" alt="" />
                                    <div>
                                        28/08/2024
                                    </div>
                                </div>
                                <div className={styles.rightContent}>
                                    <p>
                                        999
                                    </p>
                                    <img src="/img/eyeYellow.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.headerMain}>
                            <img src="/img/post3.png" alt="" />
                        </div>
                        <div className={styles.containerMain}>
                            <h2 className={styles.name}>
                                Bộ công nghệ thông tin vừa ra mắt robot 5.0
                            </h2>
                            <div className={styles.content}>
                                <div className={styles.leftContent}>
                                    <img src="/img/Calendarblue.svg" alt="" />
                                    <div>
                                        28/08/2024
                                    </div>
                                </div>
                                <div className={styles.rightContent}>
                                    <p>
                                        999
                                    </p>
                                    <img src="/img/eyeYellow.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default News;