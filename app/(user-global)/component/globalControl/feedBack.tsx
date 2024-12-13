import styles from '@public/styles/globalControl/FeedBack.module.css';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import FormFeedback from './FormFeedback';
const FeedBack = () => {
    return (
        <Container className={styles.container} id='Feadback'>
            <header className={styles.header}>
                <h2 className={styles.heading}>Liên hệ tư vấn</h2>
                <h4 className={styles.subTitle}>Call me</h4>
            </header>
            <Row className={styles.body}>
                <Col xs={6}>
                    <Image src="https://res.cloudinary.com/dnmc89c8b/image/upload/v1734073048/fe_image/sale.png" alt="Chương trình học toàn diện" className={styles.imgLeft} />
                </Col>
                <Col xs={6}>
                    <FormFeedback />
                </Col>
            </Row>

        </Container>
    );
};

export default FeedBack;
