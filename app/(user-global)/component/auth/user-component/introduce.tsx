import styles from '@public/styles/user-component/Introduce.module.css'
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap'
import useCookie from '@app/(user-global)/component/hook/useCookie';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { Course } from "@app/(user-global)/model/course";
import ReactLoading from 'react-loading';
import CourseCardInfo from '../../course/CardCourseInfo';
import { decodeAndFormatDateTime } from '../../globalControl/commonC';

interface CourseCardProp extends Course {
    progress_percentage: number;
    watchedVideos: number;
}
const Introduce: React.FC = () => {
    const token = useCookie("token");
    const userState = useSelector((state: RootState) => state.user);
    const [courses, setCourses] = useState<CourseCardProp[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/CourseForYou/all`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch courses");
            }
            const data = await response.json();
            setCourses(data.data);
            setError(null);
        } catch (err: any) {
            setError(err.message || "Unknown error occurred");
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };
    // Fetch API
    useEffect(() => {
        fetchCourses();
    }, [token]);
    return (
        <Container className={styles.container}>
            <Row className={styles.header__introduce}>
                <Col md={12} className={styles.header__introduce__box}>
                    <section className={styles.title__group}>
                        <h3 className={styles.title__group__heading}>
                            Giới thiệu: {userState.user?.discription_user}
                        </h3>
                        <h3 className={styles.title__group__subTitle}>
                            Ngày gia nhập TTO.SH:<span className={styles.title__group__subTitle__blue}>
                                {userState?.user?.created_at
                                    ? decodeAndFormatDateTime(userState.user.created_at)
                                    : "Chưa xác định"}
                            </span>
                        </h3>
                    </section>
                </Col>
            </Row>
            <Row className={styles.body__introduct}>
                <Col md={12} className={styles.body__introduct__header}>
                    <h3 className={styles.body__introduct__header__title}>Các khóa học đã tham gia</h3>
                </Col>
            </Row>
            <Row className={styles.body__introduct__main}>
                {loading && (
                    <ReactLoading type={"spin"} color={'rgba(7, 85, 192, 1)'} height={'32px'} width={'32px'} className={styles.align} />
                )}
                {courses && courses.map((course, index) => (
                    <CourseCardInfo course={course} key={index} />
                ))}
            </Row>
        </Container>
    )
}

export default Introduce