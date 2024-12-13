'use client';

import React, { FC, useEffect, useState } from 'react';
import styles from '@public/styles/user-component/ModalChangePhone.module.css';
import { Button, Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { update } from '@/redux/slices/userSlice';
import { useRouter } from 'next/navigation';

interface ModalChangePhoneProps {
    show: boolean;
    onClose: () => void;
}

const ModalChangePhone: React.FC<ModalChangePhoneProps> = ({ show, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const userState = useSelector((state: RootState) => state.user);
    const token = localStorage.getItem('token');
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
            phoneNumber: userState.user?.phonenumber || '',
            check: '',
        },
        validationSchema: Yup.object({
            phoneNumber: Yup.string()
                .required('Bắt buộc nhập số điện thoại')
                .test(
                    'isValidVietnamPhoneNumber',
                    'Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại hợp lệ của Việt Nam.',
                    (value) => {
                        if (!value) return true;
                        const regexVNPhone = /^(84\d{9}|0\d{9})$/;
                        return regexVNPhone.test(value);
                    }
                )
                .transform((value) => value.trim())
                .matches(/^\d+$/, 'Chỉ cho phép chữ số.'),
            check: Yup.string()
                .required('Vui lòng nhập mã xác nhận từ số điện thoại'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const res = await fetch('/api/changePhone/', {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ phonenumber: values.phoneNumber })
                });

                if (res.ok) {
                    alert('Thay đổi thông tin thành công');
                    onClose();
                    dispatch(update({
                        phonenumber: values.phoneNumber
                    }))
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    });

    useEffect(() => {
        if (userState.user?.phonenumber !== formik.values.phoneNumber) {
            formik.setFieldValue('phoneNumber', userState.user?.phonenumber || '');
        }
    }, [userState.user?.phonenumber]);

    const handleSendCode = async () => {
        setGetTokenInput(false)
        formik.setFieldTouched('phonenumber', true);

        if (!formik.values.phoneNumber) {
            formik.setFieldError('phonenumber', 'Vui lòng nhập số điện thoại trước khi gửi mã');
            return;
        }

        if (formik.errors.phoneNumber) {
            return;
        }

        try {
            const res = await fetch('/api/verifyPhone', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formik.values.phoneNumber }),
            });

            const data = await res.json()
            console.log(data);


            if (res.ok) {
                alert('Mã xác nhận đã được gửi đến số điện thoại của bạn');
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

    }, [formik.values.phoneNumber]);

    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;

    return (
        <main className={`${styles.modalOverlay} ${show ? styles.show : styles.hide}`} onClick={onClose}>
            {isVisible && (
                <section className={`${styles.modal} ${show ? styles.show : styles.hide}`} onClick={(e) => e.stopPropagation()}>
                    <Button className={styles.closeBtn} onClick={onClose}>
                        <Image src="/img/closeBtn.svg" alt="Frontend Development tto.shsh" className={styles.closeBtn__img} />
                    </Button>
                    <Form className={styles.formChangeName} noValidate validated={formik.touched.phoneNumber && !formik.errors.phoneNumber} onSubmit={formik.handleSubmit}>
                        <fieldset className={styles.modalBody}>
                            <legend className={styles.modalBody__title}>Cập nhật số điện thoại của bạn</legend>
                            <legend className={styles.modalBody__subTitle}>
                                Số điện thoại sẽ được sử dụng cho các xác thực liên quan.
                            </legend>
                        </fieldset>
                        <Form.Group className={styles.formControlChangeName} controlId="validationPhoneNumber">
                            <Form.Label className={styles.formControlChangeName__label}>
                                Số điện thoại
                            </Form.Label>
                            <Form.Control
                                type="tel"
                                required
                                placeholder="Nhập số điện thoại"
                                className={styles.formControlChangeName__input}
                                value={formik.values.phoneNumber}
                                onChange={(e) => formik.setFieldValue('phoneNumber', e.target.value)}
                                onBlur={formik.handleBlur}
                                isInvalid={!!formik.errors.phoneNumber && formik.touched.phoneNumber}
                            />
                            <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                {formik.errors.phoneNumber}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={styles.userNameRetrieve}>
                            <Form.Label htmlFor="confirm_password" className={styles.userNameRetrieve__label}>Nhập mã xác nhận từ số điện thoại</Form.Label>
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

export default ModalChangePhone;
