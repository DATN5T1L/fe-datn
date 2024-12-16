'use client'
import dynamic from "next/dynamic";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import styles from '@public/styles/user-component/Infomation.module.css';
import { useState, useEffect } from "react";
import { RootState } from '../../../../../redux/store';
import { useSelector } from "react-redux";
import Link from "next/link";
import Button from "../../globalControl/btnComponent";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useCookie from "../../hook/useCookie";

// Dùng dynamic import để tắt SSR cho component này
const ModalChangeImg = dynamic(() => import("./modalChangeImg"), { ssr: false });
const ModalChangeName = dynamic(() => import("./modalChangeName"), { ssr: false });
const ModalChangeInfo = dynamic(() => import("./modalChangeInfo"), { ssr: false });
const ModalChangePhone = dynamic(() => import("./modalChangePhone"), { ssr: false });
const ModalChangeEmail = dynamic(() => import("./modalChangeEmail"), { ssr: false });
const ModalChangeAge = dynamic(() => import("./modalChangeAge"), { ssr: false });

const Infomation: React.FC = () => {
    const [isRole, setIsRole] = useState(false)
    const userState = useSelector((state: RootState) => state.user);
    useEffect(() => {
        if (userState?.user) {
            // console.log("Fullname:", userState.user);
        }
    }, [userState]);

    useEffect(() => {
        if (userState.user?.role === 'admin') {
            setIsRole(true)
        } else {
            setIsRole(false)
        }
    }, [userState])

    const [showChangeImg, setShowChangeImg] = useState(false);
    const [showChangeName, setShowChangeName] = useState(false);
    const [showChangeInfo, setShowChangeInfo] = useState(false);
    const [showChangePhone, setShowChangePhone] = useState(false);
    const [showChangeEmail, setShowChangeEmail] = useState(false);
    const [showChangeAge, setShowChangeAge] = useState(false);

    const handleChangeImg = () => setShowChangeImg(true);
    const handleChangeName = () => setShowChangeName(true);
    const handleChangeInfo = () => setShowChangeInfo(true);
    const handleChangePhone = () => setShowChangePhone(true);
    const handleChangeEmail = () => setShowChangeEmail(true);
    const handleChangeAge = () => setShowChangeAge(true);

    // hiển thị các roll
    const roleMapping: Record<'admin' | 'accountant' | 'marketing' | 'instructor', { label: string; href: string }> = {
        admin: { label: 'Quản trị viên', href: '/admin' },
        accountant: { label: 'Kế toán', href: '/accountant' },
        marketing: { label: 'Marketing', href: '/marketing' },
        instructor: { label: 'Giảng viên', href: '/instructor' },
    };

    const userRole = userState?.user?.role as 'admin' | 'accountant' | 'marketing' | 'instructor' | undefined;

    const userRoleElement = userRole && roleMapping[userRole]
        ? (
            <Link href={roleMapping[userRole].href} style={{ padding: "0px" }}>
                <Col className={styles.change__more}>

                    <div className={styles.change__more__group}>
                        <h4 className={styles.change__more__group__title}>Quyền</h4>
                        <h3 className={styles.change__more__group__subTitle}>{roleMapping[userRole].label}</h3>
                    </div>
                    <Image
                        src="/img/chevronLeft-black.svg"
                        alt="Ghi danh ngay hôm nay TTO.SH"
                        className={styles.change__more__icon}
                    />
                </Col>
            </Link>

        )
        : null;

    return (
        <>
            <Container className={styles.container}>
                <Row className={styles.header}>
                    <Col className={styles.header__main}>
                        <h3 className={styles.titleGroup__title}>Thông tin cá nhân</h3>
                        <h5 className={styles.titleGroup__subTitle}>Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.</h5>
                    </Col>
                </Row>
                {userState?.user ? (
                    <Row className={styles.body}>
                        <Col className={styles.change__img} onClick={handleChangeImg}>
                            <div className={styles.change__img__group}>
                                <h4 className={styles.change__img__group__title}>Ảnh đại diện</h4>
                                <Image
                                    src={userState?.user?.avatar ? userState.user.avatar : "/img/avtDefault.jpg"}
                                    alt="Học phí linh hoạt TTO.SH"
                                    className={styles.change__img__group__img}
                                />
                            </div>
                            <Image src="/img/chevronLeft-black.svg" alt="Hỗ trợ học viên TTO.SH" className={styles.change__img__icon} />
                        </Col>
                        <Col className={styles.change__more} onClick={handleChangeName}>
                            <div className={styles.change__more__group}>
                                <h4 className={styles.change__more__group__title}>Họ và tên</h4>
                                <h3 className={styles.change__more__group__subTitle}>{userState?.user?.fullname ? userState.user.fullname : 'Không có dữ liệu'}</h3>
                            </div>
                            <Image src="/img/chevronLeft-black.svg" alt="tto.sh" className={styles.change__more__icon} />
                        </Col>
                        <Col className={styles.change__more} onClick={handleChangePhone}>
                            <div className={styles.change__more__group}>
                                <h4 className={styles.change__more__group__title}>Số điện thoại</h4>
                                <h3 className={styles.change__more__group__subTitle}>{userState?.user?.phonenumber || 'Chưa có số điện thoại'}</h3>
                            </div>
                            <Image src="/img/chevronLeft-black.svg" alt="Khóa học trực tuyến tto.sh" className={styles.change__more__icon} />
                        </Col>
                        <Col className={styles.change__more} onClick={handleChangeEmail}>
                            <div className={styles.change__more__group}>
                                <h4 className={styles.change__more__group__title}>Email</h4>
                                <h3 className={styles.change__more__group__subTitle}>{userState?.user?.email || 'Chưa có số điện thoại'}</h3>
                            </div>
                            <Image src="/img/chevronLeft-black.svg" alt="Học với chuyên gia tto" className={styles.change__more__icon} />
                        </Col>
                        <Col className={styles.change__more} onClick={handleChangeAge}>
                            <div className={styles.change__more__group}>
                                <h4 className={styles.change__more__group__title}>Tuổi</h4>
                                <h3 className={styles.change__more__group__subTitle}>{userState?.user?.age || 'Chưa có số điện thoại'}</h3>
                            </div>
                            <Image src="/img/chevronLeft-black.svg" alt="Học với chuyên gia tto" className={styles.change__more__icon} />
                        </Col>
                        <Col className={styles.change__more} onClick={handleChangeInfo}>
                            <div className={styles.change__more__group}>
                                <h4 className={styles.change__more__group__title}>Giới thiệu</h4>
                                <h3 className={styles.change__more__group__subTitle}>{userState?.user?.discription_user ? userState?.user?.discription_user : 'Chưa có giới thiệu'}</h3>
                            </div>
                            <Image src="/img/chevronLeft-black.svg" alt="Học tập từ xa tto.sh" className={styles.change__more__icon} />
                        </Col>
                        {userRoleElement}
                    </Row>
                ) : null}
            </Container>
            <ModalChangeImg
                show={showChangeImg}
                onClose={() => setShowChangeImg(false)}
            />
            <ModalChangeName
                show={showChangeName}
                onClose={() => setShowChangeName(false)}
            />
            <ModalChangeInfo
                show={showChangeInfo}
                onClose={() => setShowChangeInfo(false)}
            />
            <ModalChangePhone
                show={showChangePhone}
                onClose={() => setShowChangePhone(false)}
            />
            <ModalChangeEmail
                show={showChangeEmail}
                onClose={() => setShowChangeEmail(false)}
            />
            <ModalChangeAge
                show={showChangeAge}
                onClose={() => setShowChangeAge(false)}
            />
        </>
    );
};

export default Infomation;
