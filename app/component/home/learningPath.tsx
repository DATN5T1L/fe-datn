import { Button, Card, Col, Container, Row } from "react-bootstrap"
import ButtonComponet from "../btnComponent"
import styles from '@public/styles/home/LearningPath.module.css'


const LearningPath: React.FC = () => {
    return (
        <>
            <Container className={styles.container}>
                <Row className={styles.body__container}>
                    <Col className={styles.container__header}>
                        <section className={styles.header__title}>
                            <div className={styles.header__box__blue}>
                                <div className={styles.header__box_pink}></div>
                            </div>
                            <h2 className={styles.header__title__content}>
                                Lộ trình của TTO.SH
                            </h2>
                            <div className={styles.header__border__blue}>
                                <div className={styles.header__box__grayBlue}></div>
                            </div>
                        </section>
                        <section className={styles.btn__group}>
                            <ButtonComponet status={'hover'} hover={true} hoverType={'default'} rightIcon={false} width={264} height={40} widthText="201px">
                                Tạo lộ trình của riêng bạn
                            </ButtonComponet>
                        </section>
                    </Col>
                    <Col className={styles.container__main}>
                        <Card className={styles.box}>
                            <Card.Img src="/img/ImageICate.svg" className={styles.box__img} />
                            <Card.Body className={styles.box__body}>
                                <Card.Title className={styles.box__body__title}>Lộ trình học Front-end Developer </Card.Title>
                                <Button className={styles.box__body__btn}>Xem chi tiết lộ trình</Button>
                            </Card.Body>
                        </Card>
                        <Card className={styles.box}>
                            <Card.Img src="/img/ImageICate.svg" className={styles.box__img} />
                            <Card.Body className={styles.box__body}>
                                <Card.Title className={styles.box__body__title}>Lộ trình học Front-end Developer </Card.Title>
                                <Button className={styles.box__body__btn}>Xem chi tiết lộ trình</Button>
                            </Card.Body>
                        </Card>
                        <Card className={styles.box}>
                            <Card.Img src="/img/ImageICate.svg" className={styles.box__img} />
                            <Card.Body className={styles.box__body}>
                                <Card.Title className={styles.box__body__title}>Lộ trình học Front-end Developer </Card.Title>
                                <Button className={styles.box__body__btn}>Xem chi tiết lộ trình</Button>
                            </Card.Body>
                        </Card>
                        <Card className={styles.box}>
                            <Card.Img src="/img/ImageICate.svg" className={styles.box__img} />
                            <Card.Body className={styles.box__body}>
                                <Card.Title className={styles.box__body__title}>Lộ trình học Front-end Developer </Card.Title>
                                <Button className={styles.box__body__btn}>Xem chi tiết lộ trình</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Button className={styles.btn__next}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="#15C8E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </Button>
                </Row>
            </Container>
        </>
    )
}

export default LearningPath