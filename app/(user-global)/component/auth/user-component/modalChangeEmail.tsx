'use client';

import React, { FC, useEffect, useState } from 'react';
import styles from '@public/styles/user-component/ModalChangeName.module.css';
import { Button, Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { update } from '@/redux/slices/userSlice';
import useCookie from '../../hook/useCookie';
import { useRouter } from 'next/navigation';

interface ModalChangeNameProps {
    show: boolean;
    onClose: () => void;
}

const ModalChangeEmail: React.FC<ModalChangeNameProps> = ({ show, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const userState = useSelector((state: RootState) => state.user);
    const token = useCookie('token')
    const dispatch = useDispatch()
    let errorShown = false;
    const [countdown, setCountdown] = useState(30);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [getTokenInput, setGetTokenInput] = useState(true)
    const [isCheckPass, setIsCheckPass] = useState(true);
    const [isRememberRegister, setIsRememberRegister] = useState(false);
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false);
                document.body.style.overflow = 'auto';
            }, 300);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [show]);

    const formik = useFormik({
        initialValues: {
            email: userState.user?.email || '',
            check: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Địa chỉ email không hợp lệ')
                .required('Bắt buộc nhập email')
                .transform((value) => value.trim()),
            check: Yup.string()
                .required('Vui lòng nhâp mã xác nhận'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const res = await fetch('/api/changeMail', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: values.email,
                        token: values.check
                    })
                });

                if (res.ok) {
                    alert('Bạn sẽ nhận được email xác nhận thay đổi qua Email cũ của bạn thời hạn xác thực là 5 phút');
                    onClose();
                    dispatch(update({
                        fullname: values.email
                    }))
                } if (!res.ok) {
                    console.log('lỗi: ', await res.json());
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    });

    useEffect(() => {
        if (userState.user?.email !== formik.values.email) {
            formik.setFieldValue('email', userState.user?.email || '');
        }
    }, [userState.user?.email]);

    const handleSendCode = async () => {
        setGetTokenInput(false)
        formik.setFieldTouched('email', true);
        if (!formik.values.email) {
            formik.setFieldError('email', 'Vui lòng nhập nhập email trước khi gửi mã');
            return;
        }
        if (formik.errors.email) {
            return;
        }
        try {
            const res = await fetch('/api/checkChangeMail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formik.values.email }),
            });
            console.log(formik.values.email)
            const data = await res.json()
            console.log(data);
            if (res.ok) {
                alert('Mã xác nhận đã được gửi đến email của bạn');
                setIsButtonDisabled(true);
                setCountdown(120);
            } else if (!res.ok) {
                alert(data.message)
                setIsButtonDisabled(true);
                setCountdown(120);
            }
        } catch (error) {
            console.error('Lỗi khi gửi mã xác nhận:', error);
            alert('Có lỗi xảy ra khi gửi mã xác nhận');
            formik.setFieldValue('check', '')
        }
    };

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (isButtonDisabled && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }

        if (countdown === 0) {
            setIsButtonDisabled(false);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isButtonDisabled, countdown]);

    useEffect(() => {
        setIsButtonDisabled(false);
        setCountdown(0);

    }, [formik.values.email]);

    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;


    return (
        <main className={`${styles.modalOverlay} ${show ? styles.show : styles.hide}`} onClick={onClose}>
            {isVisible && (
                <section className={`${styles.modal} ${show ? styles.show : styles.hide}`} onClick={(e) => e.stopPropagation()}>
                    <Button className={styles.closeBtn} onClick={onClose}>
                        <Image src="/img/closeBtn.svg" alt="Học lập trình cơ bản với TTO.SH" className={styles.closeBtn__img} />
                    </Button>
                    <Form className={styles.formChangeName} noValidate validated={formik.touched.email && !formik.errors.email} onSubmit={formik.handleSubmit}>
                        <fieldset className={styles.modalBody}>
                            <legend className={styles.modalBody__title}>Cập nhật email của bạn</legend>
                            <legend className={styles.modalBody__subTitle}>
                                Email sẽ được hiển thị trên trang cá nhân của bạn
                            </legend>
                        </fieldset>
                        <Form.Group className={styles.formControlChangeName} controlId="validationUserName">
                            <Form.Label className={styles.formControlChangeName__label}>
                                Email
                            </Form.Label>
                            <Form.Control
                                type="email"
                                required
                                placeholder="Nhập email"
                                className={styles.formControlChangeName__input}
                                value={formik.values.email}
                                onChange={(e) => formik.setFieldValue('email', e.target.value)}
                                onBlur={formik.handleBlur}
                                isInvalid={!!formik.errors.email && formik.touched.email}
                            />
                            <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                {formik.errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={styles.userNameRetrieve}>
                            <Form.Label htmlFor="confirm_password" className={styles.userNameRetrieve__label}>Nhập mã xác nhận từ email</Form.Label>
                            <Form.Control
                                type={'text'}
                                placeholder="Nhập mã xác nhận"
                                className={styles.userNameRetrieve__input}
                                name="check"
                                value={formik.values.check}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled={getTokenInput}
                            />
                            {formik.touched.check && formik.errors.check && (
                                <div className={styles.feedBack}>{formik.errors.check}</div>
                            )}
                            <Button
                                type='button'
                                className={styles.sendCode}
                                onClick={handleSendCode}
                                disabled={isButtonDisabled}
                            >
                                {isButtonDisabled ? `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` : 'Gửi mã'}
                            </Button>
                        </Form.Group>
                        <Button className={styles.closeBtn2} type="submit" disabled={loading}>
                            {loading ? 'Đang xử lý...' : 'Lưu lại'}
                        </Button>
                    </Form>
                </section>
            )}
        </main>
    );
};

export default ModalChangeEmail;
