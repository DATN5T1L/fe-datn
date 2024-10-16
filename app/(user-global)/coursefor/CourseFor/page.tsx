import { Card, Col, Container, Image, Row } from "react-bootstrap"
import Button from "@/app/(user-global)/component/globalControl/btnComponent"
import styles from '@public/styles/home/CoursePro.module.css'
import styleFor from "../style.module.css"

const CourseFor: React.FC = () => {
    return (
        <>
            <Container className={styleFor.container}>
                <section className={styleFor.main}>
                    <h2 className={styleFor.main__title} aria-hidden={true}>Khóa học Pro</h2>
                    <p className={styleFor.main__subTitle}>
                        Khóa học của bạn là khóa học mà bạn đã chọn, bao gồm các khóa học mà bạn đã mua hoặc các khóa học miễn phí.
                    </p>
                </section>
                <section className={styleFor.cta}>

                    <div className={styleFor.ctaLeft}>
                        <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} height={40}>Khóa học có phí</Button>
                        <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} height={40}>Khóa học miễn phí</Button>
                    </div>
                    <Button type="secondery" status="hover" size="S" leftIcon={false} rightIcon={true} chevron={4} width={145} height={40}>Tất cả</Button>
                </section>
                <section className={styleFor.listCard}>
                    <Row className={styleFor.mainCard}>
                        <Col md={3} className={styles.mainBox}>
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
                        {/* Cột 2 */}
                        <Col md={3} className={styles.mainBox}>
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
                        {/* Cột 3 */}
                        <Col md={3} className={styles.mainBox}>
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
                        {/* Cột 4 */}
                        <Col md={3} className={styles.mainBox}>
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
                </section>
            </Container>
        </>
    )
}

export default CourseFor