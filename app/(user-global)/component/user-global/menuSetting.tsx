'use client'

import Link from "next/link";
import { Button, Container, Nav } from "react-bootstrap";
import styles from '@public/styles/user/MenuSetting.module.css'
import '@public/styles/user/MenuSetting.module.css'
import { useState } from "react";
import ModalChangePass from "../user-component/modalChangePass";
import { usePathname } from "next/navigation";

const MenuSetting: React.FC = () => {
    const [showChangePassWord, setShowChangePassWord] = useState(false)
    const pathname = usePathname();

    const handleShowChangePassWord = () => setShowChangePassWord(true)

    const isUser = pathname === '/intro-user';
    const isUser1 = pathname === '/info-user';
    const isUser2 = pathname === '/wallet-user';

    return (
        <>
            <section className={styles.container} >
                <h3 className={styles.header__title}>
                    Cài đặt thông tin
                </h3>
                <section className={styles.main}>
                    <Link href="/intro-user" className={`${styles.link} ${isUser ? styles.blue : ''}`}>
                        <img src='/img/infoUser-black.svg' className={`${styles.black} ${isUser ? styles.none : ''}`} />
                        <img src='/img/infoUser-white.svg' className={`${styles.white} ${isUser ? styles.block : ''}`} />
                        <div className={`${styles.link__title} ${isUser ? styles.whiteCl : ''}`}>Giới thiệu</div>
                    </Link>
                    <Link href="/info-user" className={`${styles.link} ${isUser1 ? styles.blue : ''}`}>
                        <img src='/img/infoProfile-black.svg' className={`${styles.black} ${isUser1 ? styles.none : styles.block}`} />
                        <img src='/img/infoProfile-white.svg' className={`${styles.white} ${isUser1 ? styles.block : styles.none}`} />
                        <div className={`${styles.link__title} ${isUser1 ? styles.whiteCl : ''}`}>Thông tin cá nhân</div>
                    </Link>
                    <Link href="/wallet-user" className={`${styles.link} ${isUser2 ? styles.blue : ''}`}>
                        <img src='/img/infoPay-black.svg' className={`${styles.black} ${isUser2 ? styles.none : styles.block}`} />
                        <img src='/img/infoPay-white.svg' className={`${styles.white} ${isUser2 ? styles.block : ''}`} />
                        <div className={`${styles.link__title} ${isUser2 ? styles.whiteCl : ''}`}>Ví</div>
                    </Link>
                    <Button
                        className={styles.link}
                        onClick={handleShowChangePassWord}
                        autoFocus={false}
                    >
                        <img src='/img/infoPassWord-black.svg' className={styles.black} />
                        <img src='/img/infoPassWord-white.svg' className={styles.white} />
                        <div className={styles.link__title}>Thay đổi mật khẩu</div>
                    </Button>
                    <Link href="/" className={styles.link}>
                        <img src='/img/infoLogout-black.svg' className={styles.black} />
                        <img src='/img/infoLogout-white.svg' className={styles.white} />
                        <div className={styles.link__title}>Đăng xuất</div>
                    </Link>
                </section>
            </section>
            <ModalChangePass
                show={showChangePassWord}
                onClose={() => setShowChangePassWord(false)}
            />
            <div></div>
        </>
    )
}

export default MenuSetting;