'use client';

import React, { FC, useEffect, useState } from 'react';
import styles from '@public/styles/user-component/ModalChangeImg.module.css';
import { Button, Form, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const ModalChangeImg: React.FC<ModalChangeImgProps> = ({ show, onClose }) => {
    const userState = useSelector((state: RootState) => state.user);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const token = localStorage.getItem('token');

    // Validation schema với Yup
    const validationSchema = Yup.object({

    });

    // Reset trạng thái khi đóng modal
    useEffect(() => {
        if (show) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false);
                setSelectedFile(null);
                document.body.style.overflow = 'auto';
            }, 300);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [show]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(URL.createObjectURL(file));
            setFieldValue('img', file);
        }
    };

    const handleSubmit = (values: { img: string }) => {
        if (!values.img) {
            alert('giữ bạn ko chọn ảnh mới sẽ giữ lại ảnh cũ')
        } else {
            try {
                const res = fetch('', {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
            } catch (error) {

            }
            console.log('Ảnh đã được cập nhật', values.img);
        }
        setIsVisible(false)
        onClose()
    };

    return (
        <main className={`${styles.modalOverlay} ${show ? styles.show : styles.hide}`} onClick={onClose}>
            {isVisible && (
                <section className={`${styles.modal} ${show ? styles.show : styles.hide}`} onClick={(e) => e.stopPropagation()}>
                    <Button className={styles.closeBtn} onClick={onClose}>
                        <Image src="/img/closeBtn.svg" alt="" className={styles.closeBtn__img} />
                    </Button>
                    <Formik
                        initialValues={{ img: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue }) => (
                            <FormikForm className={styles.formChangeImg} noValidate>
                                <fieldset className={styles.modalBody}>
                                    <legend className={styles.modalBody__title}>Thay đổi ảnh đại diện</legend>
                                    <legend className={styles.modalBody__subTitle}>
                                        Ảnh đại diện giúp giảng viên và người dùng dễ nhận biết bạn qua các tin nhắn và câu hỏi
                                    </legend>
                                </fieldset>
                                <Form.Group className={styles.formControlChangeImg} controlId="img">
                                    <Form.Label className={styles.formControlChangeImg__label}>
                                        Ảnh đại diện
                                    </Form.Label>
                                    <input
                                        id="img"
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => handleFileChange(event, setFieldValue)}
                                        className={styles.hiddenInput}
                                    />
                                    <ErrorMessage name="img" component="div" className={styles.feedBack} />
                                    <section className={styles.inputGroup}>
                                        <section
                                            className={styles.uploadButtonContainer}
                                            onClick={() => document.getElementById('img')?.click()}
                                        >
                                            <Image src="/img/upload.svg" alt="" className={styles.iconContainer} />
                                            <p className={styles.uploadButton__title}>Tải ảnh lên</p>
                                        </section>
                                        <Image
                                            src={selectedFile || userState.user?.avatar || "/img/avtDefault.jpg"}
                                            alt="Avatar"
                                            className={styles.img__index}
                                        />
                                    </section>
                                </Form.Group>
                                <Button className={styles.closeBtn2} type="submit">
                                    Lưu lại
                                </Button>
                            </FormikForm>
                        )}
                    </Formik>
                </section>
            )}
        </main>
    );
};

export default ModalChangeImg;
