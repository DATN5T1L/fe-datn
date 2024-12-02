"use client";
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useCookie from "@app/(user-global)/component/hook/useCookie"
import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import 'aos/dist/aos.css';
import AOS from 'aos';
import { Course } from "@/app/(user-global)/model/course";
import { User } from "@/app/(user-global)/model/user";
import styles from "@public/styles/course/coursedetail.module.css";

import Link from "next/link"
import Image from 'next/image';
import Button from "@app/(user-global)/component/globalControl/btnComponent";
import Body from '../../component/globalControl/body';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface ChapterData {
    name_chapters: string[];
}

interface FeedbackData {
    course_id: string;
    user_id: string;
    fullname: string;
    avatar: string;
    rating_course: number;
    feedback_text: string;
}

interface FaqCourse {
    question_faq: string;
    answer_faq: string;
}

interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}


const CourseDetail: React.FC<{ params: { id: string } }> = ({ params }) => {
    const router = useRouter();
    const token = useCookie('token')
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isGetCourse, setIsGetCourse] = useState<boolean | null>(null)

    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, []);

    useEffect(() => {
        console.log(id);
        if (token) {
            fetch(`/api/checkEnrollment/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(res => res.json())
                .then(data => {
                    console.log('dữ liệu trả về:', data)
                    setIsGetCourse(data.is_enrolled)
                })
                .catch(error => console.log(error))
        }
    }, [token])

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleContent = (index: number) => {
        setOpenIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const { id } = params;


    const { data: courseData, error: courseError } = useSWR<ApiResponse<Course>>(
        `/api/courseDetail/${id}`,
        fetcher
    );

    const { data: faqData, error: faqError } = useSWR<ApiResponse<FaqCourse[]>>(
        `/api/getFaqCourse/${id}/10`,
        fetcher
    );

    const { data: chapterData, error: chapterError } = useSWR<ApiResponse<ChapterData>>(
        `/api/getNameChapterCourse/${id}`,
        fetcher
    );



    const { data: feedbackData, error: feedbackError } = useSWR<ApiResponse<FeedbackData[]>>(
        `/api/getFeedBackCourse/${id}/4/4/`,
        fetcher
    );


    const instructorId = courseData?.data?.instructor_id;
    const { data: userData, error: userError } = useSWR<ApiResponse<User>>(
        instructorId ? `/api/user/${instructorId}` : null,
        fetcher
    );

    const handleStudy = () => {
        alert('Học bài thật vui')
        router.push(`/learningCourse/${id}`)
    }

    const handleButtonClick = () => {
        if (token) {
            if (course && course.price_course > 0) {
                router.push(`/paymentCourse/${id}`);
            } else if (course && course.price_course === 0) {
                fetch(`/api/userRegisterCourse/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(res => {
                        if (res.ok) {
                            alert('Đã thêm khóa học thành công')
                            setIsGetCourse(true);
                        }
                    })
                    .catch(error => alert('Thêm khóa học thất bại'))
            }
        } else {
            localStorage.setItem('url', pathname)
            router.push('/login')
        }
    };

    const handleButtonClickFree = () => {
        if (token) {
            alert('Bạn đã được học thử')
        } else {
            localStorage.setItem('url', pathname)
            router.push('/login')
        }
    };


    // Handle loading and error states
    if (courseError || chapterError || userError || feedbackError || faqError) return <div>Failed to load data</div>;
    if (!courseData || !userData || !chapterData || !feedbackData || !faqData) return <div>Loading...</div>;

    const chapters = chapterData.data.name_chapters;
    const course = courseData.data;
    const user = userData.data;
    const feedbacks = feedbackData.data;
    const faqs = faqData.data;

    return (
        <Body>
            <section className={`${styles.couserOverview}`}>
                <Container className={`${styles.container} ${styles.hero}`}>
                    <h2 className={`${styles.heading} text-center`}>
                        Cách học <strong className={styles.headingStrong}> {course.name_course}</strong> dễ dàng nhất dành cho người mới bắt đầu!
                    </h2>
                    <p className={styles.headingDesc}>
                        Thực hành qua <strong className={styles.headingStrong}>{course.num_lesson}</strong> dự án thực tế, hơn
                        <strong className={styles.headingStrong}> {course.num_lesson}</strong>
                        bài tập và thử thách thú vị. Chỉ cần mua một lần, học trọn đời. Khóa học được thiết kế và giảng dạy bởi
                        <strong className={styles.headingStrong}> {user.fullname}</strong>.
                    </p>
                    <div className={`${styles.CTA}`}>
                        <Button type="secondery" status="default" size="S" leftIcon={false} rightIcon={false} chevron={4} width={145} height={40} onClick={handleButtonClickFree}>Học thử miễn phí</Button>
                        <Button type="secondery" status="hover" size="S" leftIcon={false} rightIcon={false} chevron={4} width={145} height={40} onClick={isGetCourse ? handleStudy : handleButtonClick}>{isGetCourse ? 'Bắt đầu học' : 'Sở hữu khóa học'}</Button>
                    </div>
                </Container>
            </section>
            <section className={`${styles.Practice}`} data-aos="fade-up">
                <Container className={`${styles.container} ${styles.containerPractice}`}>
                    <Row className={`${styles.row}`}>
                        <Col md={6} className={styles.contentPractice}>
                            <h3 className={styles.titlePractice}>Thực hành qua <strong className={styles.headingStrong}> {course.num_lesson}</strong> dự án thực tế</h3>
                            <p className={styles.titlePraDesc}>Ba dự án trong khóa học không chỉ giúp bạn làm quen với các tính năng quan trọng của Excel, mà còn đưa bạn vào các tình huống thực tiễn để áp dụng kiến thức một cách hiệu quả. </p>
                            <p className={styles.titlePraDesc}>Từ việc quản lý dữ liệu, tính toán    nâng cao đến tạo báo cáo trực quan, mỗi dự án đều mang lại cơ hội để bạn thực hành các kỹ năng thiết yếu trong công việc hàng ngày.</p>

                        </Col>
                        <Col md={6}>
                            <figure className={styles.ImageFinal}>
                                <Image
                                    className={`${styles.cardImage}`}
                                    src="/hinhsanpham"
                                    alt="hình product hoàn thành"
                                    width={324}
                                    height={223}
                                />
                                <Image
                                    className={`${styles.cardImage} ${styles.cardImageOutsite}`}
                                    src="/hinhsanpham"
                                    alt="hình product hoàn thành"
                                    width={324}
                                    height={223}
                                />

                            </figure>
                            <figcaption className={styles.descImageFinal}>Hình ảnh sản phẩm hoàn thành khi học xong khóa học</figcaption>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className={`${styles.intructor}`} data-aos="fade-up">
                <Container className={`${styles.container} ${styles.containerintructor}`}>
                    <Row className={`${styles.row} ${styles.rowIn}`}>
                        <Col md={6} className={styles.contentintructor}>
                            <h3 className={styles.titleintructor}>Khóa học được thiết kế bởi <strong className={styles.headingStrong}> {user.fullname}</strong></h3>
                            <p className={styles.titlePraDesc}>
                                “<strong className={styles.headingStrong}>{user.fullname}</strong> là một chuyên gia <strong className={styles.headingStrong}> {course.name_course}</strong> giàu kinh nghiệm,
                                với phong cách giảng dạy dễ hiểu và thực tế. Anh đã giúp hàng ngàn người nâng cao kỹ
                                năng qua các khóa học kết hợp giữa lý thuyết và bài tập ứng dụng, mang lại hiệu quả cao
                                và dễ dàng áp dụng vào công việc.”</p>
                        </Col>
                        <Col md={6} className={styles.Imageintructor}>
                            <Image
                                className={`${styles.ImgIntructor}`}
                                src={user.avatar}
                                alt="hình product hoàn thành"
                                width={552}
                                height={467}
                            />
                            <figcaption className={styles.descImageIn}>Tai Huynh is CEO - Founder of TTO Programming Learning Community. Currently, he is still a Fullstack developer with more than 10 years of practical work experience.</figcaption>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className={`${styles.whyTTO}`} data-aos="fade-up">
                <Container className={`${styles.container} ${styles.containerWhytto}`}>
                    <Row className={`${styles.row} ${styles.rowHeading}  `}>
                        <h3 className={styles.titleWhy}>TẠI SAO BẠN NÊN HỌC MOS TẠI TTO?</h3>
                        <p className={styles.descWhy}>Cách học này sẽ giúp bạn thành công trong MOS.</p>
                    </Row>
                    <Row className={`${styles.row} ${styles.rowWhy}`}>
                        <Col md={6} className={styles.contenItem}>
                            <div className={styles.iconWhy}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                    <g clipPath="url(#clip0_3776_5975)">
                                        <path d="M1.37695 25.623L18.1627 8.83727M21.8928 5.10711L23.7579 3.24203M17.2301 4.17457V1.37695M22.8254 9.76981H25.623M20.9603 13.5L22.8254 15.365M11.6349 4.17457L13.5 6.03965" stroke="white" strokeWidth="4.14286" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_3776_5975">
                                            <rect width="26.1111" height="26.1111" fill="white" transform="translate(0.444336 0.444458)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div className={styles.itemBody}>

                                <p className={styles.itemDesc}>Kiến thức được sắp xếp từ cơ bản tới nâng cao, phù hợp cho dù bạn là người mới bắt đầu. Sơn Đặng có trên 8 năm kinh nghiệm thực tế, những kiến thức anh chia sẻ đều sẽ giúp ích khi bạn đi làm tại doanh nghiệp.</p>
                            </div>

                        </Col>
                        <Col md={6} className={styles.contenItem}>
                            <div className={styles.iconWhy}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                                    <path opacity="0.2" d="M6.17558 24.9233L6.1758 24.9232L6.17257 24.9175C5.72519 24.1306 5.60721 23.1988 5.84436 22.3252C6.08152 21.4517 6.65457 20.7074 7.43845 20.2548C8.22233 19.8023 9.1534 19.6781 10.0285 19.9094C10.9036 20.1408 11.6516 20.7089 12.1094 21.4898L12.1094 21.4898L12.1106 21.4918L15.3942 26.7652L15.5567 27.0262V26.7188V10.5469C15.5567 9.63778 15.9178 8.76593 16.5607 8.1231C17.2035 7.48028 18.0754 7.11914 18.9844 7.11914C19.8935 7.11914 20.7654 7.48028 21.4082 8.1231C22.051 8.76593 22.4122 9.63778 22.4122 10.5469H22.5001H22.588V7.73438C22.588 6.82528 22.9491 5.95343 23.5919 5.3106C24.2347 4.66778 25.1066 4.30664 26.0157 4.30664C26.9248 4.30664 27.7966 4.66778 28.4395 5.3106C29.0823 5.95343 29.4434 6.82528 29.4434 7.73438V13.3594H29.5313H29.6192C29.6192 12.4503 29.9803 11.5784 30.6232 10.9356C31.266 10.2928 32.1378 9.93164 33.0469 9.93164C33.956 9.93164 34.8279 10.2928 35.4707 10.9356C36.1135 11.5784 36.4747 12.4503 36.4747 13.3594V26.7188C36.4747 28.5539 36.1132 30.3711 35.4109 32.0666C34.7086 33.7621 33.6793 35.3026 32.3816 36.6003C31.0839 37.898 29.5434 38.9273 27.8479 39.6296C26.1524 40.3319 24.3352 40.6934 22.5001 40.6934C18.6351 40.6934 15.9899 39.7641 13.5953 37.3392C11.1929 34.9064 9.03907 30.965 6.17558 24.9233Z" fill="white" stroke="white" strokeWidth="0.175781" />
                                    <path d="M33.0472 8.43755C32.3173 8.43652 31.5965 8.59931 30.9379 8.91391V7.73442C30.9383 6.56135 30.5198 5.42668 29.7576 4.5349C28.9955 3.64312 27.9399 3.05287 26.7811 2.87051C25.6223 2.68816 24.4364 2.92569 23.4373 3.5403C22.4381 4.15491 21.6913 5.10619 21.3314 6.2227C20.5819 5.81616 19.7396 5.6113 18.8871 5.62822C18.0346 5.64514 17.2011 5.88324 16.4683 6.31921C15.7355 6.75517 15.1285 7.37403 14.7068 8.11516C14.2851 8.85628 14.0633 9.69424 14.0629 10.5469V21.7969L13.3914 20.7194C12.7392 19.5938 11.6679 18.7723 10.4117 18.4343C9.15555 18.0962 7.81665 18.2693 6.68767 18.9155C5.5587 19.5618 4.73148 20.6287 4.38683 21.8831C4.04218 23.1374 4.20814 24.4772 4.84842 25.6096C7.66092 31.5458 9.93377 35.7557 12.5336 38.3872C15.1597 41.052 18.141 42.1875 22.5004 42.1875C26.6015 42.1829 30.5333 40.5517 33.4333 37.6517C36.3332 34.7518 37.9645 30.8199 37.9691 26.7188V13.3594C37.9691 12.0541 37.4506 10.8022 36.5275 9.87913C35.6045 8.9561 34.3526 8.43755 33.0472 8.43755ZM35.1566 26.7188C35.1529 30.0743 33.8183 33.2913 31.4456 35.664C29.0729 38.0367 25.8559 39.3713 22.5004 39.375C18.9179 39.375 16.6099 38.5172 14.5322 36.4131C12.2066 34.0559 10.0656 30.0586 7.3656 24.3598C7.34978 24.3249 7.33218 24.2909 7.31287 24.2579C7.03315 23.7732 6.9574 23.1974 7.10228 22.6569C7.24716 22.1164 7.60081 21.6556 8.08543 21.3759C8.57004 21.0962 9.14593 21.0205 9.6864 21.1653C10.2269 21.3102 10.6876 21.6639 10.9674 22.1485C10.9745 22.1626 10.9827 22.1761 10.992 22.1889L14.2738 27.4624C14.435 27.7225 14.6767 27.9229 14.9622 28.0333C15.2476 28.1436 15.5613 28.1578 15.8556 28.0737C16.1498 27.9896 16.4086 27.8118 16.5927 27.5672C16.7767 27.3227 16.876 27.0248 16.8754 26.7188V10.5469C16.8754 9.98748 17.0976 9.45095 17.4932 9.05537C17.8888 8.65978 18.4253 8.43755 18.9847 8.43755C19.5442 8.43755 20.0807 8.65978 20.4763 9.05537C20.8719 9.45095 21.0941 9.98748 21.0941 10.5469V21.0938C21.0941 21.4668 21.2423 21.8244 21.506 22.0882C21.7697 22.3519 22.1274 22.5 22.5004 22.5C22.8733 22.5 23.231 22.3519 23.4947 22.0882C23.7585 21.8244 23.9066 21.4668 23.9066 21.0938V7.73442C23.9066 7.17498 24.1289 6.63845 24.5244 6.24287C24.92 5.84728 25.4566 5.62505 26.016 5.62505C26.5754 5.62505 27.112 5.84728 27.5075 6.24287C27.9031 6.63845 28.1254 7.17498 28.1254 7.73442V21.0938C28.1254 21.4668 28.2735 21.8244 28.5373 22.0882C28.801 22.3519 29.1587 22.5 29.5316 22.5C29.9046 22.5 30.2623 22.3519 30.526 22.0882C30.7897 21.8244 30.9379 21.4668 30.9379 21.0938V13.3594C30.9379 12.8 31.1601 12.2635 31.5557 11.8679C31.9513 11.4723 32.4878 11.25 33.0472 11.25C33.6067 11.25 34.1432 11.4723 34.5388 11.8679C34.9344 12.2635 35.1566 12.8 35.1566 13.3594V26.7188Z" fill="white" />
                                </svg>
                            </div>
                            <div className={styles.itemBody}>

                                <p className={styles.itemDesc}>Kiến thức được sắp xếp từ cơ bản tới nâng cao, phù hợp cho dù bạn là người mới bắt đầu. Sơn Đặng có trên 8 năm kinh nghiệm thực tế, những kiến thức anh chia sẻ đều sẽ giúp ích khi bạn đi làm tại doanh nghiệp.</p>
                            </div>
                        </Col>
                        <Col md={6} className={styles.contenItem}>
                            <div className={styles.iconWhy}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                    <g clipPath="url(#clip0_3836_23929)">
                                        <path d="M11.8674 16.9189H18.1327L16.0345 20.1322L16.0238 20.1487L16.0289 20.1677L18.1715 28.1364L18.2127 28.2896L18.2562 28.1371L21.4472 16.9556C26.1871 17.169 29.9542 20.5645 29.9542 24.75V27.1875C29.9542 28.7106 28.54 29.9561 26.7843 29.9561H3.21583C1.46008 29.9561 0.0458984 28.7106 0.0458984 27.1875V24.75C0.0458984 20.5645 3.81299 17.169 8.55294 16.9556L11.7439 28.1371L11.7874 28.2896L11.8286 28.1364L13.9712 20.1677L13.9763 20.1487L13.9656 20.1322L11.8674 16.9189ZM23.5264 7.5C23.5264 11.613 19.7152 14.9561 15 14.9561C10.2849 14.9561 6.47365 11.613 6.47365 7.5C6.47365 3.38702 10.2849 0.0439453 15 0.0439453C19.7152 0.0439453 23.5264 3.38702 23.5264 7.5Z" fill="white" stroke="white" strokeWidth="0.0878906" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_3836_23929">
                                            <rect width="30" height="30" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div className={styles.itemBody}>

                                <p className={styles.itemDesc}>Kiến thức được sắp xếp từ cơ bản tới nâng cao, phù hợp cho dù bạn là người mới bắt đầu. Sơn Đặng có trên 8 năm kinh nghiệm thực tế, những kiến thức anh chia sẻ đều sẽ giúp ích khi bạn đi làm tại doanh nghiệp.</p>
                            </div>
                        </Col>
                        <Col md={6} className={styles.contenItem}>
                            <div className={styles.iconWhy}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                    <g clipPath="url(#clip0_3836_23938)">
                                        <path d="M22.0322 3.4375H27.1875V10.3162L26.2978 9.13L25.5479 8.13015L24.7979 9.12989L15.9386 20.9388L12.9385 16.9376L12.1885 15.9374L11.4384 16.9375L6.09469 24.0625L4.45404 21.875L12.1884 11.5614L15.1884 15.5624L15.9383 16.5626L16.6884 15.5625L23.4853 6.5L23.9072 5.9375L23.4853 5.375L22.0322 3.4375ZM21.2777 3.4375H21.2841C21.2819 3.43751 21.2798 3.43749 21.2777 3.43748V3.4375ZM1.875 28.4375H29.0625V29.0625H0.9375V28.4375H1.875Z" fill="white" stroke="white" strokeWidth="1.875" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_3836_23938">
                                            <rect width="30" height="30" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div className={styles.itemBody}>

                                <p className={styles.itemDesc}>Kiến thức được sắp xếp từ cơ bản tới nâng cao, phù hợp cho dù bạn là người mới bắt đầu. Sơn Đặng có trên 8 năm kinh nghiệm thực tế, những kiến thức anh chia sẻ đều sẽ giúp ích khi bạn đi làm tại doanh nghiệp.</p>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </section >
            <section className={`${styles.knowledge}`} data-aos="fade-up">
                <Container className={`${styles.container} ${styles.containerknowledge}`}>
                    <Row className={`${styles.row}`}>
                        <h3 className={styles.titleknowledge}>Kiến thức đầy đủ chi tiết nhất</h3>
                        <p className={styles.descknowledge}>"Với hơn<strong className={styles.headingStrong}>{course.num_lesson}</strong> bài học, bài tập và thử thách, đây sẽ là khóa học đầy đủ và chi tiết nhất mà bạn có thể tìm thấy trên Internet."</p>
                    </Row>

                    <Row className={`${styles.container} ${styles.containerknowledgeList}`}>
                        <ul className={`${styles.row} ${styles.rowknowledge}`}>
                            {chapters.map((chapter, index) => (
                                <li key={index} className={styles.knowledgeItem}>
                                    <p className={styles.titleknowledgeItem}>{index + 1}: {chapter}</p>
                                </li>
                            ))}
                        </ul>
                    </Row>
                    <p className={styles.descknowledgeItalic}>"Chỉ có nội dung điển hình được bao gồm ở đây. <Link href="#!" className={` ${styles.headingStrong}`} style={{ fontStyle: 'italic' }} >Xem nội dung khóa học đầy đủ.</Link> "</p>
                </Container>
            </section >
            <section className={`${styles.Feedback}`}>
                <Container className={`${styles.container} ${styles.containerFeedback}`}>
                    <Row className={`${styles.row} ${styles.rowHeading}  `}>
                        <h3 className={styles.titleWhy}>Mọi người nói gì về khóa học học này ?</h3>
                        <p className={styles.descWhy}>Những phản hồi thực tế nhất về khóa học</p>
                    </Row>
                    <Row className={`${styles.row} ${styles.rowFeedback}`}>
                        {Array.isArray(feedbacks) ? (feedbacks.map((feedback, index) => (
                            <Col md={6} className={styles.FeedbackItem}>
                                <div className={styles.iconFeedback}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="67" viewBox="0 0 90 67" fill="none">
                                        <g clipPath="url(#clip0_3776_2939)">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M33.0938 31.456V30.456H35.1682V32.4235H34.1682V31.456H33.0938ZM34.1682 35.3261H35.1682V37.2612H34.1682V35.3261ZM34.1682 40.1639H35.1682V42.0989H34.1682V40.1639ZM34.1682 45.0016H35.1682V46.9367H34.1682V45.0016ZM34.1682 49.8393H35.1682V51.7744H34.1682V49.8393ZM34.1682 54.677H35.1682V56.6121H34.1682V54.677ZM34.1682 59.5147H35.1682V61.4498H34.1682V59.5147ZM34.1682 64.3524H35.1682V66.32H33.2298V65.32H34.1682V64.3524ZM2.26262 65.32H1.32422V64.3699H0.324219V66.32H2.26262V65.32ZM1.32422 33.018V32.068C1.32422 31.7401 1.32836 31.4146 1.33662 31.0917L0.336949 31.0661C0.328471 31.3977 0.324219 31.7317 0.324219 32.068V33.018H1.32422ZM1.52758 28.1902L0.533332 28.0832C0.605676 27.4115 0.696618 26.7507 0.80589 26.101L1.79204 26.2669C1.68611 26.8967 1.59785 27.5379 1.52758 28.1902ZM2.40926 23.4257L1.44354 23.1661C1.61925 22.5124 1.81516 21.8715 2.03092 21.2437L2.97663 21.5687C2.76838 22.1746 2.57913 22.7937 2.40926 23.4257ZM4.06786 18.8727L3.16274 18.4476C3.45008 17.8358 3.75829 17.2388 4.08689 16.6567L4.95772 17.1483C4.64143 17.7086 4.34466 18.2834 4.06786 18.8727ZM6.52946 14.7008L5.72024 14.1133C6.11544 13.569 6.53077 13.0406 6.96571 12.5283L7.72803 13.1755C7.30939 13.6686 6.90971 14.1771 6.52946 14.7008ZM9.73198 11.0669L9.04636 10.339C9.53291 9.88072 10.0377 9.43861 10.5601 9.01276L11.1919 9.78787C10.6877 10.1989 10.2009 10.6253 9.73198 11.0669ZM13.5382 8.06821L12.9882 7.23301C13.5425 6.86807 14.1124 6.51855 14.6975 6.18452L15.1932 7.05296C14.6262 7.37669 14.0744 7.71515 13.5382 8.06821ZM17.7816 5.7257L17.3645 4.81684C17.9638 4.5418 18.5763 4.28095 19.2015 4.03437L19.5684 4.96464C18.9597 5.20469 18.364 5.45841 17.7816 5.7257ZM22.3119 4.00226L22.0161 3.04702C22.6427 2.85299 23.2802 2.67182 23.9283 2.50359L24.1795 3.47151C23.546 3.63595 22.9234 3.8129 22.3119 4.00226ZM27.0167 2.83267L26.8278 1.85067C27.4692 1.7273 28.1197 1.61556 28.779 1.51549L28.9291 2.50417C28.2825 2.60231 27.6449 2.71184 27.0167 2.83267ZM31.8214 2.14706L31.7257 1.15166C32.3743 1.08927 33.0304 1.03742 33.694 0.99617L33.756 1.99424C33.1035 2.03481 32.4586 2.08577 31.8214 2.14706ZM1.32422 35.8682H0.324219V37.7683H1.32422V35.8682ZM1.32422 40.6185H0.324219V42.5186H1.32422V40.6185ZM1.32422 45.3688H0.324219V47.2689H1.32422V45.3688ZM1.32422 50.1191H0.324219V52.0192H1.32422V50.1191ZM1.32422 54.8693H0.324219V56.7695H1.32422V54.8693ZM1.32422 59.6196H0.324219V61.5197H1.32422V59.6196ZM5.07782 65.32V66.32H6.95462V65.32H5.07782ZM9.76982 65.32V66.32H11.6466V65.32H9.76982ZM14.4618 65.32V66.32H16.3386V65.32H14.4618ZM19.1538 65.32V66.32H21.0306V65.32H19.1538ZM23.8458 65.32V66.32H25.7226V65.32H23.8458ZM28.5378 65.32V66.32H30.4146V65.32H28.5378ZM29.8706 31.456V30.456H27.7218V31.456H29.8706ZM24.4986 31.456V30.456H22.3498V31.456H24.4986ZM19.1266 31.456V30.456H19.0522V30.232C19.0522 29.9199 19.0583 29.6115 19.0707 29.3069L18.0715 29.2665C18.0586 29.585 18.0522 29.9069 18.0522 30.232V31.456H19.1266ZM18.3866 26.3902L19.3698 26.5729C19.4826 25.9657 19.626 25.3789 19.801 24.8135L18.8456 24.5179C18.6586 25.1225 18.5061 25.7472 18.3866 26.3902ZM19.9713 21.8558L20.8461 22.3402C21.1338 21.8206 21.4582 21.3252 21.8209 20.8551L21.0292 20.2442C20.6349 20.7552 20.2829 21.2931 19.9713 21.8558ZM23.0441 18.1737L23.678 18.9471C24.1264 18.5796 24.6124 18.2344 25.1381 17.9132L24.6167 17.0598C24.0528 17.4044 23.5291 17.7762 23.0441 18.1737ZM27.2095 15.7836L27.5739 16.7149C28.1213 16.5007 28.7003 16.3058 29.3119 16.1316L29.038 15.1698C28.3973 15.3523 27.7881 15.5572 27.2095 15.7836ZM31.8642 14.5467L32.025 15.5337C32.6187 15.4369 33.2366 15.3562 33.8794 15.2924L33.7806 14.2973C33.1181 14.3631 32.4795 14.4464 31.8642 14.5467ZM36.6663 14.1266C36.9849 14.1195 37.3082 14.116 37.6362 14.116V12.892H38.6362V15.116H37.6362C37.3154 15.116 36.9995 15.1194 36.6884 15.1263L36.6663 14.1266ZM37.6362 9.21998H38.6362V6.77198H37.6362V9.21998ZM37.6362 3.09998H38.6362V0.875977H37.6362C37.3044 0.875977 36.9742 0.878437 36.6456 0.883354L36.6605 1.87598H36.6362V1.88361C36.6443 1.88349 36.6525 1.88336 36.6606 1.88324C36.8187 1.88087 36.9773 1.87909 37.1362 1.87788C37.3025 1.87661 37.4691 1.87598 37.6362 1.87598V3.09998ZM84.1074 31.456V30.456H86.1682V32.4235H85.1682V31.456H84.1074ZM85.1682 35.3261H86.1682V37.2612H85.1682V35.3261ZM85.1682 40.1639H86.1682V42.0989H85.1682V40.1639ZM85.1682 45.0016H86.1682V46.9367H85.1682V45.0016ZM85.1682 49.8393H86.1682V51.7744H85.1682V49.8393ZM85.1682 54.677H86.1682V56.6121H85.1682V54.677ZM85.1682 59.5147H86.1682V61.4498H85.1682V59.5147ZM85.1682 64.3524H86.1682V66.32H84.2298V65.32H85.1682V64.3524ZM53.2626 65.32H52.3242V64.3699H51.3242V66.32H53.2626V65.32ZM52.3242 33.018V32.068C52.3242 31.7401 52.3284 31.4146 52.3366 31.0917L51.337 31.0661C51.3285 31.3977 51.3242 31.7317 51.3242 32.068V33.018H52.3242ZM52.5276 28.1902L51.5333 28.0832C51.6057 27.4115 51.6966 26.7507 51.8059 26.101L52.792 26.2669C52.6861 26.8967 52.5979 27.5379 52.5276 28.1902ZM53.4093 23.4257L52.4435 23.1661C52.6193 22.5124 52.8152 21.8715 53.0309 21.2437L53.9766 21.5687C53.7684 22.1746 53.5791 22.7937 53.4093 23.4257ZM55.0679 18.8727L54.1627 18.4476C54.4501 17.8358 54.7583 17.2388 55.0869 16.6567L55.9577 17.1483C55.6414 17.7086 55.3447 18.2834 55.0679 18.8727ZM57.5295 14.7008L56.7202 14.1133C57.1154 13.569 57.5308 13.0406 57.9657 12.5283L58.728 13.1755C58.3094 13.6686 57.9097 14.1771 57.5295 14.7008ZM60.732 11.0669L60.0464 10.339C60.5329 9.88072 61.0377 9.43861 61.5601 9.01276L62.1919 9.78787C61.6877 10.1989 61.2009 10.6253 60.732 11.0669ZM64.5382 8.06821L63.9882 7.23301C64.5425 6.86807 65.1124 6.51855 65.6975 6.18452L66.1933 7.05296C65.6262 7.37669 65.0744 7.71515 64.5382 8.06821ZM68.7816 5.7257L68.3645 4.81684C68.9638 4.5418 69.5763 4.28095 70.2015 4.03437L70.5684 4.96464C69.9597 5.20469 69.364 5.45841 68.7816 5.7257ZM73.3119 4.00226L73.0161 3.04702C73.6427 2.85299 74.2802 2.67182 74.9283 2.50359L75.1795 3.47151C74.546 3.63595 73.9234 3.8129 73.3119 4.00226ZM78.0167 2.83267L77.8278 1.85067C78.4692 1.7273 79.1197 1.61556 79.779 1.51549L79.9291 2.50417C79.2825 2.60231 78.6449 2.71184 78.0167 2.83267ZM82.8214 2.14706L82.7257 1.15166C83.3743 1.08927 84.0304 1.03742 84.694 0.99617L84.756 1.99424C84.1035 2.03481 83.4586 2.08577 82.8214 2.14706ZM52.3242 35.8682H51.3242V37.7683H52.3242V35.8682ZM52.3242 40.6185H51.3242V42.5186H52.3242V40.6185ZM52.3242 45.3688H51.3242V47.2689H52.3242V45.3688ZM52.3242 50.1191H51.3242V52.0192H52.3242V50.1191ZM52.3242 54.8693H51.3242V56.7695H52.3242V54.8693ZM52.3242 59.6196H51.3242V61.5197H52.3242V59.6196ZM56.0778 65.32V66.32H57.9546V65.32H56.0778ZM60.7698 65.32V66.32H62.6466V65.32H60.7698ZM65.4618 65.32V66.32H67.3386V65.32H65.4618ZM70.1538 65.32V66.32H72.0306V65.32H70.1538ZM74.8458 65.32V66.32H76.7226V65.32H74.8458ZM79.5378 65.32V66.32H81.4146V65.32H79.5378ZM80.925 31.456V30.456H78.8034V31.456H80.925ZM75.621 31.456V30.456H73.4994V31.456H75.621ZM70.317 31.456V30.456H70.2562V30.232C70.2562 29.9209 70.2621 29.6135 70.2738 29.3098L69.2746 29.271C69.2623 29.5881 69.2562 29.9085 69.2562 30.232V31.456H70.317ZM69.5764 26.4068L70.5607 26.583C70.6693 25.9768 70.8074 25.3908 70.9763 24.8263L70.0183 24.5397C69.8379 25.1427 69.6911 25.7657 69.5764 26.4068ZM71.11 21.8782L71.9904 22.3523C72.271 21.8313 72.5878 21.3348 72.9427 20.8638L72.144 20.262C71.7579 20.7745 71.4139 21.3139 71.11 21.8782ZM74.1282 18.1813L74.7686 18.9493C75.211 18.5804 75.6913 18.2339 76.2118 17.9117L75.6853 17.0615C75.1261 17.4077 74.6076 17.7815 74.1282 18.1813ZM78.2604 15.7806L78.6273 16.7108C79.1704 16.4966 79.7456 16.3018 80.3541 16.1276L80.079 15.1662C79.441 15.3488 78.8352 15.5539 78.2604 15.7806ZM82.8912 14.5443L83.0522 15.5312C83.6426 15.4349 84.2575 15.3546 84.8977 15.2911L84.799 14.296C84.139 14.3614 83.5033 14.4444 82.8912 14.5443ZM87.6707 14.1265C87.9877 14.1195 88.3096 14.116 88.6362 14.116V12.892H89.6362V15.116H88.6362C88.3168 15.116 88.0023 15.1194 87.6927 15.1263L87.6707 14.1265ZM88.6362 9.21998H89.6362V6.77198H88.6362V9.21998ZM88.6362 3.09998H89.6362V0.875977H88.6362C88.3044 0.875977 87.9742 0.878437 87.6456 0.883354L87.6605 1.87598H87.6362V1.88361C87.6443 1.88349 87.6525 1.88336 87.6606 1.88324C87.8187 1.88087 87.9773 1.87909 88.1362 1.87788C88.3025 1.87661 88.4691 1.87598 88.6362 1.87598V3.09998Z" fill="url(#paint0_linear_3776_2939)" />
                                        </g>
                                        <defs>
                                            <linearGradient id="paint0_linear_3776_2939" x1="0.324219" y1="0.875977" x2="53.5793" y2="3.6836" gradientUnits="userSpaceOnUse">
                                                <stop />
                                                <stop offset="1" stop-color="#24A148" />
                                            </linearGradient>
                                            <clipPath id="clip0_3776_2939">
                                                <rect width="90" height="67" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div key={index} className={styles.FeedbackBody}>
                                    <p className={styles.FeedbackDesc}>{feedback.feedback_text}</p>
                                    <div className={styles.FeedbackUser}>
                                        <Image
                                            className={`${styles.userFeedback}`}
                                            src={feedback.avatar}
                                            alt="Hình đại diện người dùng"
                                            width={50}
                                            height={50}
                                        />
                                        <div className={styles.FeedbackContent}>
                                            <h4 className={styles.userNameFeedback}>{feedback.fullname}</h4>
                                            <p className={styles.userOfCourse}>Người học khóa {course.name_course}</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))) : ("")}

                    </Row>

                </Container>
            </section >
            <section className={`${styles.Feedback}`} data-aos="fade-up">
                <Container className={`${styles.container} ${styles.containerFeedback}`}>
                    <Row className={`${styles.row} ${styles.rowHeading}  `}>
                        <h3 className={styles.titleWhy}>Bạn có thể học mọi lúc, mọi nơi, trên mọi thiết bị</h3>
                    </Row>
                    <Row className={`${styles.row} ${styles.rowStudy}`}>
                        <Image
                            className={styles.imageMap}
                            src="/img/maper.png"
                            alt="hình product hoàn thành"
                            width={1136}
                            height={491}
                        />
                        <figcaption className={styles.descWhereStudy}>Mạng lưới phân phối nội dung 280+ PoPs tại 33 quốc gia, bạn có thể xem các bài học video tốc độ cao ngay cả khi đang ở nước ngoài.</figcaption>
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
                                            alt="icon toggle"
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
            <section className={`${styles.callHelp}`} >
                <Container className={`${styles.container} ${styles.containerCallHelp}`}>
                    <Row className={`${styles.row} ${styles.rowCallhelp}  `}>
                        <h3 className={styles.titleCallHelp}>Đăng ký tư vấn lộ trình học
                            hoàn toàn miễn phí!</h3>
                        <p className={styles.descCallHelp}>Tư vấn viên sẽ liên hệ và giải đáp mọi thắc mắc của bạn về lộ trình học để trở thành nhà phát triển chuyên nghiệp</p>
                    </Row>

                    <Button type="secondery" status="hover" size="S" leftIcon={false} rightIcon={false} chevron={4} width={145} height={40}>Nhận tư vấn miễn phí</Button>

                </Container>
            </section >
        </Body>
    );
};

export default CourseDetail;
