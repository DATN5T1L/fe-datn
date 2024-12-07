"use client";
import { useState, useEffect } from 'react'
import { Row } from "react-bootstrap";
import style from "@public/styles/home/About.module.css";
import useCookie from "@app/(user-global)/component/hook/useCookie";
import Body from "@app/(user-global)/component/globalControl/body";
import Card from "@app/(user-global)/component/course/CardReminder"

interface Course {
    id: string;
    name_course: string;
    img_course: string;
    discription_course: string;
    status_course: string;
    price_course: number;
    discount_price_course: number | null;
    views_course: number;
    rating_course: number;
    tax_rate: string;
    del_flag: boolean;
    instructor_id: string;
    created_at: string;
    updated_at: string;
    num_chapter: number;
    num_document: number;
    name_documents: string
    progress_percentage: number;
}
interface Reminder {
    id: string;
    day_of_week: string;
    time: string;
    enrollment_id: string;
    del_flag: boolean;
    created_at: string | null;
    updated_at: string | null;
}
interface CourseData {
    course: Course;
    reminders: Reminder[];
}

const Reminder: React.FC = () => {
    const token = useCookie("token");
    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    // Lấy dữ liệu bằng useSWR
    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await fetch("https://tto-production-db77.up.railway.app/api/client/get-reminders-course/", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text(); // Lấy chi tiết lỗi từ API
                throw new Error(errorText || "Failed to fetch courses");
            }

            const data = await response.json();
            if (data) {
                console.log('data: ', data)
                setCourses(data.data);
            }
            setError(null);
        } catch (err: any) {
            setError(err.message || "Unknown error occurred");
            setCourses(null);
        } finally {
            setLoading(false);
        }
    };
    console.log('data clone: ', courses)
    // Lấy danh sách khóa học hoặc để trống
    useEffect(() => {
        fetchCourses();
    }, [token]);

    // useEffect(() => {
    //     if (Array.isArray(courses) && courses.length > 0) {
    //         courses.forEach((item) => {
    //             console.log('data dt', item.course);
    //         });
    //     } else {
    //         console.log("No courses data to display");
    //     }
    // }, [courses]);

    return (
        <Body>
            <div className={style.container}>
                <div className={style.main}>
                    <section>
                        <h2 className={style.main__title} aria-hidden={true}>
                            Nhắc nhở lịch học
                        </h2>
                        <p className={style.main__subTitle}>
                            Lịch học của bạn là danh sách các buổi học mà bạn đã đăng ký, bao gồm các buổi học của các
                            khóa học mà bạn đã mua, đăng ký miễn phí, hoặc được cung cấp.
                        </p>
                    </section>
                    {/* <Row className={style.mainCard}>
                        {loading ? (
                            <p>Đang tải dữ liệu...</p>
                        ) : error ? (
                            <p className="text-danger">{error}</p>
                        ) : courses && courses?.length === 0 ? (
                            <p>Không có khóa học nào.</p>
                        ) : (courses?.map((course, index) => (
                            <Card course={course.course} reminders={course.reminders} key={index} />
                        ))
                        )}
                    </Row> */}
                </div>
            </div>
        </Body>
    );
};

export default Reminder;