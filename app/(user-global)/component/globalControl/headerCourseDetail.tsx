import React from 'react';
import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import styles from "@public/styles/course/coursedetail.module.css";
import Button from "@app/(user-global)/component/globalControl/btnComponent";
const HeaderCourseDetail: React.FC = () => {
    return (
        <>
            <Navbar className={`${styles.nav}`} fixed='top'>
                <Container className={`${styles.container}`}>
                    <Navbar.Brand href="/home">
                        <img
                            src="/img/logoamban.png"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />
                    </Navbar.Brand>
                    <Nav className={`${styles.menu}`}>
                        <Nav.Link href="#home" className={`${styles.menuItem}`}>Nội dung</Nav.Link>
                        <Nav.Link href="#about" className={`${styles.menuItem}`}>Liên hệ</Nav.Link>
                        <Nav.Link href="#services" className={`${styles.menuItem}`}>Câu hỏi thường gặp</Nav.Link>
                    </Nav>
                    <Button type="secondery" status="hover" size="S" leftIcon={false} rightIcon={false} chevron={4} width={145} height={40}>Học thử miễn phí</Button>
                </Container>
            </Navbar>
        </>

    )
}

export default HeaderCourseDetail;