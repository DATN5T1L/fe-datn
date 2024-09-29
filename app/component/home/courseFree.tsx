import { Card, Col, Container, Image, Row } from "react-bootstrap"
import Button from "../btnComponent"
import styles from '@public/styles/home/CourseFree.module.css'


const CourseFree: React.FC = () => {
    return (
        <>
            <Container className={styles.container}>
                <Image src="/img/VectorBg.svg" alt="" className={styles.imgBg}/>
                <Row className={styles.header}>
                    <Col className={styles.header__content__left}>
                        <Image src="/img/GroupLeft2.svg" alt="group left" className={styles.header__content__leftIcon} />
                        <section className={styles.main}>
                            <h2 className={styles.main__title__content}>Khóa học miễn phí</h2>
                            <h4 className={styles.main__subTitle__content}>
                                Khóa học được xây dựng bởi đội ngũ TTO.SH
                            </h4>
                        </section>
                        <Image src="/img/GroupRight2.svg" alt="group right" className={styles.header__content__rightIcon} />
                    </Col>
                    <Col className={styles.header__content__right}>
                        <h3 className={styles.header__content__right__title}>
                            Chương trình học đa dạng sẽ giúp bạn tiến gần hơn đến ước mơ của mình. Dù học trực tiếp hay trực tuyến,
                            bạn chắc chắn sẽ tìm thấy khóa học phù hợp với mục tiêu của mình.
                        </h3>
                    </Col>
                </Row>
                <Row className={styles.nav}>
                    <Col className={styles.nav__btn__muti}>
                        <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} height={40}>Khóa học lộ trình FE</Button>
                        <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} height={40}>Khóa học lộ trình BE</Button>
                        <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} width={225} height={40}>Khóa học lộ trình Tester</Button>
                        <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} width={245} height={40}>Khóa học lộ trình Designer</Button>
                    </Col>
                    <Col className={styles.nav__btn__single}>
                        <Button type="secondery" status="hover" size="S" leftIcon={false} rightIcon={true} chevron={4} width={145} height={40}>Xem thêm</Button>
                    </Col>
                </Row>
                <Row md={12} className={styles.main__course}>
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
                                <section className={styles.mainContent__headContent}>
                                    <div className={styles.headContent__evaluete}>
                                        <div className={styles.evaluete__main}>
                                            <div className={styles.starGroup}>
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
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
                                <section className={styles.mainContent__headContent}>
                                    <div className={styles.headContent__evaluete}>
                                        <div className={styles.evaluete__main}>
                                            <div className={styles.starGroup}>
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
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
                                <section className={styles.mainContent__headContent}>
                                    <div className={styles.headContent__evaluete}>
                                        <div className={styles.evaluete__main}>
                                            <div className={styles.starGroup}>
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
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
                                <section className={styles.mainContent__headContent}>
                                    <div className={styles.headContent__evaluete}>
                                        <div className={styles.evaluete__main}>
                                            <div className={styles.starGroup}>
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
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
                                <section className={styles.mainContent__headContent}>
                                    <div className={styles.headContent__evaluete}>
                                        <div className={styles.evaluete__main}>
                                            <div className={styles.starGroup}>
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
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
                                <section className={styles.mainContent__headContent}>
                                    <div className={styles.headContent__evaluete}>
                                        <div className={styles.evaluete__main}>
                                            <div className={styles.starGroup}>
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
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
                                <section className={styles.mainContent__headContent}>
                                    <div className={styles.headContent__evaluete}>
                                        <div className={styles.evaluete__main}>
                                            <div className={styles.starGroup}>
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
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
                                <section className={styles.mainContent__headContent}>
                                    <div className={styles.headContent__evaluete}>
                                        <div className={styles.evaluete__main}>
                                            <div className={styles.starGroup}>
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
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
                                <section className={styles.mainContent__headContent}>
                                    <div className={styles.headContent__evaluete}>
                                        <div className={styles.evaluete__main}>
                                            <div className={styles.starGroup}>
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                <Image src="/img/iconStar.svg" alt="" className={styles.starElement} />
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
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CourseFree