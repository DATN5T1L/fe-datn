'use client';

import React, { FC, useEffect, useState } from 'react';
import styles from '@public/styles/user-component/ModalChangeImg.module.css';
import { Button, Form, Image } from 'react-bootstrap';

interface ModalChangeImgProps {
    show: boolean;
    onClose: () => void;
}

const ModalChangeImg: React.FC<ModalChangeImgProps> = ({ show, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 300);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [show]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <main className={`${styles.modalOverlay} ${show ? styles.show : styles.hide}`} onClick={onClose}>
            {isVisible && (
                <section className={`${styles.modal} ${show ? styles.show : styles.hide}`} onClick={(e) => e.stopPropagation()}>
                    <Button className={styles.closeBtn} onClick={onClose}>
                        <Image src="/img/closeBtn.svg" alt="" className={styles.closeBtn__img} />
                    </Button>
                    <Form className={styles.formChangeImg} noValidate onSubmit={handleSubmit}>
                        <fieldset className={styles.modalBody}>
                            <legend className={styles.modalBody__title}>Thay đổi ảnh đại diện</legend>
                            <legend className={styles.modalBody__subTitle}>
                                Ảnh đại diện giúp giảng viên và người dùng dễ nhận biết bạn qua các tin nhắn và câu hỏi
                            </legend>
                        </fieldset>
                        <Form.Group className={styles.formControlChangeImg} controlId="img">
                            <Form.Label htmlFor="img" className={styles.formControlChangeImg__label}>
                                Ảnh đại diện
                            </Form.Label>
                            <Form.Control
                                id="img"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className={styles.hiddenInput}
                                required
                            />
                            <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                Hãy chọn ảnh
                            </Form.Control.Feedback>
                            <section className={styles.inputGroup}>
                                <section
                                    className={styles.uploadButtonContainer}
                                    onClick={() => document.getElementById('img')?.click()}
                                >
                                    <Image src="/img/upload.svg" alt="" className={styles.iconContainer} />
                                    <p className={styles.uploadButton__title}>Tải ảnh lên</p>
                                </section>
                                <Image
                                    src={selectedFile ? selectedFile : '/img/avtDefault.jpg'}
                                    alt="Avatar"
                                    className={styles.img__index}
                                />
                            </section>
                        </Form.Group>
                        <Button className={styles.closeBtn2}>Lưu lại</Button>
                    </Form>
                </section>
            )}
        </main>
    );
};

export default ModalChangeImg;
