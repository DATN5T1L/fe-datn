'use client'

import { Col, Container, Image, Row } from "react-bootstrap";
import styles from '@public/styles/user-component/Infomation.module.css'
import { useState, useEffect } from "react";
import ModalChangeImg from "./modalChangeImg";
import ModalChangeName from "./modalChangeName";
import ModalChangeInfo from "./modalChangeInfo";
import { RootState } from '../../../../../redux/store';
import { UserState } from '@/redux/slices/userSlice';
import { useSelector } from "react-redux";

const Infomation: React.FC = () => {
    const userState = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (userState.user) {
            console.log("Fullname:", userState.user);
        }
    }, [userState]);

    const [showChangeImg, setShowChangeImg] = useState(false)
    const [showChangeName, setShowChangeName] = useState(false)
    const [showChangeInfo, setShowChangeInfo] = useState(false)

    const handleChangeImg = () => setShowChangeImg(true)
    const handleChangeName = () => setShowChangeName(true)
    const handleChangeInfo = () => setShowChangeInfo(true)

    return (
        <>
            <Container className={styles.container}>
                <Row className={styles.header}>
                    <Col className={styles.header__main}>
                        <h3 className={styles.titleGroup__title}>Thông tin cá nhân</h3>
                        <h5 className={styles.titleGroup__subTitle}>Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.</h5>
                    </Col>
                </Row>
                {userState.user ? (
                    <Row className={styles.body}>
                        <Col className={styles.change__img} onClick={handleChangeImg}>
                            <div className={styles.change__img__group}>
                                <h4 className={styles.change__img__group__title}>Ảnh đại diện</h4>
                                {userState.user.avatar === null ? (
                                    <Image src="/img/avtDefault.jpg" alt="avt" className={styles.change__img__group__img} />
                                ) : (
                                    <Image src={`${userState.user.avatar}`} alt="avt" className={styles.change__img__group__img} />
                                )}
                            </div>
                            <Image src="/img/chevronLeft-black.svg" alt="" className={styles.change__img__icon} />
                        </Col>
                        <Col className={styles.change__more} onClick={handleChangeName}>
                            <div className={styles.change__more__group}>
                                <h4 className={styles.change__more__group__title}>Họ và tên</h4>
                                <h3 className={styles.change__more__group__subTitle}>{userState.user.fullname}</h3>
                            </div>
                            <Image src="/img/chevronLeft-black.svg" alt="" className={styles.change__more__icon} />
                        </Col>
                        <Col className={styles.change__more} >
                            <div className={styles.change__more__group}>
                                <h4 className={styles.change__more__group__title}>Tên người dùng</h4>
                                <h3 className={styles.change__more__group__subTitle}>vannguoicon</h3>
                            </div>
                            <Image src="/img/chevronLeft-black.svg" alt="" className={styles.change__more__icon} />
                        </Col>
                        <Col className={styles.change__more} onClick={handleChangeInfo}>
                            <div className={styles.change__more__group}>
                                <h4 className={styles.change__more__group__title}>Giới thiệu</h4>
                                <h3 className={styles.change__more__group__subTitle}>Tôi lớn lên tại Tiền Giang</h3>
                            </div>
                            <Image src="/img/chevronLeft-black.svg" alt="" className={styles.change__more__icon} />
                        </Col>
                    </Row>) : ('')}
            </Container>
            <ModalChangeImg
                show={showChangeImg}
                onClose={() => setShowChangeImg(false)}
            ></ModalChangeImg>
            <ModalChangeName
                show={showChangeName}
                onClose={() => setShowChangeName(false)}
            ></ModalChangeName>
            <ModalChangeInfo
                show={showChangeInfo}
                onClose={() => setShowChangeInfo(false)}
            ></ModalChangeInfo>
        </>
    )
}

export default Infomation;