"use client";
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import 'aos/dist/aos.css';
import AOS from 'aos';
import { Course } from "@/app/(user-global)/model/course";
import styles from "@public/styles/course/coursedetail.module.css";
import stylesP from "@public/styles/course/coursePayment.module.css";
import Image from 'next/image';
import RegisterSale from '../../component/home/RegisterSale';
import { IconChapter, IconCheck, IconEvery, IconNoteDoc, IconVocuc } from '../../component/icon/icons';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface FaqCourse {
    question_faq: string;
    answer_faq: string;
}

interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}

const Payment: React.FC<{ params: { id: string } }> = ({ params }) => {
    const { id } = params;
    const [error, setError] = useState<string | null>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [idCourse, setIdCourse] = useState<string>("")

    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, []);
    const fetchIdCourse = async (id: string) => {

        try {
            const response = await fetch(`/api/slugById/${id}/Course`);

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const result = await response.json();
            console.log(result)
            setIdCourse(result.Course);

        } catch (error: any) {
            console.error("Error fetching data:", error);

        }
    };

    useEffect(() => {
        if (id) fetchIdCourse(id)
    }, [id])

    const toggleContent = (index: number) => {
        setOpenIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const { data: courseData, error: courseError } = useSWR<ApiResponse<Course>>(
        `/api/courseDetail/${idCourse}`,
        fetcher
    );

    const { data: faqData, error: faqError } = useSWR<ApiResponse<FaqCourse[]>>(
        `/api/getFaqCourse/${idCourse}/10`,
        fetcher
    );

    const token = localStorage.getItem('token');
    const fetchPayMentVn = async () => {
        try {
            const response = await fetch(`/api/paymentvn/${idCourse}/${totalPrices}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                const paymentUrl = data.data;

                if (paymentUrl) {
                    window.location.href = paymentUrl;
                } else {
                    throw new Error("Payment URL is missing");
                }
            } else if (!response.ok) {
                throw new Error("Thanh toán thất bại");
            }



        } catch (err: any) {
            setError(err.message);
        }
    };

    const fetchPayMentMomo = async () => {
        try {
            const response = await fetch(`/api/paymentmomo/${idCourse}/${totalPrices}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);

            } else if (!response.ok) {
                throw new Error("Thanh toán thất bại");
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Handle loading and error states
    if (courseError || faqError) return <div>Failed to load data</div>;
    if (!courseData || !faqData) return <div>Loading...</div>;


    const course = courseData.data;
    const faqs = faqData.data;
    const costDis = 100000;
    const priceString = course.price_course;
    const tax = course.tax_rate;
    const priceTax = tax * priceString / 100
    const totalPrices = priceString - priceTax - costDis;

    const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(priceString);

    const formattedcostDise = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(costDis);

    const formattedTaxRate = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(priceTax);

    const formattedTotal = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(totalPrices);


    return (
        <>


            <section className={`${styles.couserOverview}`}>
                <Container className={`${styles.container} ${styles.hero}`}>
                    <h2 className={`${styles.heading} ${stylesP.headingPayment} text-center`}>
                        Mua ngay với giá ưu đãi “vô cực” - Chỉ 399 slots!
                    </h2>

                    <Row className={`${stylesP.content}`}>
                        <Col md="4">
                            <div className={stylesP.LeftContent}>
                                <h4 className={stylesP.getYou}>Bạn sẽ nhận được gì?</h4>
                                <div className={stylesP.getYouBox}>
                                    <div className={stylesP.getYouBoxItem}>
                                        <IconCheck />
                                        <p className={stylesP.boxDesc}>Truy cập toàn bộ khóa học <span className={stylesP.boxDescStrong}>{course.name_course}</span></p>
                                    </div>
                                    <div className={stylesP.getYouBoxItem}>
                                        <IconNoteDoc />
                                        <p className={stylesP.boxDesc}>Hơn <span className={stylesP.boxDescStrong}>{course.num_chapter}</span> bài học</p>
                                    </div>
                                    <div className={stylesP.getYouBoxItem}>
                                        <IconChapter />
                                        <p className={stylesP.boxDesc}>Hơn <span className={stylesP.boxDescStrong}>{course.num_document}</span> bài tập</p>
                                    </div>
                                    <div className={stylesP.getYouBoxItem}>
                                        <IconEvery />
                                        <p className={stylesP.boxDesc}>Được cập nhật mãi mãi</p>
                                    </div>
                                    <div className={stylesP.getYouBoxItem}>
                                        <IconVocuc />
                                        <p className={stylesP.boxDesc}>Mua 1 lần học mãi mãi</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md="8">
                            <div className={stylesP.rightContent}>
                                <div className={stylesP.topRight}>
                                    <p className={stylesP.boxDesc}>Sở hữu ngay khóa học {course.name_course} với lộ trình bài bản và chi tiết nhất!</p>
                                    <ul className={stylesP.boxDescDiscount}>
                                        <li className={stylesP.boxDescDiscountItem}>
                                            <p className={stylesP.boxDesc}>
                                                <span className={stylesP.boxDescStrong}>Giảm ngay 100k</span>  cho tài khoản đã mua các khóa học trước đó                                            </p>
                                        </li>
                                    </ul>
                                    <p className={`${stylesP.boxDesC} ${stylesP.boxDescStrong}  `}>
                                        Giá khóa học đang ở mức ưu đãi lên tới trên {course.discount_price_course} %, đây sẽ là đợt giảm giá sâu duy nhất trong toàn bộ vòng đời khóa học!!
                                    </p>

                                </div>

                                <div className={stylesP.Paymain}>
                                    <div className={stylesP.tablePrice}>
                                        <div className={stylesP.priceControlTitle}>
                                            <h6 className={stylesP.titlePrice}>Giá bán</h6>
                                            <h6 className={stylesP.titlePrice}>Đã là học viên khóa khác</h6>
                                            <h6 className={stylesP.titlePrice}>Giảm giá</h6>
                                        </div>
                                        <div className={stylesP.priceControl}>
                                            <span className={stylesP.priceMain}>{formattedPrice}</span>
                                            <span className={stylesP.priceMain}>- {formattedcostDise}</span>
                                            <span className={stylesP.priceMain}>- {formattedTaxRate}</span>
                                        </div>

                                    </div>
                                    <div className={stylesP.priceControlTotal}>
                                        <h6 className={stylesP.priceMain}>Tổng tiền</h6>
                                        <p className={stylesP.priceMain}>{formattedTotal}</p>
                                    </div>
                                </div>

                                <button className={stylesP.btnTotal} onClick={fetchPayMentVn} name='redirect'>Thanh toán ngay bằng VNPAY</button>
                                <button className={stylesP.btnTotal} onClick={fetchPayMentMomo} name='payUrl'>Thanh toán ngay bằng momo</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section >
            <section className={`${styles.FAQ}`} data-aos="fade-up">
                <Container className={`${styles.container} ${styles.containerFeedback}`}>
                    <Row className={`${styles.row} ${styles.rowHeading}  `}>
                        <h3 className={styles.titleWhy}>Câu hỏi thường gặp </h3>
                    </Row>
                    <Row className={`${styles.row} ${styles.rowFaq}`}>
                        <Col md="12">
                            <p className={styles.faqCata}>Đối tượng tham gia</p>

                            {Array.isArray(faqs) ? (faqs.map((faq, index) => (
                                <div key={index} className={styles.faqItem}>
                                    <div className={styles.faqItemWhat} onClick={() => toggleContent(index)}>
                                        <Image
                                            className={styles.imageMap}
                                            src={openIndex === index ? "/img/iconadd2.svg" : "/img/iconadd.svg"}
                                            alt="Khóa học trực tuyến tto.sh"
                                            width={32}
                                            height={32}
                                        />
                                        <p className={styles.faqTitle}>{faq.question_faq} ?</p>
                                    </div>
                                    {openIndex === index && (
                                        <p className={styles.faqContent}>
                                            {faq.answer_faq}
                                        </p>
                                    )}
                                </div>
                            ))) : ("")}

                        </Col>
                    </Row>
                </Container>
            </section >
            <RegisterSale />
        </>
    );
};

export default Payment;
