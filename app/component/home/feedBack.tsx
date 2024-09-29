import React, { useState } from 'react';
import styles from '@public/styles/home/FeedBack.module.css';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';

const FeedBack: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [quest, setQuest] = useState('');
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <Container className={styles.container}>
            <Row className={styles.body}>
                <Col className={styles.header}>
                    <h2 className={styles.heading}>Liên hệ tư vấn</h2>
                    <h4 className={styles.subTitle}>Call me</h4>
                </Col>
                <Col className={styles.main}>
                    <Image src="/img/imageSup.svg" alt="" className={styles.imgLeft} />
                    <Form className={styles.formRegister} noValidate validated={validated} onSubmit={handleSubmit}>
                        <fieldset className={styles.fieldsetLogin}>
                            <legend className={styles.fieldsetLogin__title}>Nhập thông tin của bạn</legend>
                            <legend className={styles.fieldsetLogin__subTitle}>Bạn sẽ nhận được hỗ trợ từ nhân viên của TTO.SH qua email !</legend>
                        </fieldset>
                        <section className={styles.gap1}>
                            <section className={styles.gap2}>
                                <Form.Group className={styles.formControlRegister} controlId="validationUserName">
                                    <Form.Label htmlFor="userName" className={styles.formControlRegister__label}>
                                        Tên của bạn là gì?
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        className={styles.formControlRegister__input}
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                        Hãy nhập tên đăng nhập
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className={styles.formControlRegister} controlId="validationEmail">
                                    <Form.Label htmlFor="email" className={styles.formControlRegister__label}>
                                        Email của bạn?
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        required
                                        className={styles.formControlRegister__input}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                        Hãy nhập email hợp lệ
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className={styles.formControlRegister} controlId="validationQuest">
                                    <Form.Label htmlFor="quest" className={styles.formControlRegister__label}>
                                        Nhập câu hỏi của bạn?
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea" 
                                        rows={4}      
                                        required
                                        className={styles.formControlRegister__input__text}
                                        value={quest}
                                        onChange={(e) => setQuest(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                        Chưa nhập câu hỏi
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </section>
                            <div className={styles.note}>
                                Bằng cách nhấn gửi bạn sẽ thông thông tin của bạn đến TTO.SH.
                                Bạn sẽ nhận được các email thông báo khuyến mãi của TTO.SH
                            </div>
                            <Button type='submit' className={styles.btn__submit}>Gửi</Button>
                        </section>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default FeedBack;
