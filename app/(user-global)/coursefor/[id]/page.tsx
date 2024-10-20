'use client';
import useSWR from 'swr';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Body from "@app/(user-global)/component/globalControl/body";
import CourseFor from "@app/(user-global)/component/course/courseFor";
import CourseForNext from "@app/(user-global)/component/course/CourseForNext";
import TimeLine from "@app/(user-global)/component/router/timeLine";
import LearningPathSection from "@app/(user-global)/component/router/learningPathSection";

// thêm model

import { Course } from "@app/(user-global)/model/course";

interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}
const fetcher = (url: string) => fetch(url).then(res => res.json());

const CourseForYou: React.FC<{ params: { id: number } }> = ({ params }) => {
    const { id } = params;

    const { data: courseData, error: courseError } = useSWR<ApiResponse<Course>>(
        `/api/courseFor/${id}`,
        fetcher
    );
    console.log(courseData);
    return (
        <Body>
            <CourseFor id={id} />
            <CourseForNext id={id} />
            <LearningPathSection
                title='UI/UX Design'
                contentTitle='Thiết kế UI/UX luôn là một lĩnh vực hấp dẫn và thời thượng.
                     Chỉ cần tìm kiếm từ khóa "Tuyển dụng Designer UI/UX," 
                      bạn sẽ ngay lập tức nhận thấy các nhà tuyển dụng đang
                       tích cực tìm kiếm ứng viên với mức lương rất cạnh tranh.
                        Nếu bạn có đam mê với việc tạo ra những giao diện người dùng độc đáo và sáng tạo,
                         thì việc trau dồi kỹ năng thiết kế UI/UX là điều cần thiết.
                     Hãy để khóa học này giúp bạn phát triển và hiện thực hóa những ý tưởng của mình!'
                contentSkill='Sau khi hoàn thành lộ trình học này,
                     bạn sẽ có khả năng tạo ra các sản phẩm thiết kế UI/UX hiện đại và thu hút,
                      từ những giao diện cơ bản cho đến các nguyên mẫu phức tạp,
                     cùng với kỹ năng tối ưu hóa trải nghiệm người dùng.'
                imgLearningPath='/img/learningPathDS.svg'
                webImg="/img/webDS.svg"
                icon1="/img/adobeIcon.svg"
                icon2="/img/figmaIcon.svg"
                icon3="/img/fireBaseIcon.svg"
                icon4="/img/reactIcon.svg"
                icon5="/img/psIcon.svg"
                content1="Nền tảng thiết kế"
                content2="Thiết kế giao diện cơ bản"
                content3="Giao diện phức tạp và trải nghiệm người dùng nâng cao."
                content4="Nguyên mẫu tương tác"
                content5="Đánh giá và cải thiện trải nghiệm người dùng"
            />
            <TimeLine
                title="UI/UX DESIGNER"
                name1="Introduction to Design"
                name2="Advanced UI/UX Design"
                name3="Prototyping with Figma "
                name4="MySQL"
                name5="Usability Testing"
            />
        </Body>
    );
}

export default CourseForYou;
