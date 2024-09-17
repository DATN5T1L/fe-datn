import BodyContainer from "../component/bodyContainer";
import CourseForm from "../component/couser/courseToTakeForm";
import MainCourse from "../component/couser/mainCourse";
import MyCourseForm from "../component/couser/myCourseForm";
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