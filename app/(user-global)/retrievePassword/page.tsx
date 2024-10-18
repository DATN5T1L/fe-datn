'use client'

import styles from '@public/styles/retrievePassword/RetrievePassword.module.css'
import Link from 'next/link'
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Container, Image } from 'react-bootstrap';
import Body from '../component/globalControl/body';
import CheckTokenRsp from '../component/auth/user-component/checkTokenRsP';
import NewPasswordPage from '../component/auth/user-component/newPasswordPage';

const RetrievePassword: React.FC = () => {



    return (
        <>
            <Body>
                <CheckTokenRsp></CheckTokenRsp>
                <NewPasswordPage></NewPasswordPage>
            </Body>
        </>
    )
}

export default RetrievePassword;
