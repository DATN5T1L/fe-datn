'use client'

import styles from '@public/styles/retrievePassword/RetrievePassword.module.css'
import Link from 'next/link'
import { useState } from 'react';
import { Button, Card, Container, Form, Image } from 'react-bootstrap'

const RetrievePassword: React.FC = () => {
    const [validated, setValidated] = useState(false);
    const [userName, setUserName] = useState('');
    const [check, setCheck] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
    }
    return (
        <>
            <title>TTO - Quên mật khẩu</title>
            <meta name="description" content="Được tạo bởi Taem TTO" />
            <Container className={styles.main}>
                <div className={styles.main__container}>
                    <Form className={styles.formRetrieve} noValidate validated={validated} onSubmit={handleSubmit}>
                        <fieldset className={styles.headerRetrieve}>
                            <legend className={styles.headerRetrieve__title}>Quên mật khẩu</legend>
                            <legend className={styles.headerRetrieve__subTitle}>Nhập email hoặc username của bạn và chúng tôi sẽ gửi cho bạn mã khôi phục mật khẩu.</legend>
                        </fieldset>
                        <section className={styles.validateRetrieve}>
                            <Form.Group className={styles.userNameRetrieve} controlId="validationUserName">
                                <Form.Label htmlFor="userName" className={styles.userNameRetrieve__label}>
                                    Email hoặc tên người dùng
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    placeholder="Tên đăng nhập hoặc email"
                                    className={styles.userNameRetrieve__input}
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                    Hãy nhập tên đăng nhập hoặc email
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className={styles.userNameRetrieve} controlId="validationUserName">
                                <Form.Label htmlFor="userName" className={styles.userNameRetrieve__label}>
                                    Nhập mã xác nhận
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    placeholder="Mã xác nhận"
                                    className={styles.userNameRetrieve__input}
                                    value={check}
                                    onChange={(e) => setCheck(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                    Hãy nhập mã xác nhận
                                </Form.Control.Feedback>
                                <Button type="button" className={styles.sendCode}>Gửi mã</Button>
                            </Form.Group>
                        </section>
                        <Button type='submit' className={styles.btnSubmit}>Xác nhận</Button>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default RetrievePassword