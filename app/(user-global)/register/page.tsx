'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from '@public/styles/register/Register.module.css';
import { Button, Card, Container, Form, Image } from 'react-bootstrap';
import Body from '../component/globalControl/body';
import RegisterEmail from '../component/auth/user-component/sign-up-email';
import Link from 'next/link';
import FbLogin from '../component/auth/user-component/fbLogin';
import GgLogin from '../component/auth/user-component/ggLogin';
import RegisterPhone from '../component/auth/user-component/sign-up-phone';
import { usePathname } from 'next/navigation';

interface RegisterFormData {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    token: number | string;
    role: string;
}

const Register: React.FC = () => {
    const [checkRegister, setCheckRegister] = useState(false);

    useLayoutEffect(() => {
        const savedRegister = localStorage.getItem('register');
        if (savedRegister === 'phone') {
            setCheckRegister(true);
        } else {
            setCheckRegister(false);
        }
    }, []);

    const handleChangeRegister = (check: boolean) => {
        const newCheckRegister = check;
        setCheckRegister(check);
        localStorage.setItem('register', newCheckRegister ? 'phone' : 'email');
    };
    return (
        <>
            <title>TTO - Đăng ký</title>
            <meta name="description" content="Được tạo bởi Taem TTO" />
            <Body>
                <Container className={styles.main}>
                    <div className={styles.main__container}>
                        <Image src="/img/pandaRegister.svg" alt="logo register" className={styles.logoRegister} />
                        <Card className={styles.form}>
                            <Card.Header className={styles.headerRegister}>
                                <Card.Title className={styles.headerRegister__title}>Đăng ký tài khoản</Card.Title>
                                <Link href="/login" className={styles.linkLogin}>Bạn đã có tài khoản? <bdi className={styles.link__bdi1}> Đăng nhập</bdi></Link>
                                <div className={styles.link__group}>
                                    <div className={styles.linkLogin} onClick={() => handleChangeRegister(false)}>
                                        <div className={`${styles.link__bdi} ${checkRegister ? '' : styles.active_1}`}>
                                            Đăng ký bằng email
                                        </div>
                                    </div>
                                    <div className={styles.linkLogin} onClick={() => handleChangeRegister(true)}>
                                        <div className={`${styles.link__bdi} ${checkRegister ? styles.active_1 : ''}`}>
                                            Đăng ký bằng số điện thoại
                                        </div>
                                    </div>
                                </div>
                            </Card.Header>
                            <div>
                                <div className={`${styles.check__form} ${checkRegister ? styles.check__form1 : ''}`}>
                                    {checkRegister && <RegisterPhone />}
                                </div>
                                <div className={`${styles.check__form2} ${!checkRegister ? styles.check__form3 : ''}`}>
                                    {!checkRegister && <RegisterEmail />}
                                </div>
                            </div>
                            <Card.Footer className={styles.withRegister}>
                                <Card.Subtitle className={styles.headWithRegister}>
                                    Tiếp tục với
                                </Card.Subtitle>
                                <section className={styles.RegisterMedia}>
                                    <FbLogin />
                                    <GgLogin />
                                </section>
                            </Card.Footer>
                        </Card>
                    </div>
                </Container>
            </Body>
        </>
    );
};

export default Register;
