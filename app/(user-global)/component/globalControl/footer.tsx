'use client'
import React from 'react';
import { Container, Row, Col, Image, Nav } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer: React.FC = () => {
    return (
        <footer >
            <Container className='footer-container'>
                <Row md={12} className='footer-header'>
                    <Col md={3} className="footer-profile-left">
                        <section className='box-logo'>
                            <Image src="/img/LogoPage.jpg" alt="Logo" className="logo-footer" />
                            <p className='text-1'>"Khám phá, học hỏi, vươn xa"</p>
                        </section>
                        <section className='box-logo-content'>
                            <p className='box-logo-content-text'><Image src="/img/phone.svg" alt="" className='box-logo-content-img' /> 090 7578 881</p>
                            <p className='box-logo-content-text'><Image src="/img/mail.svg" alt="" className='box-logo-content-img' /> contact@tto.edu.vn</p>
                            <p className='box-logo-content-text'><Image src="/img/map.svg" alt="" className='box-logo-content-img' />720A Điện Biên Phủ, Vinhomes Tân Cảng, Bình Thạnh, Hồ Chí Minh 72300</p>
                        </section>
                    </Col>
                    <Col md={7} className="footer-profile-right">
                        <Row md={12} className='footer-profile-right-row'>
                            <Col md={3} className="footer-about">
                                <h5 className='footer-h5-title'>Về TTO</h5>
                                <Nav className="list-unstyled">
                                    <Nav.Link className='text-decoration-none list-unstyled-li' href="/">Giới thiệu</Nav.Link>
                                    <Nav.Link className='text-decoration-none list-unstyled-li' href="/">Liên hệ</Nav.Link>
                                    <Nav.Link className='text-decoration-none list-unstyled-li' href="/">Điều khoản</Nav.Link>
                                    <Nav.Link className='text-decoration-none list-unstyled-li' href="/">Bảo mật</Nav.Link>
                                    <Nav.Link className='text-decoration-none list-unstyled-li' href="/">Cơ hội việc làm</Nav.Link>
                                </Nav>
                            </Col>
                            <Col md={3} className='footer-support'>
                                <h5 className='footer-h5-title'>Hỗ trợ học viên</h5>
                                <ul className="list-unstyled">
                                    <Nav.Link className='text-decoration-none list-unstyled-li' href="/">Facebook</Nav.Link>
                                    <Nav.Link className='text-decoration-none list-unstyled-li' href="/">Zalo</Nav.Link>
                                    <Nav.Link className='text-decoration-none list-unstyled-li' href="/">Instagram</Nav.Link>
                                    <Nav.Link className='text-decoration-none list-unstyled-li' href="/">TTCHAT</Nav.Link>
                                    <Nav.Link className='text-decoration-none list-unstyled-li' href="/">Trực tuyến</Nav.Link>
                                </ul>
                            </Col>
                            <Col md={4} className="footer-info">
                                <h5 className='footer-h5-title'>CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC TTO</h5>
                                <section className='footer-content'>
                                    <p className='footer-content-p'><bdi className='footer-content-bdi'>Mã số thuế:</bdi> 999999999</p>
                                    <p className='footer-content-p'><bdi className='footer-content-bdi'>Ngày thành lập:</bdi> 20/08/2024</p>
                                    <p className='footer-content-p'><bdi className='footer-content-bdi'>Lĩnh vực hoạt động:</bdi> Giáo dục, công nghệ - lập trình.
                                        Chúng tôi tập trung xây dựng và phát triển các sản phẩm mang lại
                                        giá trị cho cộng đồng lập trình viên Việt Nam.</p>
                                </section>
                            </Col>
                        </Row >
                    </Col >
                </Row >
                <Nav className='media-logo'>
                    <Nav.Link href="/" className='media-logo-link'><Image src="/img/fb.svg" alt=""  className='media-logo-img'/></Nav.Link>
                    <Nav.Link href="/" className='media-logo-link'><Image src="/img/intagram.svg" alt=""  className='media-logo-img'/></Nav.Link>
                    <Nav.Link href="/" className='media-logo-link'><Image src="/img/IN.svg" alt=""  className='media-logo-img'/></Nav.Link>
                    <Nav.Link href="/" className='media-logo-link'><Image src="/img/X.com.svg" alt=""  className='media-logo-img'/></Nav.Link>
                </Nav>
                <section className='copyright'>
                    <div className="copyright-content">
                        <p>Copyright © 2024 tto.sh</p>
                    </div>
                    <Nav className='copyright-service'>
                        <Nav.Link href="/" className='service'>Quyền lợi</Nav.Link> | <Nav.Link href="/" className='text-blue service'>Điều khoản điều kiện</Nav.Link> | <Nav.Link href="/" className='text-blue service'> Chính sách bảo mật</Nav.Link>
                    </Nav>
                </section>
            </Container >
        </footer >
    );
}

export default Footer;