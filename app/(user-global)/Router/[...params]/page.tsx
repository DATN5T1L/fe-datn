'use client'
import { useState, useEffect, useCallback } from "react";
import HeaderLearning from "@app/(user-global)/component/router/headerLearning";
import Body from "../../component/globalControl/body";
import { useParams } from "next/navigation";
import LearningPathSection from "../../component/router/learningPathSection";
import ForWhom from "../../component/router/forWhom";
import TimeLine from "../../component/router/timeLine";
import { formatParamString } from "@app/(user-global)/component/globalControl/commonC";
import CourseForRoute from "../../component/course/courseForRoute";
const Router = () => {
    const params = useParams();
    const [courseIds, setCourseIds] = useState<string[]>([]);

    const handleCoursesLoad = (ids: string[]) => {
        setCourseIds(ids);
    };
    const [slug, name_route, id, discription_route] = params.params;
    const routerData = { name_route, discription_route };
    const [course, setcourse] = useState<Course[]>([]);
    const fetchDataRoute = async (id: string) => {
        try {
            const response = await fetch(`/api/routeClients/${id}`);
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const result = await response.json();
            setcourse(result.data);
        } catch (error: any) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (id)
            fetchDataRoute(id)
    }, [id]);

    const nameCourses = course && course.map(course => course.name_course);
    const imageCourse = course && course.map(course => course.img_course);

    return (
        <Body>
            {routerData && <HeaderLearning data={routerData} />}
            <CourseForRoute onCoursesLoad={handleCoursesLoad} id={id} nameRoute={formatParamString(name_route)} />
            <ForWhom
                title1="Sinh viên công nghệ thông tin mới bắt đầu:"
                title2={`Người chuyển ngành sang lập trình  ${formatParamString(name_route)}`}
                title3={`Chuyên viên ${formatParamString(name_route)} đã có kinh nghiệm`}
                content1={`Hiểu và nắm chắc các kiến thức nền tản về lập trình ${formatParamString(name_route)} để 
                    có thể tham gia vào các khóa học nâng cao củng như thực hiện các dự án nhỏ lẻ.`}
                content2={`Tập trung vào việc học các công cụ, ngôn ngữ lập trình và framework về ${formatParamString(name_route)},
                     từ đó có thể thay đổi sự nghiệp và làm việc môi trường công ty công nghệ.`}
                content3={`Phát triển thêm các kỹ năng chuyên sâu để đảm nhận vai
                     trò leader hoặc thực hiện các dự án quy mô lớn, phức tạp hơn.`}
            ></ForWhom>
            <TimeLine
                title={`${formatParamString(name_route)}`}
                name1={nameCourses[0] || ""}
                name2={nameCourses[1] || ""}
                name3={nameCourses[2] || ""}
                name4={nameCourses[3] || ""}
                name5={nameCourses[4] || "Kiểm thử cơ bản"}
            >
            </TimeLine>
            <LearningPathSection
                title={`${formatParamString(name_route)}`}
                contentTitle={`${formatParamString(name_route)} luôn là một nghề hấp dẫn ở bất kỳ thời điểm nào.
            Bạn thử Google từ khóa "Tuyển dụng ${formatParamString(name_route)}" sẽ thấy ngay các nhà tuyển
            dụng đang săn đón với mức lương cực kỳ hấp dẫn. Nếu bạn đam mê phát triển hệ thống,
            xây dựng những nền tảng vững chắc cho các ứng dụng, thì việc còn lại là rèn luyện kỹ
            năng ${formatParamString(name_route)}.
            Hãy để khóa học này dẫn đường bạn nhé!`}
                contentSkill='Sau khi hoàn thành lộ trình học này,
            bạn sẽ có khả năng xây dựng các hệ thống server mạnh mẽ và hiệu quả,
            từ việc quản lý cơ sở dữ liệu đến phát triển các API phức tạp,
            cùng với khả năng tối ưu hóa hiệu suất và bảo mật cho ứng dụng.'
                imgLearningPath='/img/learningPathBE.svg'
                webImg="/img/webDS.svg"
                icon1={imageCourse[0] || ""}
                icon2={imageCourse[1] || ""}
                icon3={imageCourse[2] || ""}
                icon4={imageCourse[3] || ""}
                icon5={imageCourse[4] || ""}
                content1="Thiết kế và quản lý cơ sở dữ liệu"
                content2="Tạo và xây dựng các API Restful với PHP"
                content3="Quản lý tương tác dữ liệu giữa server và client"
                content4="Phát triển các ứng dụng web động với logic server"
                content5="Tối ưu hóa hiệu suất và bảo mật hệ thống"
            />
        </Body >
    );
};

export default Router;
