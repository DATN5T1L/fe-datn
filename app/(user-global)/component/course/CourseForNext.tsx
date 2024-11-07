import { Card, Col, Container, Image, Row } from "react-bootstrap";
import Button from "../globalControl/btnComponent";
import styles from '@public/styles/home/CoursePro.module.css';
import styleFor from "@public/styles/course/coursefor.module.css";
import { Course } from "@app/(user-global)/model/course";
import Link from "next/link";

interface CourseForProps {
    id: number|string;
}

const CourseForNext: React.FC<CourseForProps> = ({ id }) => {
    return (
        <Container className={styleFor.containerNext}>
            <svg width="100%" height="714" viewBox="0 0 1440 714" fill="none"
                xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className={styleFor.bg}>
                <g transform="scale(-1, 1) translate(-1440, 0)">
                    <path
                        d="M1441 312.147C1221 48.6752 842 332.38 0 0.291504V713.292L1439.5 712.852L1441 312.147Z"
                        fill="url(#paint0_linear_1862_4564)" />
                </g>
                <defs>
                    <filter id="filter0_i_1862_4564" x="0" y="0.291504" width="1441" height="713.5"
                        filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feColorMatrix in="SourceAlpha" type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="0.5" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix"
                            values="0 0 0 0 0.376471 0 0 0 0 0.380392 0 0 0 0 0.439216 0 0 0 0.32 0" />
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1862_4564" />
                    </filter>
                    <linearGradient id="paint0_linear_1862_4564" x1="720.5" y1="0.291504" x2="720.5"
                        y2="713.292" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#DDF8FC" />
                        <stop offset="1" stopColor="white" />
                    </linearGradient>
                </defs>
            </svg>

            <section className={styleFor.main}>
                <h2 className={styleFor.main__title} aria-hidden={true}>Khóa học nên mua kế tiếp</h2>
                <p className={styleFor.main__subTitle}>
                    Khóa học nên mua kế tiếp là các khóa học cần được học trong lộ trình học
                </p>
            </section>
            <section className={styleFor.cta}>

                <div className={styleFor.ctaLeft}>
                    <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} height={40}>Khóa học có phí</Button>
                    <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} height={40}>Khóa học miễn phí</Button>
                </div>
                <Button type="secondery" status="hover" size="S" leftIcon={false} rightIcon={true} chevron={4} width={145} height={40}>Xem thêm</Button>
            </section>
            <section>
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
                                        <Card.Text className={styles.element__text}>Học ngay</Card.Text>
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

    )
}

export default CourseForNext;