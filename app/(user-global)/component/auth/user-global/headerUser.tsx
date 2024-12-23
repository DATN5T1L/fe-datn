'use client'

import styles from '@public/styles/user/HeaderUser.module.css'
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { useEffect } from 'react';
import { calculateBirthYear } from '../../globalControl/commonC';
const HeaderUser: React.FC = () => {
    const userState = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (userState.user) {
            // console.log("Fullname:", userState.user);
        }
    }, [userState]);
    return (
        <>
            <Container className={styles.container}>
                <section className={styles.container__bg}>
                    <article className={styles.content}>
                        {userState.user ? (
                            <>
                                {userState?.user?.avatar ? (
                                    <Image src={userState.user.avatar} alt="Bán khóa học online" className={styles.img} />
                                ) : (
                                    <Image src="/img/avtDefault.jpg" alt="Đào tạo trực tuyến chất lượng cao" className={styles.img} />
                                )}

                                <div className={styles.content__main}>
                                    <h3 className={styles.content__main__title}>
                                        {userState?.user?.fullname}
                                    </h3>
                                    <h4 className={styles.content__main__date}>Sinh năm: {calculateBirthYear(userState?.user?.age)}</h4>
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