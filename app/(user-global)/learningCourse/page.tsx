import NavCourse from "../component/globalControl/navCourse";
import Learning from "../component/globalControl/Learning";
import { Course } from "@app/(user-global)/model/course";

interface courseidProp {
    id: number;
}

const LearningCourse: React.FC<courseidProp> = ({ id }) => {
    return (
        <>
            <NavCourse userId={1} courseId={id} />
            <Learning courseId={id} />
        </>
    );
};

export default LearningCourse;