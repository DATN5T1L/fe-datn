import Body from "../component/globalControl/body"
import FeedBack from "../component/globalControl/FeedBack"
import CategoriesLearningPath from "../component/router/categoriesLearningPath"
import ForWhom from "../component/router/forWhom"
import HeaderLearning from "../component/router/headerLearning"
import LearningPathSection from "../component/router/learningPathSection"
import TimeLine from "../component/router/timeLine"


const LearningPath__BE: React.FC = () => {
    return (
        <>
            <title>TTO - Lộ trình Back-End</title>
            <meta name="description" content="Được tạo bởi Taem TTO" />
            <Body>
                <HeaderLearning></HeaderLearning>
                <CategoriesLearningPath></CategoriesLearningPath>
                <ForWhom
                    title1="Sinh viên công nghệ thông tin mới bắt đầu:"
                    title2="Người chuyển ngành sang lập trình Back-End:"
                    title3="Chuyên viên Back-End đã có kinh nghiệm:"
                    content1="Hiểu và nắm chắc các kiến thức nền tản về lập trình back-end để 
                    có thể tham gia vào các khóa học nâng cao củng như thực hiện các dự án nhỏ lẻ."
                    content2="Tập trung vào việc học các công cụ, ngôn ngữ lập trình và framework về back-end,
                     từ đó có thể thay đổi sự nghiệp và làm việc môi trường công ty công nghệ."
                    content3="Phát triển thêm các kỹ năng chuyên sâu để đảm nhận vai
                     trò leader hoặc thực hiện các dự án quy mô lớn, phức tạp hơn."
                ></ForWhom>
                <TimeLine
                    title="BACK-END"
                    name1="Intoduction to Programming"
                    name2="Node JS"
                    name3="PHP"
                    name4="MySQL"
                    name5="RESTful APIs"
                ></TimeLine>
                <LearningPathSection
                    title='Backend'
                    contentTitle='Lập trình back-end luôn là một nghề hấp dẫn ở bất kỳ thời điểm nào.
                     Bạn thử Google từ khóa "Tuyển dụng Lập trình Back-End" sẽ thấy ngay các nhà tuyển
                      dụng đang săn đón với mức lương cực kỳ hấp dẫn. Nếu bạn đam mê phát triển hệ thống,
                       xây dựng những nền tảng vững chắc cho các ứng dụng, thì việc còn lại là rèn luyện kỹ
                        năng lập trình back-end.
                     Hãy để khóa học này dẫn đường bạn nhé!'
                    contentSkill='Sau khi hoàn thành lộ trình học này,
                     bạn sẽ có khả năng xây dựng các hệ thống server mạnh mẽ và hiệu quả,
                      từ việc quản lý cơ sở dữ liệu đến phát triển các API phức tạp,
                     cùng với khả năng tối ưu hóa hiệu suất và bảo mật cho ứng dụng.'
                    imgLearningPath='/img/learningPathBE.svg'
                    webImg="/img/webBE.svg"
                    icon1="/img/phpIcon.svg"
                    icon2="/img/nodejsIcon.svg"
                    icon3="/img/jsIcon.svg"
                    icon4="/img/reactIcon.svg"
                    icon5="/img/adobeIcon.svg"
                    content1="Thiết kế và quản lý cơ sở dữ liệu"
                    content2="Tạo và xây dựng các API Restful với PHP"
                    content3="Quản lý tương tác dữ liệu giữa server và client"
                    content4="Phát triển các ứng dụng web động với logic server"
                    content5="Tối ưu hóa hiệu suất và bảo mật hệ thống"
                />
                <FeedBack></FeedBack>
            </Body>
        </>
    )
}

export default LearningPath__BE