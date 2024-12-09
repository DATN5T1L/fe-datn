"use client"
import { useEffect, useState } from 'react';
import { Row } from "react-bootstrap";
import style from "@public/styles/course/Reminder.module.css";
import useCookie from '@app/(user-global)/component/hook/useCookie';
import CourseCard from "@app/(user-global)/component/course/CardReminder";
import Body from "@app/(user-global)/component/globalControl/body";

interface ApiResponseCourse {
    message: string;
    data: CourseReminders[];
}



const Reminder: React.FC = () => {
    const token = useCookie("token");
    const [courses, setCourses] = useState<CourseReminders[]>([]);

    const fetchDoc = async () => {
        try {
            const response = await fetch(`/api/reminder`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch course");
            }
            const data = await response.json() as ApiResponseCourse;
            setCourses(data.data);
            console.log(data.data)// Cập nhật courses với dữ liệu từ API
        } catch (err: any) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchDoc(); // Gọi hàm khi component mount
    }, [token]);

    return (
        <Body>
            <div className={style.container}>
                <div className={style.main}>
                    <section>
                        <h2 className={style.main__title} aria-hidden={true}>Nhắc nhở lịch học</h2>
                        <p className={style.main__subTitle}>
                            Lịch học của bạn là danh sách các buổi học mà bạn đã đăng ký, bao gồm các buổi học của các khóa học mà bạn đã mua, đăng ký miễn phí, hoặc được cung cấp.
                        </p>
                    </section>
                    <Row className={style.mainCard}>
                        {courses.map((course, index) => (
                            <CourseCard data={course} token={token} key={index} />
                        ))}
                    </Row>
                </div>
            </div>
        </Body>
    );
};

export default Reminder;
