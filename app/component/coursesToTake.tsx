'use client'
import React from 'react';
import styles from '../../public/styles/CoursesToTake.module.css'
import { Container, Row, Col, Button, Spinner, Nav, Navbar, Form, NavDropdown } from 'react-bootstrap';
import { Bell, Box, BoxArrowLeft, BoxFill, Calendar, CalendarFill, ChatFill, Coin, GearFill, HouseDoorFill, PeopleFill, Search } from 'react-bootstrap-icons';



const CoursesToTake: React.FC = () => {
    return (
        <>
            <section className={styles.container}>
                <div className={styles.header}>
                    <img src="/img/blueBox.svg" alt="" />
                    <h1>Khóa học nên học</h1>
                </div>
                <div className={styles.nav}>
                    <Form className={styles.searchBar}>
                        <Form.Control
                            type="search"
                            placeholder="Tìm kiếm"
                            aria-label="Search"
                            className={styles.searchInput}
                        />
                        <Button variant="outline-secondary" className={styles.searchButton}>
                            <Search />
                        </Button>
                    </Form>
                    <div className={styles.control}>
                        <div className={styles.controlElement1}>
                            <img src="/img/check.svg" alt="" />
                            <img src="/img/Widget 7.svg" alt="" />
                        </div>
                        <div className={styles.controlElement2}>
                            <img src="/img/ItemDoc.svg" alt="" />
                        </div>
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.box}>
                        <div className={styles.headMain}>
                            <div className={styles.text}>
                                <h2 className={styles.hedding2}>
                                    WEBSITE DESIGN UI/UX
                                </h2>
                                <h2 className={styles.hedding3}>
                                    by My Team
                                </h2>
                                <img src="/img/iconReact.svg" alt="" />
                            </div>
                            <img src="/img/tuan.png" alt="" className={styles.avt} />
                        </div>
                        <div className={styles.content}>
                            <div className={styles.headContent}>
                                <div className={styles.evaluete}>
                                    <div className={styles.star}>
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <div>
                                            {'('} 4,5 {')'}
                                        </div>
                                    </div>
                                    <div className={styles.note}>
                                        {'('} 504 phản hồi {')'}
                                    </div>
                                </div>
                                <div className={styles.percent}>
                                    <div className={styles.wrap}>
                                        <div className={styles.imgWrap}>
                                            <div className={styles.imgNumber}>
                                                40%
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>
                                        <p>Đang học</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.bodyContent}>
                                <div className={styles.contentElement}>
                                    <img src="/img/bookoffgreen.svg" alt="" />
                                    <p>10 Chương</p>
                                </div>
                                <div className={styles.contentElement}>
                                    <img src="/img/bookopenblue.svg" alt="" />
                                    <p>10 Bài tập</p>
                                </div>
                                <div className={styles.contentElement}>
                                    <img src="/img/bookopenyellow.svg" alt="" />
                                    <p>10 Đã học</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.headMain}>
                            <div className={styles.text}>
                                <h2 className={styles.hedding2}>
                                    WEBSITE DESIGN UI/UX
                                </h2>
                                <h2 className={styles.hedding3}>
                                    by My Team
                                </h2>
                                <img src="/img/iconReact.svg" alt="" />
                            </div>
                            <img src="/img/tuan.png" alt="" className={styles.avt} />
                        </div>
                        <div className={styles.content}>
                            <div className={styles.headContent}>
                                <div className={styles.evaluete}>
                                    <div className={styles.star}>
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <div>
                                            {'('} 4,5 {')'}
                                        </div>
                                    </div>
                                    <div className={styles.note}>
                                        {'('} 504 phản hồi {')'}
                                    </div>
                                </div>
                                <div className={styles.percent}>
                                    <div className={styles.wrap}>
                                        <div className={styles.imgWrap}>
                                            <div className={styles.imgNumber}>
                                                40%
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>
                                        <p>Đang học</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.bodyContent}>
                                <div className={styles.contentElement}>
                                    <img src="/img/bookoffgreen.svg" alt="" />
                                    <p>10 Chương</p>
                                </div>
                                <div className={styles.contentElement}>
                                    <img src="/img/bookopenblue.svg" alt="" />
                                    <p>10 Bài tập</p>
                                </div>
                                <div className={styles.contentElement}>
                                    <img src="/img/bookopenyellow.svg" alt="" />
                                    <p>10 Đã học</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.headMain}>
                            <div className={styles.text}>
                                <h2 className={styles.hedding2}>
                                    WEBSITE DESIGN UI/UX
                                </h2>
                                <h2 className={styles.hedding3}>
                                    by My Team
                                </h2>
                                <img src="/img/iconReact.svg" alt="" />
                            </div>
                            <img src="/img/tuan.png" alt="" className={styles.avt} />
                        </div>
                        <div className={styles.content}>
                            <div className={styles.headContent}>
                                <div className={styles.evaluete}>
                                    <div className={styles.star}>
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <div>
                                            {'('} 4,5 {')'}
                                        </div>
                                    </div>
                                    <div className={styles.note}>
                                        {'('} 504 phản hồi {')'}
                                    </div>
                                </div>
                                <div className={styles.percent}>
                                    <div className={styles.wrap}>
                                        <div className={styles.imgWrap}>
                                            <div className={styles.imgNumber}>
                                                40%
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>
                                        <p>Đang học</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.bodyContent}>
                                <div className={styles.contentElement}>
                                    <img src="/img/bookoffgreen.svg" alt="" />
                                    <p>10 Chương</p>
                                </div>
                                <div className={styles.contentElement}>
                                    <img src="/img/bookopenblue.svg" alt="" />
                                    <p>10 Bài tập</p>
                                </div>
                                <div className={styles.contentElement}>
                                    <img src="/img/bookopenyellow.svg" alt="" />
                                    <p>10 Đã học</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.headMain}>
                            <div className={styles.text}>
                                <h2 className={styles.hedding2}>
                                    WEBSITE DESIGN UI/UX
                                </h2>
                                <h2 className={styles.hedding3}>
                                    by My Team
                                </h2>
                                <img src="/img/iconReact.svg" alt="" />
                            </div>
                            <img src="/img/tuan.png" alt="" className={styles.avt} />
                        </div>
                        <div className={styles.content}>
                            <div className={styles.headContent}>
                                <div className={styles.evaluete}>
                                    <div className={styles.star}>
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <div>
                                            {'('} 4,5 {')'}
                                        </div>
                                    </div>
                                    <div className={styles.note}>
                                        {'('} 504 phản hồi {')'}
                                    </div>
                                </div>
                                <div className={styles.percent}>
                                    <div className={styles.wrap}>
                                        <div className={styles.imgWrap}>
                                            <div className={styles.imgNumber}>
                                                40%
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>
                                        <p>Đang học</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.bodyContent}>
                                <div className={styles.contentElement}>
                                    <img src="/img/bookoffgreen.svg" alt="" />
                                    <p>10 Chương</p>
                                </div>
                                <div className={styles.contentElement}>
                                    <img src="/img/bookopenblue.svg" alt="" />
                                    <p>10 Bài tập</p>
                                </div>
                                <div className={styles.contentElement}>
                                    <img src="/img/bookopenyellow.svg" alt="" />
                                    <p>10 Đã học</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.headMain}>
                            <div className={styles.text}>
                                <h2 className={styles.hedding2}>
                                    WEBSITE DESIGN UI/UX
                                </h2>
                                <h2 className={styles.hedding3}>
                                    by My Team
                                </h2>
                                <img src="/img/iconReact.svg" alt="" />
                            </div>
                            <img src="/img/tuan.png" alt="" className={styles.avt} />
                        </div>
                        <div className={styles.content}>
                            <div className={styles.headContent}>
                                <div className={styles.evaluete}>
                                    <div className={styles.star}>
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <div>
                                            {'('} 4,5 {')'}
                                        </div>
                                    </div>
                                    <div className={styles.note}>
                                        {'('} 504 phản hồi {')'}
                                    </div>
                                </div>
                                <div className={styles.percent}>
                                    <div className={styles.wrap}>
                                        <div className={styles.imgWrap}>
                                            <div className={styles.imgNumber}>
                                                40%
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>
                                        <p>Đang học</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.bodyContent}>
                                <div className={styles.contentElement}>
                                    <img src="/img/bookoffgreen.svg" alt="" />
                                    <p>10 Chương</p>
                                </div>
                                <div className={styles.contentElement}>
                                    <img src="/img/bookopenblue.svg" alt="" />
                                    <p>10 Bài tập</p>
                                </div>
                                <div className={styles.contentElement}>
                                    <img src="/img/bookopenyellow.svg" alt="" />
                                    <p>10 Đã học</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.headMain}>
                            <div className={styles.text}>
                                <h2 className={styles.hedding2}>
                                    WEBSITE DESIGN UI/UX
                                </h2>
                                <h2 className={styles.hedding3}>
                                    by My Team
                                </h2>
                                <img src="/img/iconReact.svg" alt="" />
                            </div>
                            <img src="/img/tuan.png" alt="" className={styles.avt} />
                        </div>
                        <div className={styles.content}>
                            <div className={styles.headContent}>
                                <div className={styles.evaluete}>
                                    <div className={styles.star}>
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <div>
                                            {'('} 4,5 {')'}
                                        </div>
                                    </div>
                                    <div className={styles.note}>
                                        {'('} 504 phản hồi {')'}
                                    </div>
                                </div>
                                <div className={styles.percent}>
                                    <div className={styles.wrap}>
                                        <div className={styles.imgWrap}>
                                            <div className={styles.imgNumber}>
                                                40%
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>
                                        <p>Đang học</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.bodyContent}>
                                <div className={styles.contentElement}>
                                    <img src="/img/bookoffgreen.svg" alt="" />
                                    <p>10 Chương</p>
                                </div>
                                <div className={styles.contentElement}>
                                    <img src="/img/bookopenblue.svg" alt="" />
                                    <p>10 Bài tập</p>
                                </div>
                                <div className={styles.contentElement}>
                                    <img src="/img/bookopenyellow.svg" alt="" />
                                    <p>10 Đã học</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CoursesToTake