'use client';
import React, { useEffect, useState } from 'react';
import styles from '@public/styles/login/Login.module.css';
import Link from 'next/link';
import { Button, Card, Container, Form, Image } from 'react-bootstrap'
import { FormikErrors, useFormik } from 'formik';
import * as Yup from 'yup';
import Body from '../component/globalControl/body';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/userSlice';
import { store } from '@/redux/store';

interface LoginFormInputs {
    email: string;
    password: string;
    general?: string;
}

type ExtendedFormikErrors = FormikErrors<LoginFormInputs> & {
    general?: string;
};

const Login: React.FC = () => {
    const [isCheckPass, setIsCheckPass] = useState(true);
    const [isRememberLogin, setIsRememberLogin] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = document.cookie.split(';').find(c => c.trim().startsWith('token='));
        const tokenValue = token?.split('=')[1];
        if (tokenValue) {
            router.push(`/info-user`)
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            general: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Bắt buộc'),
            password: Yup.string().required('Bắt buộc'),
        }),
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                const res = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: values.email, password: values.password }),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    console.error("Error response:", errorData);
                    const errorMessage = errorData.errors?.email ? errorData.errors.email[0] : 'Đăng nhập thất bại';
                    throw new Error(errorMessage);
                }

                const data = await res.json();
                console.log(data);

                const token = data.access_token;

                if (token && token.split('.').length === 3) {
                    console.log("Token:", token);
                    document.cookie = `token=${token}; path=/; max-age=${0.5 * 60}`;
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    dispatch(login(data));

                    console.log("State after login: ", store.getState().user);
                    const loginEvent = new CustomEvent('login', { detail: { token: data.access_token } });
                    window.dispatchEvent(loginEvent);

                    alert('Đăng nhập thành công');

                    if (payload.role === 'admin') {
                        router.push('/admin');
                    } else {
                        router.push('/info-user');
                    }
                } else {
                    throw new Error('Token không hợp lệ');
                }
            } catch (error) {
                if (error instanceof Error) {
                    setFieldError('general', error.message);
                } else {
                    setFieldError('general', 'Đã xảy ra lỗi không xác định');
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleCheckPass = () => {
        setIsCheckPass(!isCheckPass);
    };

    const handleRememberLogin = () => {
        setIsRememberLogin(!isRememberLogin);
    };

    return (
        <>
            <title>TTO - Đăng nhập</title>
            <meta name="description" content="Được tạo bởi Team TTO" />
            <Body>
                <Container className={styles.main}>
                    <div className={styles.main__container}>
                        <Image src="/img/pandaLogin.svg" alt="logo login" className={styles.logoLogin} />
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
                                </section>
                            </Card.Header>
                            <Card.Body className={styles.bodyLogin}>
                                <Form className={styles.form} onSubmit={formik.handleSubmit}>
                                    <fieldset className={styles.fieldsetLogin}>
                                        <legend className={styles.fieldsetLogin__line}></legend>
                                        <legend className={styles.fieldsetLogin__title}>hoặc đăng nhập với email</legend>
                                        <legend className={styles.fieldsetLogin__line}></legend>
                                    </fieldset>
                                    <section className={styles.mainLogin}>
                                        <Form.Group className={styles.userNameLogin}>
                                            <Form.Label htmlFor="email" className={styles.userNameLogin__label}>Email hoặc tên người dùng</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="email"
                                                placeholder="Tên đăng nhập hoặc email"
                                                className={styles.userNameLogin__input}
                                                autoComplete="off"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                            />
                                            {formik.touched.email && formik.errors.email ? (
                                                <div className={styles.feedBack}>{formik.errors.email}</div>
                                            ) : null}
                                        </Form.Group>
                                        <Form.Group className={styles.passLogin}>
                                            <section className={styles.checkPass}>
                                                <Form.Label htmlFor="password" className={styles.passLogin__label}>Mật khẩu</Form.Label>
                                                <Button type="button" onClick={handleCheckPass} className={styles.checkPass__btn}>
                                                    {isCheckPass ? (
                                                        <>
                                                            <Image src="/img/eyeHidden.svg" alt="" className={styles.checkPass__img} />
                                                            <div className={styles.checkPass__text}>ẩn</div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Image src="/img/eye.svg" alt="" className={styles.checkPass__img} />
                                                            <div className={styles.checkPass__text}>hiện</div>
                                                        </>
                                                    )}
                                                </Button>
                                            </section>
                                            <Form.Control
                                                type={isCheckPass ? 'password' : 'text'}
                                                name="password"
                                                placeholder="Mật khẩu"
                                                className={styles.passLogin__input}
                                                autoComplete="off"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password}
                                            />
                                            {formik.touched.password && formik.errors.password ? (
                                                <div className={styles.feedBack}>{formik.errors.password}</div>
                                            ) : null}
                                        </Form.Group>
                                        <Form.Group className={styles.taskLogin}>
                                            <Button
                                                type="button"
                                                className={styles.rememberLogin}
                                                onClick={handleRememberLogin}
                                            >
                                                {isRememberLogin ? (
                                                    <Image src="/img/checkBoxFalse.svg" alt="" className={styles.rememberLogin__img} />
                                                ) : (
                                                    <Image src="/img/checkBoxTrue.svg" alt="" className={styles.rememberLogin__img} />
                                                )}
                                                <div className={styles.rememberLogin__div}>Ghi nhớ đăng nhập</div>
                                            </Button>
                                            <Link href={'/retrievePassword'} className={styles.forgetPass}>Quên mật khẩu</Link>
                                        </Form.Group>
                                    </section>
                                    {formik.errors.general && <div className={styles.feedBack}>{formik.errors.general}</div>}
                                    <Button type="submit" className={styles.btnSubmit} disabled={formik.isSubmitting}>
                                        Đăng nhập
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
            </Body>
        </>
    );
};

export default Login;
