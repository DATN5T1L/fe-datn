'use client'

import styles from '@public/styles/retrievePassword/RetrievePassword.module.css'
import Link from 'next/link'
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Container, Image } from 'react-bootstrap';
import Body from '../component/globalControl/body';
import NewPasswordPage from '../component/auth/user-component/newPasswordPage';

const RetrievePassword: React.FC = () => {
    const validationSchema = Yup.object().shape({
        userName: Yup.string()
            .required('Hãy nhập tên đăng nhập hoặc email'),
        check: Yup.string()
            .required('Hãy nhập mã xác nhận'),
    });

    const handleSubmit = (values: { userName: string; check: string }) => {
        
    }

    return (
        <>
            <Body>
                <title>TTO - Quên mật khẩu</title>
                <meta name="description" content="Được tạo bởi Team TTO" />
                <Container className={styles.main}>
                    <div className={styles.main__container}>

                        <Formik
                            initialValues={{ userName: '', check: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <FormikForm className={styles.formRetrieve}>
                                    <fieldset className={styles.headerRetrieve}>
                                        <legend className={styles.headerRetrieve__title}>Quên mật khẩu</legend>
                                        <legend className={styles.headerRetrieve__subTitle}>
                                            Nhập email hoặc username của bạn và chúng tôi sẽ gửi cho bạn mã khôi phục mật khẩu.
                                        </legend>
                                        <Link href={'/login'} className={styles.back}>Quay về trang đăng nhập</Link>
                                    </fieldset>

                                    <section className={styles.validateRetrieve}>
                                        <div className={styles.userNameRetrieve}>
                                            <label htmlFor="userName" className={styles.userNameRetrieve__label}>
                                                Email hoặc tên người dùng
                                            </label>
                                            <Field
                                                type="text"
                                                name="userName"
                                                placeholder="Tên đăng nhập hoặc email"
                                                className={styles.userNameRetrieve__input}
                                            />
                                            <ErrorMessage name="userName" component="div" className={styles.feedBack} />
                                        </div>

                                        <div className={styles.userNameRetrieve}>
                                            <label htmlFor="check" className={styles.userNameRetrieve__label}>
                                                Nhập mã xác nhận
                                            </label>
                                            <Field
                                                type="text"
                                                name="check"
                                                placeholder="Mã xác nhận"
                                                className={styles.userNameRetrieve__input}
                                            />
                                            <ErrorMessage name="check" component="div" className={styles.feedBack} />
                                            <Button type="button" className={styles.sendCode}>Gửi mã</Button>
                                        </div>
                                    </section>

                                    <Button type="submit" className={styles.btnSubmit} disabled={isSubmitting}>
                                        Đặt lại mật khẩu
                                    </Button>
                                </FormikForm>
                            )}
                        </Formik>
                        <Image src="/img/pandaRetrieve.svg" alt="logo retrieve password" className={styles.logoRetrieve} />
                    </div>
                </Container>
                <NewPasswordPage></NewPasswordPage>
            </Body>
        </>
    )
}

export default RetrievePassword;
