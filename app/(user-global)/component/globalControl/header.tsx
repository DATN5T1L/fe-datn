'use client'
// import { auth } from '@/app/auth';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Nav, Navbar, Form, Image, Row, Col } from 'react-bootstrap';
import { IconForm, IconEmail, IconPhoneBlu } from "../icon/icons"
import GgLogoutHeader from '../auth/user-component/ggLogoutHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import Search from "./Search";
import c from "@public/styles/globalControl/header.module.css"
import { ShowNameElement } from '@app/(user-global)/component/globalControl/commonC';
const Header: React.FC = () => {
    const menuRef = useRef<HTMLDivElement>(null)
    const userState = useSelector((state: RootState) => state.user);
    const router = useRouter();
    const pathname = usePathname();

    const [isClient, setIsClient] = useState(false)
    const [showSearch, setShowSearch] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [lastScroll, setLastScroll] = useState(0);
    const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);
    const [isShowForm, setIsShowForm] = useState<boolean>(false)


    const tongleShowForm = () => {
        setIsShowForm(prev => !prev)
    }
    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;
            setShowHeader(currentScroll <= lastScroll);
            setLastScroll(currentScroll);
            setIsOpenSubMenu(false)
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScroll]);

    useEffect(() => {
        if (userState.user) {
            // console.log("Fullname:", userState.user);
        }
    }, [userState]);




    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpenSubMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [menuRef]);

    const handleLogin = () => {
        router.push('/login');
    };

    const handleShowSearch = () => {
        setShowSearch(!showSearch)
    }

    const handleOpenSubMenu = () => {
        setIsOpenSubMenu(!isOpenSubMenu)
    }

    const isLogin = pathname === '/login';
    const isUser = pathname === '/info-user';
    const isUser1 = pathname === '/intro-user';
    const isUser2 = pathname === '/wallet-user';
    const isUser3 = pathname === '/coursefor';
    const home = pathname === '/home'

    return (
        <>
            <Navbar className={`${c.header} header-nav ${showHeader ? 'visible' : 'hidden'} header-over`} style={{ gap: showSearch ? '12px' : '0' }}>
                <section className='header-nav-head'>
                    <ShowNameElement name="Trang chủ">
                        <Link href="/" className={`brand-header `}>
                            <Image src="/img/LogoPage.jpg" alt="Hỗ trợ học viên" className='img-brand-header' />
                        </Link>
                    </ShowNameElement>
                    <Nav className={`  btn-header`}>
                        <Row md={12} className='btn-header-container'>
                            <Col md={4} className={`btn-header-container-element ${c.MobileNone}`}>
                                <ShowNameElement name='Liên hệ'>
                                    <Link href='/Contact' className='btn-header-container-element-link'>
                                        <div>Liên hệ với TTO.SH</div>
                                        <Image src="/img/chervonblue-02.svg" alt="Tăng cường kỹ năng nhanh chóng" className='btn-header-container-element-img' />
                                    </Link>
                                </ShowNameElement>
                            </Col>
                            {isClient && userState.user ? (
                                <Col md={4} className='btn-header-container-element'>
                                    <section className='user-group'>
                                        <ShowNameElement name='Thông báo'>
                                            <div className={`user-notification `}>
                                                <Image src="/img/Bell.svg" alt="Tăng cường kỹ năng nhanh chóng  " className='icon-notification' />
                                            </div>
                                        </ShowNameElement>
                                        <div className='user' onClick={handleOpenSubMenu} ref={menuRef}>
                                            {userState?.user?.avatar ? (
                                                <Image src={`${userState?.user?.avatar}`} alt="Học lập trình cơ bản với TTO.SH" className='avt' />
                                            ) : (
                                                <Image src="/img/avtDefault.jpg" alt="Khóa học Node.js cơ bản tại TTO.sh" className='avt' />
                                            )}

                                            <section className={`title-group ${c.infoUser}`}>
                                                <h4 className='title-1'>Xin chào</h4>
                                                <h4 className='title-name'>{userState?.user?.fullname}</h4>
                                            </section>
                                            <svg className={`${isOpenSubMenu ? 'right-icon-user-open' : 'right-icon-user'}`} width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 9L12 15L18 9" stroke="rgba(35, 125, 247, 1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <section className={` ${isOpenSubMenu ? 'subMenu' : 'max-height-subMenu'} `} >
                                                <div className={c.ctaContactMobile}>
                                                    <h3 className='subMenu-title'>
                                                        Liên hệ hỗ trợ
                                                    </h3>
                                                    <section className='subMenu-body'>
                                                        <Link href={'#Feadback'} className={c.subMenuTitle}  >
                                                            Để lại thông tin nhận hỗ trợ
                                                        </Link>

                                                        <Link href={"tel:+0907578881"} className={c.subMenuTitle}>

                                                            Gọi ngay
                                                        </Link>
                                                        <Link href={"href='https://mail.google.com/mail/?view=cm&fs=1&to=ht24430@gmail.com&su=Gặp lỗi&body=Hello,%20I%20need%20help"} className={c.subMenuTitle}>
                                                            Gửi qua email
                                                        </Link>
                                                    </section>
                                                </div>
                                                <h3 className='subMenu-title'>
                                                    Cài đặt thông tin
                                                </h3>
                                                <section className='subMenu-body'>
                                                    <Link href={'/info-user'} className={`subMenu-body-link ${isUser ? 'subMenu-body-link-blue' : ''}`} autoFocus={false} >
                                                        <Image src='/img/infoProfile-black.svg' className={`subMenu-body-img-black ${isUser ? 'subMenu-body-img-black-none' : ''}`} />
                                                        <Image src='/img/infoProfile-white.svg' className={`subMenu-body-img-white ${isUser ? 'subMenu-body-img-white-block' : ''}`} />
                                                        <div className={`subMenu-body-link-title ${isUser ? 'subMenu-body-link-title-white' : ''}`}>
                                                            Thông tin cá nhân
                                                        </div>
                                                    </Link>

                                                    <Link href={`${isUser1 ? '/intro-user?showModal=change-password' : isUser2 ? '/wallet-user?showModal=change-password' : '/info-user?showModal=change-password'}`} className='subMenu-body-link' autoFocus={false}>
                                                        <Image src='/img/infoPassWord-black.svg' className='subMenu-body-img-black' />
                                                        <Image src='/img/infoPassWord-white.svg' className='subMenu-body-img-white' />
                                                        <div className='subMenu-body-link-title'>
                                                            Cài đặt mật khẩu
                                                        </div>
                                                    </Link>
                                                    <GgLogoutHeader></GgLogoutHeader>
                                                </section>
                                            </section>
                                        </div>
                                    </section>
                                </Col>
                            ) : (
                                <Col md={4} className='btn-header-container-element'>
                                    <ShowNameElement name="Đăng ký đăng nhập">
                                        <Button
                                            onClick={handleLogin}
                                            className={`btn-navbar border-blue-1 ${isLogin ? 'light-check' : ''}`}
                                        >
                                            Đăng nhập
                                        </Button>
                                    </ShowNameElement>
                                </Col>
                            )}
                        </Row>
                        <Row md={12} className={`${c.CtaHeader} btn-header-btn-group`}>
                            <Col md={3} className='btn-header-btn-group-element'>
                                <ShowNameElement name='Gửi thông tin'>
                                    <Link href={'#Feadback'} className='btn-header-btn-group-main'>
                                        <IconForm />
                                        <div className='btn-header-btn-group-main-content'>
                                            Để lại thông tin nhận hỗ trợ
                                        </div>
                                    </Link>
                                </ShowNameElement>
                            </Col>
                            <Col md={3} className='btn-header-btn-group-element'>
                                <ShowNameElement name='Gọi ngay'>
                                    <Button className='btn-header-btn-group-main' href='tel:+0907578881'>
                                        <IconPhoneBlu />
                                    </Button>
                                </ShowNameElement>
                            </Col>
                            <Col md={3} className='btn-header-btn-group-element'>
                                <ShowNameElement name='Gửi email hỗ trợ'>
                                    <Button
                                        className='btn-header-btn-group-main'
                                        href='https://mail.google.com/mail/?view=cm&fs=1&to=ht24430@gmail.com&su=Gặp lỗi&body=Hello,%20I%20need%20help'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <IconEmail />
                                    </Button>
                                </ShowNameElement>
                            </Col>

                            <Col md={3} className='btn-header-btn-group-element'>
                                <ShowNameElement name='Tìm kiếm'>
                                    <Button onClick={handleShowSearch} className='btn-header-btn-group-main2'>
                                        <Image src={`${showSearch ? '/img/Canxel.svg' : '/img/searchBlue.svg'}`} alt="Lập trình backend với ExpressJS từ TTO" className={`btn-header-btn-group-main-img1`} />
                                    </Button>
                                </ShowNameElement>
                            </Col>
                        </Row>
                    </Nav>
                </section>

                <Nav className={`box-search ${showSearch ? '' : 'box-search-h0'}`}>
                    <Search />
                </Nav>
            </Navbar >
        </>
    );
};

export default Header;