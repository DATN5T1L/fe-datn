'use client'
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer >
            <section className='footer-header'>
                <div className="footer-profile-left">
                    <div className='box-logo'>
                        <img src="/img/logo.png" alt="Logo" className="logo-footer" />
                        <p className='text-1'>"Khám phá, học hỏi, vươn xa"</p>
                    </div>
                    <div className='box-logo-content'>
                        <p className='text-2'><img src="/img/phone.svg" alt="" /> 090 7578 881</p>
                        <p className='text-3'><img src="/img/mail.svg" alt="" /> contact@tto.edu.vn</p>
                        <p className='text-4'><img src="/img/map.svg" alt="" />720A Điện Biên Phủ, Vinhomes Tân Cảng, Bình Thạnh, Hồ Chí Minh 72300</p>
                    </div>
                </div>
                <div className="footer-profile-right">
                    <div className="footer-about">
                        <h5>Về TTO</h5>
                        <ul className="list-unstyled">
                            <li><Link className='text-decoration-none' href="/">Giới thiệu</Link></li>
                            <li><Link className='text-decoration-none' href="/">Liên hệ</Link></li>
                            <li><Link className='text-decoration-none' href="/">Điều khoản</Link></li>
                            <li><Link className='text-decoration-none' href="/">Bảo mật</Link></li>
                            <li><Link className='text-decoration-none' href="/">Cơ hội việc làm</Link></li>
                        </ul>
                    </div>
                    <div className='footer-support'>
                        <h5>Hỗ trợ học viên</h5>
                        <ul className="list-unstyled">
                            <li><Link className='text-decoration-none' href="/">Facebook</Link></li>
                            <li><Link className='text-decoration-none' href="/">Zalo</Link></li>
                            <li><Link className='text-decoration-none' href="/">Instagram</Link></li>
                            <li><Link className='text-decoration-none' href="/">TTCHAT</Link></li>
                            <li><Link className='text-decoration-none' href="/">Trực tuyến</Link></li>
                        </ul>
                    </div>
                    <div className="footer-info">
                        <h5>CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC TTO</h5>
                        <div className='footer-content'>
                            <p><span>Mã số thuế:</span> 999999999</p>
                            <p><span>Ngày thành lập:</span> 20/08/2024</p>
                            <p><span>Lĩnh vực hoạt động:</span> Giáo dục, công nghệ - lập trình.
                                Chúng tôi tập trung xây dựng và phát triển các sản phẩm mang lại
                                giá trị cho cộng đồng lập trình viên Việt Nam.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='media-logo'>
                <Link href="/" className='media-logo-link'><img src="/img/fb.svg" alt="" /></Link>
                <Link href="/" className='media-logo-link'><img src="/img/intagram.svg" alt="" /></Link>
                <Link href="/" className='media-logo-link'><img src="/img/IN.svg" alt="" /></Link>
                <Link href="/" className='media-logo-link'><img src="/img/X.com.svg" alt="" /></Link>
            </section>
            <section className='copyright'>
                <div className="copyright-content">
                    <p>Copyright © 2024 tto.sh</p>
                </div>
                <div className='copyright-service'>
                    <Link href="/" className='service'>Quyền lợi</Link> | <Link href="/" className='text-blue service'>Điều khoản điều kiện</Link> | <Link href="/" className='text-blue service'> Chính sách bảo mật</Link>
                </div>
            </section>
        </footer >
    );
}

export default Footer;