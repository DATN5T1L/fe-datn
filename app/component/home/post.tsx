
import styles from '@public/styles/home/Post.module.css'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import ButtonComponet from '../btnComponent';

const Post: React.FC = () => {
    return (
        <>
            <Container className={styles.container}>
                <Row className={styles.body}>
                    <Image src="/img/postIcon.svg" alt="" className={styles.img__logo}/>
                    <Col className={styles.left__body}>
                        <Card className={styles.left__body__card}>
                            <Card.Body className={styles.left__body__card__main}>
                                <Card.Title className={styles.left__body__card__title}>Bản tin TTO.SH</Card.Title>
                                <Card.Subtitle className={styles.left__body__card__subTitle}> Post</Card.Subtitle>
                                <Card.Text className={styles.left__body__card__content}>
                                    Phát triển kỹ năng chuyên môn với các khóa học đa lĩnh vực,
                                    thực hành qua dự án thực tế và chứng chỉ giá trị.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <ButtonComponet type='secondery' size='M' status='default' leftIcon={false} chevron={2}>Xem thêm tin tức</ButtonComponet>
                        <div className={styles.left__body__card__groupBtn}>
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
                    </Col>
                    <Col className={styles.right__body}>
                        <Card className={styles.right__body__box}>
                            <Card.Img src='/img/postImg.svg' className={styles.right__body__img}></Card.Img>
                            <Card.Body className={styles.right__body__main}>
                                <Card.Subtitle className={styles.right__body__subTitle}> 2024.09.26</Card.Subtitle>
                                <Card.Title className={styles.right__body__title}>Trí tuệ nhân tạo và sự phát triển trong tương lai</Card.Title>
                                <Card.Text className={styles.right__body__content}>
                                    #Trí tuệ nhân tạo, #AI, #học máy, #tự động hóa,
                                    #dữ liệu, #Trí tuệ nhân tạo, #AI, #học máy, #tự động hóa, #dữ liệ
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className={styles.right__body__box}>
                            <Card.Img src='/img/postImg.svg' className={styles.right__body__img}></Card.Img>
                            <Card.Body className={styles.right__body__main}>
                                <Card.Subtitle className={styles.right__body__subTitle}> 2024.09.26</Card.Subtitle>
                                <Card.Title className={styles.right__body__title}>Trí tuệ nhân tạo và sự phát triển trong tương lai</Card.Title>
                                <Card.Text className={styles.right__body__content}>
                                    #Trí tuệ nhân tạo, #AI, #học máy, #tự động hóa,
                                    #dữ liệu, #Trí tuệ nhân tạo, #AI, #học máy, #tự động hóa, #dữ liệ
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className={styles.right__body__box}>
                            <Card.Img src='/img/postImg.svg' className={styles.right__body__img}></Card.Img>
                            <Card.Body className={styles.right__body__main}>
                                <Card.Subtitle className={styles.right__body__subTitle}> 2024.09.26</Card.Subtitle>
                                <Card.Title className={styles.right__body__title}>Trí tuệ nhân tạo và sự phát triển trong tương lai</Card.Title>
                                <Card.Text className={styles.right__body__content}>
                                    #Trí tuệ nhân tạo, #AI, #học máy, #tự động hóa,
                                    #dữ liệu, #Trí tuệ nhân tạo, #AI, #học máy, #tự động hóa, #dữ liệ
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Post;