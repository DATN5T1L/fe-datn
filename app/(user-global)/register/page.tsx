'use client'
import React, { useState } from 'react';
import styles from '@public/styles/register/Register.module.css';
import Link from 'next/link';
import { Button, Card, Container, Form, Image } from 'react-bootstrap';
import Body from '../component/globalControl/body';
import { useForm } from 'react-hook-form';
import FbLogin from '../component/auth/user-component/fbLogin';
import GgLogin from '../component/auth/user-component/ggLogin';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useRouter } from 'next/navigation';

interface RegisterFormData {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>();
    const [isCheckPass, setIsCheckPass] = useState(true);
    const [isRememberRegister, setIsRememberRegister] = useState(false);
    const router = useRouter()
    let errorShown = false;

    const password = watch("password");

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirm_password: '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .transform(value => value
                    ? value.replace(/\b\w/g, (char: string) => char.toUpperCase())
                    : ''
                )
                .required('Vui lòng nhập họ và tên')
                .min(2, "Họ và tên phải có it nhất 2 ký tự"),
            email: Yup.string()
                .email('Email không hợp lệ')
                .required('Vui lòng nhập email'),
            password: Yup.string()
                .transform(value => value.replace(/\s+/g, ''))
                .required('Vui lòng nhập mật khẩu')
                .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
                .max(12, 'Mật khẩu tối đa là 12 ký tự')
                .matches(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 ký tự viết hoa')
                .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt'),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('password'), undefined], 'Mật khẩu không khớp')
                .required('Vui lòng nhập lại mật khẩu'),
        }),
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            if (errorShown) return;
            try {
                const res = await fetch('/api/newUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullname: values.fullName,
                        email: values.email,
                        password: values.password,
                        confirm_password: values.confirm_password
                    }),
                });
                if (!res.ok) {
                    const errorData = await res.json();
                    if (res.status == 422) {
                        if (!errorShown) {
                            alert('mail đã tồn tại');
                            errorShown = true;
                        }
                    } else {
                        throw new Error(errorData.message || 'Đăng ký thất bại');
                    }
                } else {
                    alert('Đăng ký thành công');
                    errorShown = false;
                    router.push('/login');
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
        }
    })


    const handleCheckPass = () => {
        setIsCheckPass(!isCheckPass);
    };

    const handleRememberRegister = () => {
        setIsRememberRegister(!isRememberRegister);
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
                                <Link href={'/login'} className={styles.linkLogin}>Bạn đã có tài khoản? <bdi className={styles.link__bdi}> Đăng nhập</bdi></Link>
                            </Card.Header>
                            <Card.Body className={styles.bodyRegister}>
                                <Form className={styles.formRegister} onSubmit={formik.handleSubmit}>
                                    <section className={styles.validateRegister}>
                                        <Form.Group className={styles.formControlRegister}>
                                            <Form.Label htmlFor="fullName" className={styles.formControlRegister__label}>
                                                Tên của bạn là gì?
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Họ và tên"
                                                className={styles.formControlRegister__input}
                                                name="fullName"
                                                value={formik.values.fullName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.fullName && formik.errors.fullName ? (
                                                <div className={styles.feedBack}>{formik.errors.fullName}</div>
                                            ) : null}
                                        </Form.Group>
                                        <Form.Group className={styles.formControlRegister}>
                                            <Form.Label htmlFor="email" className={styles.formControlRegister__label}>
                                                Email của bạn?
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Email"
                                                className={styles.formControlRegister__input}
                                                name="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.email && formik.errors.email ? (
                                                <div className={styles.feedBack}>{formik.errors.email}</div>
                                            ) : null}
                                        </Form.Group>
                                        <Form.Group className={styles.formControlRegister}>
                                            <section className={styles.checkPass}>
                                                <Form.Label htmlFor="password" className={styles.formControlRegister__label}>Mật khẩu</Form.Label>
                                                <Button
                                                    type='button'
                                                    onClick={handleCheckPass}
                                                    className={styles.checkPass__btn}
                                                >
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
                                                placeholder="Mật khẩu"
                                                className={styles.formControlRegister__input}
                                                name="password"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                autoComplete="new-password"
                                            />
                                            <div className={styles.noteRegister}>
                                                Sử dụng 8 ký tự trở lên kết hợp chữ cái, số và ký hiệu
                                            </div>
                                            {formik.touched.password && formik.errors.password ? (
                                                <div className={styles.feedBack}>{formik.errors.password}</div>
                                            ) : null}
                                        </Form.Group>
                                        <Form.Group className={styles.formControlRegister}>
                                            <Form.Label htmlFor="confirm_password" className={styles.formControlRegister__label}>Nhập lại mật khẩu</Form.Label>
                                            <Form.Control
                                                type={isCheckPass ? 'password' : 'text'}
                                                placeholder="Nhập lại mật khẩu"
                                                className={styles.formControlRegister__input}
                                                name="confirm_password"
                                                value={formik.values.confirm_password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.confirm_password && formik.errors.confirm_password ? (
                                                <div className={styles.feedBack}>{formik.errors.confirm_password}</div>
                                            ) : null}
                                        </Form.Group>
                                    </section>
                                    <Button
                                        type='button'
                                        className={styles.rememberRegister}
                                        onClick={handleRememberRegister}
                                    >
                                        {isRememberRegister ? (
                                            <Image src="/img/checkBoxFalse.svg" alt="" className={styles.rememberRegister__img} />
                                        ) : (
                                            <Image src="/img/checkBoxTrue.svg" alt="" className={styles.rememberRegister__img} />
                                        )}
                                        <div className={styles.rememberRegister__div}>Bằng cách tạo tài khoản, bạn đồng ý với Điều khoản sử dụng và Chính sách quyền riêng tư.</div>
                                    </Button>
                                    <Button type='submit' className={styles.btnSubmit} disabled={formik.isSubmitting}>Đăng ký</Button>
                                </Form>
                            </Card.Body>
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
            </Body >
        </>
    );
};

export default Register;
