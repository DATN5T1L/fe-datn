'use client'
import React, { useState } from 'react';
import styles from '@public/styles/login/Login.module.css'
import Link from 'next/link';
import { Button, Card, Container, Form, Image } from 'react-bootstrap';
import Body from '../component/globalControl/body';

const Login: React.FC = () => {
    const [isCheckPass, setIsCheckPass] = useState(true);
    const [isRememberLogin, setIsRememberLogin] = useState(false);
    const [validated, setValidated] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleCheckPass = () => {
        setIsCheckPass(!isCheckPass);
    };

    const handleRememberLogin = () => {
        setIsRememberLogin(!isRememberLogin);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <>
            <title>TTO - Đăng nhập</title>
            <meta name="description" content="Được tạo bởi Taem TTO" />
            <Body>
                <Container className={styles.main}>
                    <div className={styles.main__container}>
                        <Card className={styles.cardContainer}>
                            <Card.Header className={styles.headerLogin}>
                                <section className={styles.titleGroup}>
                                    <h1 className={styles.titleGroup__h1}>Đăng nhập</h1>
                                    <Link href={'/register'} className={styles.titleGroup__link}>Bạn chưa có tài khoản? <bdi className={styles.titleGroup__link__bdi}> Đăng ký</bdi></Link>
                                </section>
                                <section className={styles.loginMedia}>
                                    <Button className={styles.loginMedia__btn}>
                                        <Image src="/img/fb.svg" alt="" className={styles.loginMedia__img} />
                                        <div className={styles.loginMedia__title}>
                                            Facebook
                                        </div>
                                    </Button>
                                    <Button className={styles.loginMedia__btn}>
                                        <Image src="/img/google.svg" alt="" className={styles.loginMedia__img} />
                                        <div className={styles.loginMedia__title}>
                                            Google
                                        </div>
                                    </Button>
                                    <Button className={styles.loginMedia__btn}>
                                        <Image src="/img/apple.svg" alt="" className={styles.loginMedia__img} />
                                        <div className={styles.loginMedia__title}>
                                            Apple
                                        </div>
                                    </Button>
                                </section>
                            </Card.Header>
                            <Card.Body className={styles.bodyLogin}>
                                <Form className={styles.form} noValidate validated={validated} onSubmit={handleSubmit}>
                                    <fieldset className={styles.fieldsetLogin}>
                                        <legend className={styles.fieldsetLogin__line}></legend>
                                        <legend className={styles.fieldsetLogin__title}>hoặc đăng nhập với email</legend>
                                        <legend className={styles.fieldsetLogin__line}></legend>
                                    </fieldset>
                                    <section className={styles.mainLogin}>
                                        <Form.Group className={styles.userNameLogin} controlId="validationUserName">
                                            <Form.Label htmlFor="userName" className={styles.userNameLogin__label}>
                                                Email hoặc tên người dùng
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                required
                                                placeholder="Tên đăng nhập hoặc email"
                                                className={styles.userNameLogin__input}
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                                Hãy nhập tên đăng nhập hoặc email
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className={styles.passLogin} controlId="validationPassword">
                                            <section className={styles.checkPass}>
                                                <Form.Label htmlFor="password" className={styles.passLogin__label}>Mật khẩu</Form.Label>
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
                                                className={styles.passLogin__input}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                                Hãy nhập mật khẩu
                                            </Form.Control.Feedback>
                                        </Form.Group >
                                        <Form.Group className={styles.taskLogin}>
                                            <Button
                                                type='button'
                                                className={styles.rememberLogin}
                                                onClick={handleRememberLogin}
                                            >
                                                {isRememberLogin ? (
                                                    <>
                                                        <Image src="/img/checkBoxFalse.svg" alt="" className={styles.rememberLogin__img} />
                                                    </>
                                                ) :
                                                    (
                                                        <>
                                                            <Image src="/img/checkBoxTrue.svg" alt="" className={styles.rememberLogin__img} />
                                                        </>
                                                    )}
                                                <div className={styles.rememberLogin__div}>Ghi nhớ đăng nhập</div>
                                            </Button>
                                            <Link href={'/retrievePassword'} className={styles.forgetPass}>
                                                Quên mật khẩu
                                            </Link>
                                        </Form.Group>
                                    </section>
                                    <Button type='submit' className={styles.btnSubmit}>Đăng nhập</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
            </Body>
        </>
    )
}

export default Login;
