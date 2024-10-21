import NavCourse from "../component/globalControl/navCourse";
import Learning from "../component/globalControl/Learning";
import { Course } from "@app/(user-global)/model/course";

// interface LearningProp {
//     id: number;
//     userId: number;
// }
// userId={1} courseId={1}
const LearningCourse: React.FC = () => {
    return (
        <>
            <NavCourse />
            <Learning />
        </>
    );
};

export default LearningCourse;