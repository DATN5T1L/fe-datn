'use client'

import Body from "../component/globalControl/body"
import FeedBack from "../component/globalControl/feedBack"
import CategoriesLearningPath from "../component/globalLearningPath/categoriesLearningPath"
import ForWhom from "../component/globalLearningPath/forWhom"
import HeaderLearning from "../component/globalLearningPath/headerLearning"
import LearningPathSection from "../component/globalLearningPath/learningPathSection"
import TimeLine from "../component/globalLearningPath/timeLine"
import LeftSlider from "../component/globalControl/leftSlider"


const LearningPath__DS: React.FC = () => {
    return (
        <>
            <title>TTO - Lộ trình Designer</title>
            <meta name="description" content="Được tạo bởi Taem TTO" />
            <Body>
                <LeftSlider></LeftSlider>
                <HeaderLearning></HeaderLearning>
                <CategoriesLearningPath></CategoriesLearningPath>
                <ForWhom
                    title1="Sinh viên mới bắt đầu trong lĩnh vực UI/UX:"
                    title2="Người chuyển đổi sang thiết kế UI/UX:"
                    title3="Chuyên viên UI/UX đã có kinh nghiệm:"
                    content1="Xây dựng nền tảng thiết kế cơ bản để có thể theo học
                     các khóa chuyên sâu và thực hiện các dự án thực tế."
                    content2="Nắm bắt các công cụ và phương pháp thiết kế để mở rộng cơ hội nghề nghiệp trong ngành công nghệ."
                    content3="Nâng cao năng lực lãnh đạo và tham gia vào việc phát
                     triển các sản phẩm phức tạp, đòi hỏi sự sáng tạo và chiến lược."
                ></ForWhom>
                <TimeLine
                    title="UI/UX DESIGNER"
                    name1="Introduction to Design"
                    name2="Advanced UI/UX Design"
                    name3="Prototyping with Figma "
                    name4="MySQL"
                    name5="Usability Testing"
                ></TimeLine>
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
                <FeedBack></FeedBack>
            </Body>
        </>
    )
}

export default LearningPath__DS