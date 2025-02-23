import React from 'react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import styles from "@public/styles/course/coursedetail.module.css";
import Button from "@app/(user-global)/component/globalControl/btnComponent";
import Link from "next/link"
const HeaderCourseDetail: React.FC = () => {
    const pathname = usePathname();
    return (
        <>
            {pathname.includes('/paymentCourse') ? (<div className={`${styles.nav} header-over`}>
                <section className={`${styles.containerHeader} `}>
                    <Navbar.Brand href="/home">
                        <img
                            src="/img/Logoambantto.png"
                            className="d-inline-block align-top"
                            alt="Xây dựng RESTful API chuyên nghiệp cùng tto.SH"
                        />
                    </Navbar.Brand>
                </section>
            </div>) :
                (<div className={`${styles.nav} header-over`} >
                    <section className={`${styles.containerHeaderCouser}`}>
                        <Navbar.Brand href="/home">
                            <img
                                src="/img/Logoambantto.png"
                                className="d-inline-block align-top"
                                alt="Xây dựng RESTful API chuyên nghiệp cùng tto.SH"
                            />
                        </Navbar.Brand>
                        <Nav className={`${styles.menu}`}>
                            <Link href="#content" className={`${styles.menuItem}`}>Nội dung</Link>
                            <Link href="#contact" className={`${styles.menuItem}`}>Liên hệ</Link>
                            <Link href="#fqa" className={`${styles.menuItem}`}>Câu hỏi thường gặp</Link>
                        </Nav>
                    </section>
                </div>)}
        </>

    )
}

export default HeaderCourseDetail;