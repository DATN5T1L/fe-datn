'use client'
import React, { useState } from 'react';
import styles from '@public/styles/register/Register.module.css'
import Link from 'next/link';
import { Button, Card, Container, Form, Image } from 'react-bootstrap';
import Body from '../component/globalControl/body';

const Register: React.FC = () => {
    const [isCheckPass, setIsCheckPass] = useState(true);
    const [isRememberRegister, setIsRememberRegister] = useState(false);
    const [validated, setValidated] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleCheckPass = () => {
        setIsCheckPass(!isCheckPass);
    }

    const handleRememberRegister = () => {
        setIsRememberRegister(!isRememberRegister);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false || password !== confirmPassword) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    }

    return (
        <>
            <title>TTO - Đăng ký</title>
            <meta name="description" content="Được tạo bởi Taem TTO" />
            <Body>
                <Container className={styles.main}>
                    <div className={styles.main__container}>
                        <Card className={styles.form}>
                            <Card.Header className={styles.headerRegister}>
                                <Card.Title className={styles.headerRegister__title}>Đăng ký tài khoản</Card.Title>
                                <Link href={'/login'} className={styles.linkLogin}>Bạn đã có tài khoản? <bdi className={styles.link__bdi}> Đăng nhập</bdi></Link>
                            </Card.Header>
                            <Card.Body className={styles.bodyRegister}>
                                <Form className={styles.formRegister} noValidate validated={validated} onSubmit={handleSubmit}>
                                    <section className={styles.validateRegister}>
                                        <Form.Group className={styles.formControlRegister} controlId="validationUserName">
                                            <Form.Label htmlFor="userName" className={styles.formControlRegister__label}>
                                                Tên của bạn là gì?
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                required
                                                placeholder="Họ và tên"
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
                                                placeholder="Email"
                                                className={styles.formControlRegister__input}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                                Hãy nhập email hợp lệ
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className={styles.formControlRegister} controlId="validationPassword">
                                            <section className={styles.checkPass}>
                                                <Form.Label htmlFor="password" className={styles.formControlRegister__label}>Mật khẩu</Form.Label>
                                                <Button
                                                    type='button'
                                                    onClick={handleCheckPass}
                                                    className={styles.checkPass__btn}
                                                >
                                                    {isCheckPass ?
                                                        (
                                                            <>
                                                                <Image src="/img/eyeHidden.svg" alt="" className={styles.checkPass__img} />
                                                                <div className={styles.checkPass__text}>ẩn</div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Image src="/img/eye.svg" alt="" className={styles.checkPass__img} />
                                                                <div className={styles.checkPass__text}>hiện</div>
                                                            </>
                                                        )
                                                    }
                                                </Button>
                                            </section>
                                            <Form.Control
                                                type={isCheckPass ? 'password' : 'text'}
                                                required
                                                placeholder="Mật khẩu"
                                                className={styles.formControlRegister__input}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <div className={styles.noteRegister}>
                                                Sử dụng 8 ký tự trở lên kết hợp chữ cái, số và ký hiệu
                                            </div>
                                            <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                                Hãy nhập mật khẩu
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className={styles.formControlRegister} controlId="validationConfirmPassword">
                                            <Form.Label htmlFor="confirmPassword" className={styles.formControlRegister__label}>Nhập lại mật khẩu</Form.Label>
                                            <Form.Control
                                                type={isCheckPass ? 'password' : 'text'}
                                                required
                                                placeholder="Nhập lại mật khẩu"
                                                className={styles.formControlRegister__input}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                isInvalid={password !== confirmPassword}
                                            />
                                            <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                                {password !== confirmPassword ? 'Mật khẩu không khớp' : 'Hãy nhập mật khẩu lần nữa'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </section>
                                    <Button
                                        type='button'
                                        className={styles.rememberRegister}
                                        onClick={handleRememberRegister}
                                    >
                                        {isRememberRegister ? (
                                            <>
                                                <Image src="/img/checkBoxFalse.svg" alt="" className={styles.rememberRegister__img} />
                                            </>
                                        ) :
                                            (
                                                <>
                                                    <Image src="/img/checkBoxTrue.svg" alt="" className={styles.rememberRegister__img} />
                                                </>
                                            )}
                                        <div className={styles.rememberRegister__div}>Bằng cách tạo tài khoản, bạn đồng ý với Điều khoản sử dụng và Chính sách quyền riêng tư.</div>
                                    </Button>
                                    <Button type='submit' className={styles.btnSubmit}>Đăng ký</Button>
                                </Form>
                            </Card.Body>
                            <Card.Footer className={styles.withRegister}>
                                <Card.Subtitle className={styles.headWithRegister}>
                                    Tiếp tục với
                                </Card.Subtitle>
                                <section className={styles.RegisterMedia}>
                                    <Button className={styles.RegisterMedia__btn}>
                                        <Image src="/img/fb.svg" alt="" className={styles.RegisterMedia__img} />
                                        <div className={styles.RegisterMedia__title}>
                                            Facebook
                                        </div>
                                    </Button>
                                    <Button className={styles.RegisterMedia__btn}>
                                        <Image src="/img/google.svg" alt="" className={styles.RegisterMedia__img} />
                                        <div className={styles.RegisterMedia__title}>
                                            Google
                                        </div>
                                    </Button>
                                    <Button className={styles.RegisterMedia__btn}>
                                        <Image src="/img/apple.svg" alt="" className={styles.RegisterMedia__img} />
                                        <div className={styles.RegisterMedia__title}>
                                            Apple
                                        </div>
                                    </Button>
                                </section>
                            </Card.Footer>
                        </Card>
                    </div>
                </Container>
            </Body>
        </>
    )
}

export default Register;
