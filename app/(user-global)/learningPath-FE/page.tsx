import Body from "../component/globalControl/body"
import FeedBack from "../component/globalControl/FeedBack"
import CategoriesLearningPath from "../component/router/categoriesLearningPath"
import ForWhom from "../component/router/forWhom"
import HeaderLearning from "../component/router/headerLearning"
import LearningPathSection from "../component/router/learningPathSection"
import TimeLine from "../component/router/timeLine"


const LearningPath__FE: React.FC = () => {
    return (
        <>
            <title>TTO - Lộ trình Front-End</title>
            <meta name="description" content="Được tạo bởi Taem TTO" />
            <Body>
                <HeaderLearning></HeaderLearning>
                <CategoriesLearningPath></CategoriesLearningPath>
                <ForWhom
                    title1="Sinh viên công nghệ thông tin mới bắt đầu:"
                    title2="Người chuyển ngành sang lập trình Front-end:"
                    title3="Chuyên viên front-end đã có kinh nghiệm:"
                    content1="Nắm vững nền tảng cơ bản về phát triển web để có thể tham
                     gia các khóa học chuyên sâu và dự án nhỏ."
                    content2="Học các công cụ và framework front-end để chuyển đổi sự nghiệp
                     và làm việc trong môi trường công ty công nghệ."
                    content3="Nâng cao kỹ năng để trở thành leader hoặc phát triển những sản phẩm lớn, phức tạp."
                ></ForWhom>
                <TimeLine
                    title="FRONT-END"
                    name1="HTML&CSS"
                    name2="JAVASCRIPT"
                    name3="REPONSIVE WEB"
                    name4="REACTJS"
                    name5="UI/UX DESIGN"
                ></TimeLine>
                <LearningPathSection
                    title='Frontend'
                    contentTitle='Thiết kế web luôn là một nghề hấp dẫn bất kì thời điểm nào,
                    bạn thử Google từ khoá "Tuyển dụng Lập trình Front End" 
                    sẽ thấy ngay các nhà tuyển dụng đang săn đón với mức lương cực hấp dẫn. 
                    Nếu bạn đam mê thiết kế web, bạn có những ý tưởng giao diện bá đạo, 
                    việc còn lại là kỹ năng lập trình Front-End hãy để khoá học này dẫn đường bạn nhé.'
                    contentSkill='Sau khi hoàn thành lộ trình học này,
                     bạn sẽ có khả năng tạo ra các trang web hiện đại và tương tác,
                      từ thiết kế cơ bản đến ứng dụng React.js phức tạp,
                     cùng với kỹ năng UI/UX để tối ưu trải nghiệm người dùng.'
                    imgLearningPath='/img/learningPathFE.svg'
                    webImg="/img/webFE.svg"
                    icon1="/img/htmlIcon.svg"
                    icon2="/img/cssIcon.svg"
                    icon3="/img/jsIcon.svg"
                    icon4="/img/reactIcon.svg"
                    icon5="/img/figmaIcon.svg"
                    content1="Tạo cấu trúc cho website"
                    content2="Tương thích nhiều thiết bị"
                    content3="Tạo tương tác cho website"
                    content4=" Xây dựng ứng dụng website động"
                    content5="Thiết kế giao diện website"
                />
                <FeedBack />
            </Body>
        </>
    )
}

export default LearningPath__FE