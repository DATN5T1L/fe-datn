// import NavCourse from "../component/globalControl/navCourse";
import Learning from "../component/globalControl/Learning";
import { Course } from "@app/(user-global)/model/course";

// interface LearningProp {
//     id: number;
//     userId: number;
// }

const LearningCourse: React.FC = () => {
    return (
        <>
            {/* <NavCourse userId={1} courseId={1} /> */}
            <Learning courseId={1} />
        </>
    );
};

export default LearningCourse;