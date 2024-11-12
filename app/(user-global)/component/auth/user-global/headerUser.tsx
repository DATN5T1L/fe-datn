'use client'

import styles from '@public/styles/user/HeaderUser.module.css'
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { UserState } from '@/redux/slices/userSlice';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

const HeaderUser: React.FC = () => {
    const userState = useSelector((state: RootState) => state.user);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (userState.user) {
            console.log("Fullname:", userState.user);
        }
    }, [userState]);
    return (
        <>
            <Container className={styles.container}>
                <section className={styles.container__bg}>
                    <article className={styles.content}>
                        {userState.user || session ? (
                            <>
                                {userState?.user?.avatar ? (
                                    <Image src={userState.user.avatar} alt="" className={styles.img} />
                                ) : session?.user?.image ? (
                                    <Image src={session.user.image} alt="" className={styles.img} />
                                ) : (
                                    <Image src="/img/avtDefault.jpg" alt="" className={styles.img} />
                                )}

                                <div className={styles.content__main}>
                                    <h3 className={styles.content__main__title}>
                                        {userState?.user?.fullname || session?.user?.name}
                                    </h3>
                                    <h4 className={styles.content__main__date}>Ngày 01 tháng 11 năm 2003</h4>
                                </div>
                            </>
                        ) : (
                            ''
                        )}
                    </article>
                </section>
            </Container>
        </>
    )
}

export default HeaderUser;