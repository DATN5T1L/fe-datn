import { useEffect, useRef, useState } from 'react';
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import Button from "../globalControl/btnComponent";
import styleFor from "@public/styles/course/coursefor.module.css";
import useCookie from '@app/(user-global)/component/hook/useCookie';
import { Course } from "@app/(user-global)/model/course";
import CourseCard from "../course/CardCourseProgress";
import ReactLoading from 'react-loading';
import useSWR from 'swr';
interface CourseCardProps extends Course {
    progress_percentage: number;
    watchedVideos: number;
    status_course_enrollment: string;
}
interface ApiResponseCourse<T> {
    data: T[];
}
interface CourseForProps {
    onCoursesLoad: (ids: string[]) => void;
}

const CourseFor: React.FC<CourseForProps> = ({ onCoursesLoad }) => {
    const token = useCookie("token");
    const [courses, setCourses] = useState<CourseCardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const previousCourses = useRef<string[]>([]);
    const [type, setType] = useState<string>("all");
    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/CourseForYou/${type}`, {
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
            console.log(data.data)
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
    }, [token, type]);

    const handlePathChange = (path: string) => {
        setType(path);
    };
    // Xử lý danh sách course IDs
    useEffect(() => {
        if (courses) {
            const courseIds = courses.map((course) => course.id);
            if (courseIds.length > 0 && JSON.stringify(courseIds) !== JSON.stringify(previousCourses.current)) {
                onCoursesLoad(courseIds);
                previousCourses.current = courseIds;
            }
        }
    }, [courses, onCoursesLoad]);


    return (
        <Container className={styleFor.container}>
            <section className={styleFor.main}>
                <h2 className={styleFor.main__title} aria-hidden={true}>Khóa học của bạn</h2>
                <p className={styleFor.main__subTitle}>
                    Khóa học của bạn là khóa học mà bạn đang học, bao gồm các khóa học mà bạn đã mua hoặc các khóa học miễn phí.
                </p>
            </section>
            <section className={styleFor.cta}>
                <div className={styleFor.ctaLeft}>
                    <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} height={40} onClick={() => handlePathChange("pro")}>Khóa học có phí</Button>
                    <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} height={40} onClick={() => handlePathChange("free")}>Khóa học miễn phí</Button>
                </div>
                <Button type="secondery" status="hover" size="S" leftIcon={false} rightIcon={true} chevron={4} width={145} height={40} onClick={() => handlePathChange("all")}>Xem tất cả</Button>
            </section>
            {loading && (
                <ReactLoading type={"spin"} color={'rgba(7, 85, 192, 1)'} height={'32px'} width={'32px'} className={styleFor.align} />
            )}
            <Row className={styleFor.mainCard}>

                {courses && courses.map((course, index) => (
                    <CourseCard course={course} key={index} showProgress={true} />
                ))}
            </Row>
        </Container>
    );
};

export default CourseFor;
