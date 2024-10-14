'use client';

import React, { FC, useEffect, useState, Suspense } from 'react';
import styles from '@public/styles/user-component/ModalChangePass.module.css';
import { Button, Form, Image } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface ModalChangePassProps {
    show: boolean;
    onClose: () => void;
}

const ModalChangePassContent: React.FC<ModalChangePassProps> = ({ show, onClose }) => {
    const searchParams = useSearchParams();
    const pathName = usePathname()
    const [isVisible, setIsVisible] = useState(false);
    const showModal = searchParams.get('showModal');

    const isUser1 = pathName === '/info-user'
    const isUser2 = pathName === '/intro-user'

    useEffect(() => {
        if (show || showModal === 'change-password') {
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
    }, [show, showModal]);

    const handleCloseModal = () => {
        onClose();
        if (isUser1) {
            window.history.replaceState({}, '', '/info-user');
        } else if (isUser2) {
            window.history.replaceState({}, '', '/intro-user');
        } else {
            window.history.replaceState({}, '', '/wallet-user');
        }

    };

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
        <main className={`${styles.modalOverlay} ${isVisible ? styles.show : styles.hide}`} onClick={handleCloseModal}>
            {isVisible && (
                <section className={`${styles.modal} ${isVisible ? styles.show : styles.hide}`} onClick={(e) => e.stopPropagation()}>
                    <Button className={styles.closeBtn} onClick={handleCloseModal}>
                        <Image src="/img/closeBtn.svg" alt="" className={styles.closeBtn__img} />
                    </Button>
                    <Form className={styles.formChangePass} noValidate validated={validated} onSubmit={handleSubmit}>
                        <fieldset className={styles.modalBody}>
                            <legend className={styles.modalBody__title}>Thay đổi mật khẩu</legend>
                            <legend className={styles.modalBody__subTitle}>
                                Mật khẩu của bạn phải có tối thiểu 8 ký tự, bao gồm cả chữ số, chữ cái và ký tự đặc biệt (!$@%...).
                            </legend>
                        </fieldset>
                        <Form.Group className={styles.formControlChangePass} controlId="currentPassword">
                            <Form.Label htmlFor="currentPassword" className={styles.formControlChangePass__label}>
                                Nhập mật khẩu hiện tại
                            </Form.Label>
                            <Form.Control
                                type="password"
                                required
                                placeholder="Nhập mật khẩu hiện tại"
                                className={styles.formControlChangePass__input}
                                value={passNow}
                                onChange={(e) => setPassNow(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                Hãy nhập mật khẩu hiện tại
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={styles.formControlChangePass} controlId="newPassword">
                            <Form.Label htmlFor="newPassword" className={styles.formControlChangePass__label}>
                                Nhập mật khẩu mới
                            </Form.Label>
                            <Form.Control
                                type="password"
                                required
                                placeholder="Nhập mật khẩu mới"
                                className={styles.formControlChangePass__input}
                                value={passNew}
                                onChange={(e) => setPassNew(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                Hãy nhập mật khẩu mới
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={styles.formControlChangePass} controlId="confirmNewPassword">
                            <Form.Label htmlFor="confirmNewPassword" className={styles.formControlChangePass__label}>
                                Nhập lại mật khẩu mới
                            </Form.Label>
                            <Form.Control
                                type="password"
                                required
                                placeholder="Nhập lại mật khẩu mới"
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
                        <Button className={styles.closeBtn2}>Thay đổi</Button>
                    </Form>
                </section>
            )}
        </main>
    );
};

export default function ModalChangePass(props: ModalChangePassProps) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ModalChangePassContent {...props} />
        </Suspense>
    );
}
