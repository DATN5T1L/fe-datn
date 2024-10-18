'use client'

import styles from '@public/styles/retrievePassword/RetrievePassword.module.css'
import Link from 'next/link'
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Image } from 'react-bootstrap';
import Body from '../../globalControl/body';

const NewPasswordPage: React.FC = () => {

    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
            .required('Hãy nhập mật khẩu mới'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword')], 'Mật khẩu xác nhận không khớp')
            .required('Hãy nhập lại mật khẩu'),
    });

    const handleSubmit = (values: { newPassword: string; confirmPassword: string }) => {

    }

    return (
        <>
            <title>TTO - Nhập mật khẩu mới</title>
            <meta name="description" content="Được tạo bởi Team TTO" />
            <Container className={styles.main}>
                <div className={styles.main__container}>
                    <Image src="/img/pandaRetrieve.svg" alt="logo retrieve password" className={styles.logoRetrieve} />

                    <Formik
                        initialValues={{ newPassword: '', confirmPassword: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <FormikForm className={styles.formRetrieve}>
                                <fieldset className={styles.headerRetrieve}>
                                    <legend className={styles.headerRetrieve__title}>Nhập mật khẩu mới</legend>
                                    <legend className={styles.headerRetrieve__subTitle}>
                                        Nhập mật khẩu mới của bạn cho những lần đăng nhập sau.
                                    </legend>
                                    <Link href={'/login'} className={styles.back}>Quay về trang đăng nhập</Link>
                                </fieldset>

                                <section className={styles.validateRetrieve}>
                                    <div className={styles.userNameRetrieve}>
                                        <label htmlFor="newPassword" className={styles.userNameRetrieve__label}>
                                            Nhập mật khẩu mới
                                        </label>
                                        <Field
                                            type="password"
                                            name="newPassword"
                                            placeholder="Mật khẩu mới"
                                            className={styles.userNameRetrieve__input}
                                        />
                                        <ErrorMessage name="newPassword" component="div" className={styles.feedBack} />
                                    </div>

                                    <div className={styles.userNameRetrieve}>
                                        <label htmlFor="confirmPassword" className={styles.userNameRetrieve__label}>
                                            Nhập lại mật khẩu
                                        </label>
                                        <Field
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Xác nhận mật khẩu"
                                            className={styles.userNameRetrieve__input}
                                        />
                                        <ErrorMessage name="confirmPassword" component="div" className={styles.feedBack} />
                                    </div>
                                </section>

                                <Button type="submit" className={styles.btnSubmit} disabled={isSubmitting}>
                                    Đặt lại mật khẩu
                                </Button>
                            </FormikForm>
                        )}
                    </Formik>
                </div>
            </Container>
        </>
    )
}

export default NewPasswordPage;
