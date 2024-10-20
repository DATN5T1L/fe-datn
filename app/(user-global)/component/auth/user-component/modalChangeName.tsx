'use client';

import React, { FC, useEffect, useState } from 'react';
import styles from '@public/styles/user-component/ModalChangeName.module.css';
import { Button, Form, Image } from 'react-bootstrap';

interface ModalChangeNameProps {
    show: boolean;
    onClose: () => void;
}

const ModalChangeName: React.FC<ModalChangeNameProps> = ({ show, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [value, setValue] = useState('Con Văn Người');
    const [validated, setValidated] = useState(false);


    useEffect(() => {
        if (show) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false);
                setValidated(false);
            }, 300);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [show]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {

            console.log('Tên người dùng đã được cập nhật:', value);
        }

        setValidated(true);
    };

    return (
        <main className={`${styles.modalOverlay} ${show ? styles.show : styles.hide}`} onClick={onClose}>
            {isVisible && (
                <section className={`${styles.modal} ${show ? styles.show : styles.hide}`} onClick={(e) => e.stopPropagation()}>
                    <Button className={styles.closeBtn} onClick={onClose}>
                        <Image src="/img/closeBtn.svg" alt="" className={styles.closeBtn__img} />
                    </Button>
                    <Form className={styles.formChangeName} noValidate validated={validated} onSubmit={handleSubmit}>
                        <fieldset className={styles.modalBody}>
                            <legend className={styles.modalBody__title}>Cập nhật tên của bạn</legend>
                            <legend className={styles.modalBody__subTitle}>
                                Tên sẽ được hiển thị trên trang cá nhân,
                                trong các bình luận và bài viết của bạn.
                            </legend>
                        </fieldset>
                        <Form.Group className={styles.formControlChangeName} controlId="validationUserName">
                            <Form.Label htmlFor="userName" className={styles.formControlChangeName__label}>
                                Họ và tên
                            </Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder="Nhập họ và tên"
                                className={styles.formControlChangeName__input}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                Hãy nhập họ và tên
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button className={styles.closeBtn2} type="submit">
                            Lưu lại
                        </Button>
                    </Form>
                </section>
            )}
        </main>
    );
};

export default ModalChangeName;
