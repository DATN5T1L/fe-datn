'use client';

import React, { FC, useEffect, useState } from 'react';
import styles from '@public/styles/user-component/ModalChangePass.module.css';
import { Button, Form, Image } from 'react-bootstrap';
import Link from 'next/link';

interface ModalChangePassProps {
    show: boolean;
    onClose: () => void;
}

const ModalChangePass: React.FC<ModalChangePassProps> = ({ show, onClose }) => {
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

    const [passNow, setPassNow] = useState('');
    const [passNew, setPassNew] = useState('');
    const [againPassNew, setAgainPassNew] = useState('');
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
                        <Image src="/img/closeBtn.svg" alt="" className={styles.closeBtn__img}/>
                    </Button>
                    <Form className={styles.formChangePass} noValidate validated={validated} onSubmit={handleSubmit}>
                        <fieldset className={styles.modalBody}>
                            <legend className={styles.modalBody__title}>Thay đổi mật khẩu</legend>
                            <legend className={styles.modalBody__subTitle}>
                                Mật khẩu của bạn phải có tối thiểu 8 ký tự, bao gồm cả chữ số,
                                chữ cái và ký tự đặc biệt (!$@%...).
                            </legend>
                        </fieldset>
                        <Form.Group className={styles.formControlChangePass} controlId="validationUserName">
                            <Form.Label htmlFor="userName" className={styles.formControlChangePass__label}>
                                Nhập mật khẩu hiện tại
                            </Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder='Nhập mật khẩu hiện tại'
                                className={styles.formControlChangePass__input}
                                value={passNow}
                                onChange={(e) => setPassNow(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                Hãy nhập mật khẩu hiện tại
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={styles.formControlChangePass} controlId="validationUserName">
                            <Form.Label htmlFor="userName" className={styles.formControlChangePass__label}>
                                Nhập mật khẩu hiện tại
                            </Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder='Nhập mật khẩu mới'
                                className={styles.formControlChangePass__input}
                                value={passNew}
                                onChange={(e) => setPassNew(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                Hãy nhập mật khẩu hiện tại
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={styles.formControlChangePass} controlId="validationUserName">
                            <Form.Label htmlFor="userPass" className={styles.formControlChangePass__label}>
                                Nhập mật khẩu mới
                            </Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder='Nhập lại mật khẩu mới'
                                className={styles.formControlChangePass__input}
                                value={againPassNew}
                                onChange={(e) => setAgainPassNew(e.target.value)}
                            />
                            <Link href={'/retriePassword'} className={styles.link}>
                                Bạn quên mật khẩu ?
                            </Link>
                            <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                Hãy nhập lại mật khẩu mới
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button className={styles.closeBtn2} >Thay đổi</Button>
                    </Form>
                </section>
            )}
        </main>
    );
};

export default ModalChangePass;
