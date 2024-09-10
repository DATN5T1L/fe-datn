'use client'

import { Card, Col, Container, Image, Row } from "react-bootstrap"
import MainContainer from "../mainContainer"
import styles from '@public/styles/calender/MainCalender.module.css'
import BigCalender from "./bigCalender"

interface FullCalendarProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}

const MainCalender: React.FC<FullCalendarProps> = ({ selectedDate, onDateChange }) => {
    return (
        <>
            <MainContainer>
                <Container className={styles.mainContainer}>
                    <Row className={styles.header}>
                        <Col className={styles.header__container}>
                            <Card className={styles.header__main__card}>
                                <Card.Header className={styles.cardHeader}>
                                    <Card.Img src='/img/htmlIcon.svg' className={styles.cardImg}></Card.Img>
                                    <Card.Title className={styles.cardTitle}>HTML5 CSS3 Basic</Card.Title>
                                    <Card.Subtitle className={styles.cardSubtitle}>đang học</Card.Subtitle>
                                </Card.Header>
                                <Card.Body className={styles.cardBody}>
                                    <section className={styles.cardBody__header}>
                                        <div className={styles.cardBody__header__main}>
                                            <div className={styles.cardBody__header__title}>
                                                tiến độ
                                            </div>
                                            <div className={styles.cardBody__header__title}>
                                                40%
                                            </div>
                                        </div>
                                        <div className={styles.cardBody__nav__loading}>
                                            <div className={styles.cardBody__nav__loading__container}>

                                            </div>
                                        </div>
                                    </section>
                                    <section className={styles.cardBody__main}>
                                        <div className={styles.cardBody__main__content}>
                                            <Image src="/img/bookopenyellow.svg" className={styles.cardBody__main__content__img} />
                                            <div className={styles.cardBody__main__content__title}>2 chương</div>
                                        </div>
                                        <div className={styles.cardBody__main__content}>
                                            <Image src="/img/bookopenblue.svg" className={styles.cardBody__main__content__img} />
                                            <div className={styles.cardBody__main__content__title}>15 bài tập</div>
                                        </div>
                                    </section>
                                </Card.Body>
                            </Card>
                            <Card className={styles.header__main__card}>
                                <Card.Header className={styles.cardHeader}>
                                    <Card.Img src='/img/jsIcon.svg' className={styles.cardImg}></Card.Img>
                                    <Card.Title className={styles.cardTitle}>HTML5 CSS3 Basic</Card.Title>
                                    <Card.Subtitle className={styles.cardSubtitle}>đang học</Card.Subtitle>
                                </Card.Header>
                                <Card.Body className={styles.cardBody}>
                                    <section className={styles.cardBody__header}>
                                        <div className={styles.cardBody__header__main}>
                                            <div className={styles.cardBody__header__title}>
                                                tiến độ
                                            </div>
                                            <div className={styles.cardBody__header__title}>
                                                40%
                                            </div>
                                        </div>
                                        <div className={styles.cardBody__nav__loading}>
                                            <div className={styles.cardBody__nav__loading__container}>

                                            </div>
                                        </div>
                                    </section>
                                    <section className={styles.cardBody__main}>
                                        <div className={styles.cardBody__main__content}>
                                            <Image src="/img/bookopenyellow.svg" className={styles.cardBody__main__content__img} />
                                            <div className={styles.cardBody__main__content__title}>2 chương</div>
                                        </div>
                                        <div className={styles.cardBody__main__content}>
                                            <Image src="/img/bookopenblue.svg" className={styles.cardBody__main__content__img} />
                                            <div className={styles.cardBody__main__content__title}>15 bài tập</div>
                                        </div>
                                    </section>
                                </Card.Body>
                            </Card>
                            <Card className={styles.header__main__card}>
                                <Card.Header className={styles.cardHeader}>
                                    <Card.Img src='/img/htmlIcon.svg' className={styles.cardImg}></Card.Img>
                                    <Card.Title className={styles.cardTitle}>HTML5 CSS3 Basic</Card.Title>
                                    <Card.Subtitle className={styles.cardSubtitle}>đang học</Card.Subtitle>
                                </Card.Header>
                                <Card.Body className={styles.cardBody}>
                                    <section className={styles.cardBody__header}>
                                        <div className={styles.cardBody__header__main}>
                                            <div className={styles.cardBody__header__title}>
                                                tiến độ
                                            </div>
                                            <div className={styles.cardBody__header__title}>
                                                40%
                                            </div>
                                        </div>
                                        <div className={styles.cardBody__nav__loading}>
                                            <div className={styles.cardBody__nav__loading__container}>

                                            </div>
                                        </div>
                                    </section>
                                    <section className={styles.cardBody__main}>
                                        <div className={styles.cardBody__main__content}>
                                            <Image src="/img/bookopenyellow.svg" className={styles.cardBody__main__content__img} />
                                            <div className={styles.cardBody__main__content__title}>2 chương</div>
                                        </div>
                                        <div className={styles.cardBody__main__content}>
                                            <Image src="/img/bookopenblue.svg" className={styles.cardBody__main__content__img} />
                                            <div className={styles.cardBody__main__content__title}>15 bài tập</div>
                                        </div>
                                    </section>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className={styles.body}>
                        <Col className={styles.mainBody}>
                            <BigCalender selectedDate={selectedDate} onDateChange={onDateChange} />
                        </Col>
                    </Row>
                </Container>
            </MainContainer>
        </>
    )
}

export default MainCalender