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
            {pathname.includes('/paymentCourse') ? (<Navbar className={`${styles.nav}`} fixed='top'>
                <Container className={`${styles.container}`}>
                    <Navbar.Brand href="/home">
                        <img
                            src="/img/Logoambantto.png"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />
                    </Navbar.Brand>

                </Container>
            </Navbar>) :
                (<Navbar className={`${styles.nav}`} fixed='top'>
                    <Container className={`${styles.container}`}>
                        <Navbar.Brand href="/home">
                            <img
                                src="/img/Logoambantto.png"
                                className="d-inline-block align-top"
                                alt="Logo"
                            />
                        </Navbar.Brand>
                        <Nav className={`${styles.menu}`}>
                            <Link href="#!" className={`${styles.menuItem}`}>Nội dung</Link>
                            <Link href="#!" className={`${styles.menuItem}`}>Liên hệ</Link>
                            <Link href="#!" className={`${styles.menuItem}`}>Câu hỏi thường gặp</Link>
                        </Nav>
                        <Button type="secondery" status="hover" size="S" leftIcon={false} rightIcon={false} chevron={4} width={145} height={40}>Học thử miễn phí</Button>
                    </Container>
                </Navbar>)}
        </>

    )
}

export default HeaderCourseDetail;