
import styles from '@public/styles/home/ProductStudent.module.css'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'

const ProductStudent: React.FC = () => {
    return (
        <>
            <Container className={styles.container}>
                <Image src="/img/productStudentIcon.svg" alt="" className={styles.imgIcon} />
                <div className={styles.bgTop}></div>
                <Row className={styles.main}>
                    <Col className={styles.header}>
                        <h2 className={styles.header__heading}>
                            Một số sản phẩm của học viên
                        </h2>
                        <h4 className={styles.header__title}>
                            Product
                        </h4>
                    </Col>
                    <Col className={styles.group__post}>
                        <Card className={styles.post}>
                            <Card.Img src="/img/productStudent.svg" className={styles.post__img} />
                            <Card.Body className={styles.post__body}>
                                <Card.Title className={styles.post__title}>Website Audi clone Website Audi cloneWebsite Audi clone</Card.Title>
                                <Button className={styles.btn__post}>
                                    <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 18L15 12L9 6" stroke="#15C8E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </Button>
                            </Card.Body>
                        </Card>
                        <Card className={styles.post}>
                            <Card.Img src="/img/productStudent.svg" className={styles.post__img} />
                            <Card.Body className={styles.post__body}>
                                <Card.Title className={styles.post__title}>Website Audi clone Website Audi cloneWebsite Audi clone</Card.Title>
                                <Button className={styles.btn__post}>
                                    <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 18L15 12L9 6" stroke="#15C8E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </Button>
                            </Card.Body>
                        </Card>
                        <Card className={styles.post}>
                            <Card.Img src="/img/productStudent.svg" className={styles.post__img} />
                            <Card.Body className={styles.post__body}>
                                <Card.Title className={styles.post__title}>Website Audi clone Website Audi cloneWebsite Audi clone</Card.Title>
                                <Button className={styles.btn__post}>
                                    <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 18L15 12L9 6" stroke="#15C8E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </Button>
                            </Card.Body>
                        </Card>
                        <Card className={styles.post}>
                            <Card.Img src="/img/productStudent.svg" className={styles.post__img} />
                            <Card.Body className={styles.post__body}>
                                <Card.Title className={styles.post__title}>Website Audi clone Website Audi cloneWebsite Audi clone</Card.Title>
                                <Button className={styles.btn__post}>
                                    <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 18L15 12L9 6" stroke="#15C8E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </Button>
                            </Card.Body>
                        </Card>
                        <Card className={styles.post}>
                            <Card.Img src="/img/productStudent.svg" className={styles.post__img} />
                            <Card.Body className={styles.post__body}>
                                <Card.Title className={styles.post__title}>Website Audi clone Website Audi cloneWebsite Audi clone</Card.Title>
                                <Button className={styles.btn__post}>
                                    <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 18L15 12L9 6" stroke="#15C8E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <div className={styles.bgBottom}></div>
                <div className={styles.btn__group}>
                    <Button className={styles.btn__prev}>
                        <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="#15C8E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={styles.stroke__icon} />
                        </svg>
                    </Button>
                    <Button className={styles.btn__next}>
                        <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="#15C8E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </Button>
                </div>
            </Container>
        </>
    )
}

export default ProductStudent 