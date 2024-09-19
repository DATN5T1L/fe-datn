'use client'
import React from 'react';
import styles from '@public/styles/course/CourseToTakeForm.module.css'
import { Container, Row, Col, Button, Form, Card, Image } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

interface CourseFormProps {
    title?:string;
}

const CourseForm: React.FC<CourseFormProps> = ({title=""}) => {
    return (
        <>
            <Container className={styles.container}>
                <section className={styles.header}>
                    <Image src="/img/blueBox.svg" alt="" className={styles.header__img} />
                    <h1 className={styles.header__title}>{title}</h1>
                </section>
                <Row md={12} className={styles.main}>
                    <Col md={4} className={styles.mainBox}>
                        <Card className={styles.mainBox__content}>
                            <Card.Header className={styles.headerContent}>
                                <section className={styles.headerContent__text}>
                                    <Card.Title className={styles.text__hedding2}>
                                        WEBSITE DESIGN UI/UX
                                    </Card.Title>
                                    <Card.Subtitle className={styles.text__hedding3}>
                                        by My Team
                                    </Card.Subtitle>
                                    <Card.Img src="/img/iconReact.svg" alt="" className={styles.text__img} />
                                </section>
                                <Card.Img src="/img/tuan.png" alt="" className={styles.headerContent__avt} />
                            </Card.Header>
                            <Card.Body className={styles.mainContent}>
                                <section className={styles.mainContent__headContent}>
                                    <div className={styles.headContent__evaluete}>
                                        <div className={styles.evaluete__main}>
                                            <div className={styles.starGroup}>
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                            </div>

                                            <Card.Text className={styles.starNumber}>
                                                {'('} 4,5 {')'}
                                            </Card.Text>
                                        </div>
                                    </div>
                                    <div className={styles.headContent__percent}>
                                        <Card.Text className={styles.evaluete__note}>
                                            {'('} 504 phản hồi {')'}
                                        </Card.Text>
                                    </div>
                                </section>
                                <section className={styles.bodyContent}>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookoffgreen.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Chương</Card.Text>
                                    </div>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookopenblue.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Bài tập</Card.Text>
                                    </div>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookopenyellow.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Đã học</Card.Text>
                                    </div>
                                </section>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className={styles.mainBox}>
                        <Card className={styles.mainBox__content}>
                            <Card.Header className={styles.headerContent}>
                                <section className={styles.headerContent__text}>
                                    <Card.Title className={styles.text__hedding2}>
                                        WEBSITE DESIGN UI/UX
                                    </Card.Title>
                                    <Card.Subtitle className={styles.text__hedding3}>
                                        by My Team
                                    </Card.Subtitle>
                                    <Card.Img src="/img/iconReact.svg" alt="" className={styles.text__img} />
                                </section>
                                <Card.Img src="/img/tuan.png" alt="" className={styles.headerContent__avt} />
                            </Card.Header>
                            <Card.Body className={styles.mainContent}>
                                <section className={styles.mainContent__headContent}>
                                    <div className={styles.headContent__evaluete}>
                                        <div className={styles.evaluete__main}>
                                            <div className={styles.starGroup}>
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                            </div>

                                            <Card.Text className={styles.starNumber}>
                                                {'('} 4,5 {')'}
                                            </Card.Text>
                                        </div>
                                    </div>
                                    <div className={styles.headContent__percent}>
                                        <Card.Text className={styles.evaluete__note}>
                                            {'('} 504 phản hồi {')'}
                                        </Card.Text>
                                    </div>
                                </section>
                                <section className={styles.bodyContent}>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookoffgreen.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Chương</Card.Text>
                                    </div>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookopenblue.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Bài tập</Card.Text>
                                    </div>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookopenyellow.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Đã học</Card.Text>
                                    </div>
                                </section>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className={styles.mainBox}>
                        <Card className={styles.mainBox__content}>
                            <Card.Header className={styles.headerContent}>
                                <section className={styles.headerContent__text}>
                                    <Card.Title className={styles.text__hedding2}>
                                        WEBSITE DESIGN UI/UX
                                    </Card.Title>
                                    <Card.Subtitle className={styles.text__hedding3}>
                                        by My Team
                                    </Card.Subtitle>
                                    <Card.Img src="/img/iconReact.svg" alt="" className={styles.text__img} />
                                </section>
                                <Card.Img src="/img/tuan.png" alt="" className={styles.headerContent__avt} />
                            </Card.Header>
                            <Card.Body className={styles.mainContent}>
                                <section className={styles.mainContent__headContent}>
                                    <div className={styles.headContent__evaluete}>
                                        <div className={styles.evaluete__main}>
                                            <div className={styles.starGroup}>
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                            </div>

                                            <Card.Text className={styles.starNumber}>
                                                {'('} 4,5 {')'}
                                            </Card.Text>
                                        </div>
                                    </div>
                                    <div className={styles.headContent__percent}>
                                        <Card.Text className={styles.evaluete__note}>
                                            {'('} 504 phản hồi {')'}
                                        </Card.Text>
                                    </div>
                                </section>
                                <section className={styles.bodyContent}>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookoffgreen.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Chương</Card.Text>
                                    </div>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookopenblue.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Bài tập</Card.Text>
                                    </div>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookopenyellow.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Đã học</Card.Text>
                                    </div>
                                </section>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className={styles.mainBox}>
                        <Card className={styles.mainBox__content}>
                            <Card.Header className={styles.headerContent}>
                                <section className={styles.headerContent__text}>
                                    <Card.Title className={styles.text__hedding2}>
                                        WEBSITE DESIGN UI/UX
                                    </Card.Title>
                                    <Card.Subtitle className={styles.text__hedding3}>
                                        by My Team
                                    </Card.Subtitle>
                                    <Card.Img src="/img/iconReact.svg" alt="" className={styles.text__img} />
                                </section>
                                <Card.Img src="/img/tuan.png" alt="" className={styles.headerContent__avt} />
                            </Card.Header>
                            <Card.Body className={styles.mainContent}>
                                <section className={styles.mainContent__headContent}>
                                    <div className={styles.headContent__evaluete}>
                                        <div className={styles.evaluete__main}>
                                            <div className={styles.starGroup}>
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                            </div>

                                            <Card.Text className={styles.starNumber}>
                                                {'('} 4,5 {')'}
                                            </Card.Text>
                                        </div>
                                    </div>
                                    <div className={styles.headContent__percent}>
                                        <Card.Text className={styles.evaluete__note}>
                                            {'('} 504 phản hồi {')'}
                                        </Card.Text>
                                    </div>
                                </section>
                                <section className={styles.bodyContent}>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookoffgreen.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Chương</Card.Text>
                                    </div>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookopenblue.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Bài tập</Card.Text>
                                    </div>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookopenyellow.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Đã học</Card.Text>
                                    </div>
                                </section>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className={styles.mainBox}>
                        <Card className={styles.mainBox__content}>
                            <Card.Header className={styles.headerContent}>
                                <section className={styles.headerContent__text}>
                                    <Card.Title className={styles.text__hedding2}>
                                        WEBSITE DESIGN UI/UX
                                    </Card.Title>
                                    <Card.Subtitle className={styles.text__hedding3}>
                                        by My Team
                                    </Card.Subtitle>
                                    <Card.Img src="/img/iconReact.svg" alt="" className={styles.text__img} />
                                </section>
                                <Card.Img src="/img/tuan.png" alt="" className={styles.headerContent__avt} />
                            </Card.Header>
                            <Card.Body className={styles.mainContent}>
                                <section className={styles.mainContent__headContent}>
                                    <div className={styles.headContent__evaluete}>
                                        <div className={styles.evaluete__main}>
                                            <div className={styles.starGroup}>
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                            </div>

                                            <Card.Text className={styles.starNumber}>
                                                {'('} 4,5 {')'}
                                            </Card.Text>
                                        </div>
                                    </div>
                                    <div className={styles.headContent__percent}>
                                        <Card.Text className={styles.evaluete__note}>
                                            {'('} 504 phản hồi {')'}
                                        </Card.Text>
                                    </div>
                                </section>
                                <section className={styles.bodyContent}>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookoffgreen.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Chương</Card.Text>
                                    </div>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookopenblue.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Bài tập</Card.Text>
                                    </div>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookopenyellow.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Đã học</Card.Text>
                                    </div>
                                </section>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className={styles.mainBox}>
                        <Card className={styles.mainBox__content}>
                            <Card.Header className={styles.headerContent}>
                                <section className={styles.headerContent__text}>
                                    <Card.Title className={styles.text__hedding2}>
                                        WEBSITE DESIGN UI/UX
                                    </Card.Title>
                                    <Card.Subtitle className={styles.text__hedding3}>
                                        by My Team
                                    </Card.Subtitle>
                                    <Card.Img src="/img/iconReact.svg" alt="" className={styles.text__img} />
                                </section>
                                <Card.Img src="/img/tuan.png" alt="" className={styles.headerContent__avt} />
                            </Card.Header>
                            <Card.Body className={styles.mainContent}>
                                <section className={styles.mainContent__headContent}>
                                    <div className={styles.headContent__evaluete}>
                                        <div className={styles.evaluete__main}>
                                            <div className={styles.starGroup}>
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                            </div>

                                            <Card.Text className={styles.starNumber}>
                                                {'('} 4,5 {')'}
                                            </Card.Text>
                                        </div>
                                    </div>
                                    <div className={styles.headContent__percent}>
                                        <Card.Text className={styles.evaluete__note}>
                                            {'('} 504 phản hồi {')'}
                                        </Card.Text>
                                    </div>
                                </section>
                                <section className={styles.bodyContent}>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookoffgreen.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Chương</Card.Text>
                                    </div>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookopenblue.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Bài tập</Card.Text>
                                    </div>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookopenyellow.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Đã học</Card.Text>
                                    </div>
                                </section>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className={styles.mainBox}>
                        <Card className={styles.mainBox__content}>
                            <Card.Header className={styles.headerContent}>
                                <section className={styles.headerContent__text}>
                                    <Card.Title className={styles.text__hedding2}>
                                        WEBSITE DESIGN UI/UX
                                    </Card.Title>
                                    <Card.Subtitle className={styles.text__hedding3}>
                                        by My Team
                                    </Card.Subtitle>
                                    <Card.Img src="/img/iconReact.svg" alt="" className={styles.text__img} />
                                </section>
                                <Card.Img src="/img/tuan.png" alt="" className={styles.headerContent__avt} />
                            </Card.Header>
                            <Card.Body className={styles.mainContent}>
                                <section className={styles.mainContent__headContent}>
                                    <div className={styles.headContent__evaluete}>
                                        <div className={styles.evaluete__main}>
                                            <div className={styles.starGroup}>
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                            </div>

                                            <Card.Text className={styles.starNumber}>
                                                {'('} 4,5 {')'}
                                            </Card.Text>
                                        </div>
                                    </div>
                                    <div className={styles.headContent__percent}>
                                        <Card.Text className={styles.evaluete__note}>
                                            {'('} 504 phản hồi {')'}
                                        </Card.Text>
                                    </div>
                                </section>
                                <section className={styles.bodyContent}>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookoffgreen.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Chương</Card.Text>
                                    </div>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookopenblue.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Bài tập</Card.Text>
                                    </div>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookopenyellow.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Đã học</Card.Text>
                                    </div>
                                </section>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className={styles.mainBox}>
                        <Card className={styles.mainBox__content}>
                            <Card.Header className={styles.headerContent}>
                                <section className={styles.headerContent__text}>
                                    <Card.Title className={styles.text__hedding2}>
                                        WEBSITE DESIGN UI/UX
                                    </Card.Title>
                                    <Card.Subtitle className={styles.text__hedding3}>
                                        by My Team
                                    </Card.Subtitle>
                                    <Card.Img src="/img/iconReact.svg" alt="" className={styles.text__img} />
                                </section>
                                <Card.Img src="/img/tuan.png" alt="" className={styles.headerContent__avt} />
                            </Card.Header>
                            <Card.Body className={styles.mainContent}>
                                <section className={styles.mainContent__headContent}>
                                    <div className={styles.headContent__evaluete}>
                                        <div className={styles.evaluete__main}>
                                            <div className={styles.starGroup}>
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/star.svg" alt="" className={styles.starElement} />
                                            </div>

                                            <Card.Text className={styles.starNumber}>
                                                {'('} 4,5 {')'}
                                            </Card.Text>
                                        </div>
                                    </div>
                                    <div className={styles.headContent__percent}>
                                        <Card.Text className={styles.evaluete__note}>
                                            {'('} 504 phản hồi {')'}
                                        </Card.Text>
                                    </div>
                                </section>
                                <section className={styles.bodyContent}>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookoffgreen.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Chương</Card.Text>
                                    </div>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookopenblue.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Bài tập</Card.Text>
                                    </div>
                                    <div className={styles.bodyContent__element}>
                                        <Image src="/img/bookopenyellow.svg" alt="" className={styles.element__img} />
                                        <Card.Text className={styles.element__text}>10 Đã học</Card.Text>
                                    </div>
                                </section>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CourseForm