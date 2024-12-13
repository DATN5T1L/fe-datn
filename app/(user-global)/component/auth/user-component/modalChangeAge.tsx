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


const ModalChangeAge: React.FC<ModalChangeNameProps> = ({ show, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const userState = useSelector((state: RootState) => state.user);
    const token = useCookie('token')
    const dispatch = useDispatch()

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
            age: userState.user?.age || 0,
        },
        validationSchema: Yup.object({
            age: Yup.number()
                .required('Bắt buộc nhập tuổi')
                .typeError('Tuổi phải là một số')
                .min(1, 'Tuổi phải lớn hơn hoặc bằng 1')
                .max(150, 'Tuổi phải nhỏ hơn hoặc bằng 150'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const res = await fetch('/api/changeAge/', { // Đổi endpoint phù hợp
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ age: values.age }), // Gửi giá trị tuổi
                });

                if (res.ok) {
                    alert('Cập nhật tuổi thành công');
                    onClose();
                    dispatch(
                        update({
                            age: values.age, // Cập nhật giá trị tuổi trong state
                        })
                    );
                } else {
                    console.log('Lỗi: ', await res.json());
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        },
    });


    useEffect(() => {
        if (userState.user?.age !== formik.values.age) {
            formik.setFieldValue('age', userState.user?.fullname || '');
        }
    }, [userState.user?.fullname]);

    return (
        <main className={`${styles.modalOverlay} ${show ? styles.show : styles.hide}`} onClick={onClose}>
            {isVisible && (
                <section className={`${styles.modal} ${show ? styles.show : styles.hide}`} onClick={(e) => e.stopPropagation()}>
                    <Button className={styles.closeBtn} onClick={onClose}>
                        <Image src="/img/closeBtn.svg" alt="HTML5 và CSS3 TTO.sh" className={styles.closeBtn__img} />
                    </Button>
                    <Form className={styles.formChangeName} noValidate validated={formik.touched.age && !formik.errors.age} onSubmit={formik.handleSubmit}>
                        <fieldset className={styles.modalBody}>
                            <legend className={styles.modalBody__title}>Cập nhật tuổi của bạn</legend>
                            <legend className={styles.modalBody__subTitle}>
                                Tuổi sẽ được hiển thị trên trang cá nhân
                            </legend>
                        </fieldset>
                        <Form.Group className={styles.formControlChangeName} controlId="validationUserName">
                            <Form.Label className={styles.formControlChangeName__label}>
                                Họ và tên
                            </Form.Label>
                            <Form.Control
                                type="number"
                                required
                                placeholder="Nhập tuổi của bạn"
                                className={styles.formControlChangeName__input}
                                value={formik.values.age}
                                onChange={(e) => formik.setFieldValue('age', e.target.value)}
                                onBlur={formik.handleBlur}
                                isInvalid={!!formik.errors.age && formik.touched.age}
                            />
                            <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                {formik.errors.age}
                            </Form.Control.Feedback>
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

export default ModalChangeAge;
