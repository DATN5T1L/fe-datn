'use client'
// import { auth } from '@/app/auth';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { Container, Button, Nav, Navbar, Form, Image, Row, Col } from 'react-bootstrap';
import { IconForm, IconEmail, IconPhoneBlu } from "../icon/icons"
import GgLogoutHeader from '../auth/user-component/ggLogoutHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import Search from "./Search";
import Feaback from "./FeedBack";
import { motion, AnimatePresence } from 'framer-motion';
import c from "@public/styles/globalControl/header.module.css"

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
            <Navbar className={`header-nav ${showHeader ? 'visible' : 'hidden'} header-over`} style={{ gap: showSearch ? '12px' : '0' }}>
                <section className='header-nav-head'>
                    <Tippy content="Trang chủ">
                        <Link href="/" className='brand-header'>
                            <Image src="/img/LogoPage.jpg" alt="logo" className='img-brand-header' />
                        </Link>
                    </Tippy>
                    <Nav className={`  btn-header`}>
                        <Row md={12} className='btn-header-container'>
                            <Col md={4} className='btn-header-container-element'>
                                <Link href='/' className='btn-header-container-element-link'>
                                    <div>Về chúng tôi</div>
                                    <Image src="/img/chervonblue-02.svg" alt="" className='btn-header-container-element-img' />
                                </Link>
                            </Col>
                            <Col md={4} className='btn-header-container-element'>
                                <Link href='/' className='btn-header-container-element-link'>
                                    <div>Liên hệ với TTO.SH</div>
                                    <Image src="/img/chervonblue-02.svg" alt="" className='btn-header-container-element-img' />
                                </Link>
                            </Col>
                            {isClient && userState.user ? (
                                <Col md={4} className='btn-header-container-element'>
                                    <section className='user-group'>
                                        <div className='user-notification'>
                                            <Image src="/img/Bell.svg" alt="" className='icon-notification' />
                                        </div>
                                        <div className='user' onClick={handleOpenSubMenu} ref={menuRef}>
                                            {userState?.user?.avatar ? (
                                                <Image src={`${userState?.user?.avatar}`} alt="" className='avt' />
                                            ) : (
                                                <Image src="/img/avtDefault.jpg" alt="" className='avt' />
                                            )}

                                            <section className='title-group'>
                                                <h4 className='title-1'>Xin chào</h4>
                                                <h4 className='title-name'>{userState?.user?.fullname}</h4>
                                            </section>
                                            <svg className={`${isOpenSubMenu ? 'right-icon-user-open' : 'right-icon-user'}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='right-icon-user-stroke' />
                                            </svg>
                                            <section className={` ${isOpenSubMenu ? 'subMenu' : 'max-height-subMenu'}`} >
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
                                    <Tippy content="Đăng ký đăng nhập">
                                        <Button
                                            onClick={handleLogin}
                                            className={`btn-navbar border-blue-1 ${isLogin ? 'light-check' : ''}`}
                                        >
                                            Đăng nhập
                                        </Button>
                                    </Tippy>
                                </Col>
                            )}
                        </Row>
                        <Row md={12} className={`${c.CtaHeader} btn-header-btn-group`}>
                            <Col md={3} className='btn-header-btn-group-element'>
                                <Button className='btn-header-btn-group-main' onClick={tongleShowForm}>
                                    <IconForm />
                                    <div className='btn-header-btn-group-main-content'>
                                        Để lại thông tin nhận hỗ trợ
                                    </div>
                                </Button>
                            </Col>
                            <Col md={3} className='btn-header-btn-group-element'>
                                <Button className='btn-header-btn-group-main' href='tel:+0907578881'>
                                    <IconPhoneBlu />
                                </Button>
                            </Col>
                            <Col md={3} className='btn-header-btn-group-element'>
                                <Button
                                    className='btn-header-btn-group-main'
                                    href='https://mail.google.com/mail/?view=cm&fs=1&to=ht24430@gmail.com&su=Gặp lỗi&body=Hello,%20I%20need%20help'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <IconEmail />
                                </Button>
                            </Col>

                            <Col md={3} className='btn-header-btn-group-element'>
                                <Button onClick={handleShowSearch} className='btn-header-btn-group-main2'>
                                    <Image src={`${showSearch ? '/img/Canxel.svg' : '/img/searchBlue.svg'}`} alt="" className={`btn-header-btn-group-main-img1`} />
                                </Button>
                            </Col>
                        </Row>
                    </Nav>
                </section>

                <Nav className={`box-search ${showSearch ? '' : 'box-search-h0'}`}>
                    <Search />
                </Nav>
            </Navbar >
            {isShowForm && (
                <AnimatePresence>
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-110%' }}
                        transition={{ duration: 0.5 }}
                    >
                        <Container>
                            <Feaback />
                        </Container>

                    </motion.div>
                </AnimatePresence>

            )}
        </>
    );
};

export default Header;