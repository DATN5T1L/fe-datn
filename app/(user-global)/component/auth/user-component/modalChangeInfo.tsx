'use client';

import React, { useEffect, useState } from 'react';
import styles from '@public/styles/user-component/ModalChangeInfo.module.css';
import { Button, Form, Image } from 'react-bootstrap';

interface ModalChangeInfoProps {
    show: boolean;
    onClose: () => void;
}

const ModalChangeInfo: React.FC<ModalChangeInfoProps> = ({ show, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false);
                document.body.style.overflow = '';
            }, 300);
            return () => {
                clearTimeout(timer);
                document.body.style.overflow = '';
            };
        }
    }, [show]);

    const [info, setInfo] = useState('Tôi lớn lên tại Tiền Giang');

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
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
                    <Form className={styles.formChangeInfo} noValidate validated={validated} onSubmit={handleSubmit}>
                        <fieldset className={styles.modalBody}>
                            <legend className={styles.modalBody__title}>Cập nhật thông tin giới thiệu</legend>
                            <legend className={styles.modalBody__subTitle}>
                                Phần giới thiệu (tiểu sử) được hiển thị tại trang cá nhân của bạn,
                                giúp mọi người hiểu rõ hơn về bạn.
                            </legend>
                        </fieldset>
                        <Form.Group className={styles.formControlChangeInfo} controlId="validationUserName">
                            <Form.Label htmlFor="userInfo" className={styles.formControlChangeInfo__label}>
                                Giới thiệu
                            </Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder='Nhập nội dung'
                                className={styles.formControlChangeInfo__input}
                                value={info}
                                onChange={(e) => setInfo(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                Hãy nhập nội dung bất kỳ
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button className={styles.closeBtn2} >Lưu lại</Button>
                    </Form>
                </section>
            )}
        </main>
    );
};

export default ModalChangeInfo;
