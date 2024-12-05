"use client"
import { useEffect, useRef } from 'react'
import { Row } from "react-bootstrap";
import style from "@public/styles/course/Reminder.module.css";
import useSWR from "swr";
import useCookie from '@app/(user-global)/component/hook/useCookie';
import { Course } from "@app/(user-global)/model/course";
import CourseCard from "@app/(user-global)/component/course/CardReminder";
import Body from "@app/(user-global)/component/globalControl/body";

interface CourseCardProps extends Course {
    progress_percentage: number;
}
interface ApiResponseCourse<T> {
    data: T[];
}


const fetcher = (url: string, token: string | null) => {
    return fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`, // Thêm token vào tiêu đề nếu có
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    });
};


const Reminder: React.FC = () => {
    const token = useCookie("token");
    const { data, error } = useSWR<ApiResponseCourse<CourseCardProps>>(
        "/api/courseFor",
        (url) => fetcher(url, token),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    const courses = Array.isArray(data?.data) ? data.data : [];

    return (
        <Body>
            <div className={style.container}>
                <div className={style.main}>
                    <section >
                        <h2 className={style.main__title} aria-hidden={true}>Nhắc nhở lịch học</h2>
                        <p className={style.main__subTitle}>
                            Lịch học của bạn là danh sách các buổi học mà bạn đã đăng ký, bao gồm các buổi học của các khóa học mà bạn đã mua, đăng ký miễn phí, hoặc được cung cấp.
                        </p>
                    </section>
                    <Row className={style.mainCard}>
                        {courses.map((course, index) => (
                            <CourseCard course={course} key={index} showProgress={true} />
                        ))}
                    </Row>
                </div>
            </ div>
        </Body>
    );
};

export default Reminder;
