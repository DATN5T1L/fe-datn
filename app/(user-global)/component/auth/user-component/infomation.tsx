'use client'

import { Col, Container, Image, Row } from "react-bootstrap";
import styles from '@public/styles/user-component/Infomation.module.css'
import { useState } from "react";
import ModalChangeImg from "./modalChangeImg";
import ModalChangeName from "./modalChangeName";
import ModalChangeInfo from "./modalChangeInfo";

const Infomation: React.FC = () => {
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
                <Row className={styles.body}>
                    <Col className={styles.change__img} onClick={handleChangeImg}>
                        <section className={styles.change__img__group}>
                            <h4 className={styles.change__img__group__title}>Ảnh đại diện</h4>
                            <Image src="/img/avt.jpg" alt="" className={styles.change__img__group__img} />
                        </section>
                        <Image src="/img/chevronLeft-black.svg" alt="" className={styles.change__img__icon} />
                    </Col>
                    <Col className={styles.change__more} onClick={handleChangeName}>
                        <section className={styles.change__more__group}>
                            <h4 className={styles.change__more__group__title}>Họ và tên</h4>
                            <h3 className={styles.change__more__group__subTitle}>Con Văn Người</h3>
                        </section>
                        <Image src="/img/chevronLeft-black.svg" alt="" className={styles.change__more__icon} />
                    </Col>
                    <Col className={styles.change__more} >
                        <section className={styles.change__more__group}>
                            <h4 className={styles.change__more__group__title}>Tên người dùng</h4>
                            <h3 className={styles.change__more__group__subTitle}>vannguoicon</h3>
                        </section>
                        <Image src="/img/chevronLeft-black.svg" alt="" className={styles.change__more__icon} />
                    </Col>
                    <Col className={styles.change__more} onClick={handleChangeInfo}>
                        <section className={styles.change__more__group}>
                            <h4 className={styles.change__more__group__title}>Giới thiệu</h4>
                            <h3 className={styles.change__more__group__subTitle}>Tôi lớn lên tại Tiền Giang</h3>
                        </section>
                        <Image src="/img/chevronLeft-black.svg" alt="" className={styles.change__more__icon} />
                    </Col>
                </Row>
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