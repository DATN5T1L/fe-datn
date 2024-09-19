import BodyContainer from "../component/bodyContainer";
import CourseForm from "../component/course/courseToTakeForm";
import MainCourse from "../component/course/mainCourse";
import MyCourseForm from "../component/course/myCourseForm";
import LeftSlideBar from "../component/leftSlideBar";

const Course: React.FC = () => {
    return(
        <>
            <BodyContainer gap="0" justifyContent="space-between">
                <LeftSlideBar></LeftSlideBar>
                <MainCourse></MainCourse>
            </BodyContainer>
        </>
    )
}

export default Course