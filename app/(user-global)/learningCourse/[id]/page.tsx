"use client"
import Learning from "../../component/globalControl/Learning";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


const LearningCourse: React.FC<{ params: { id: number } }> = ({ params }) => {
    const { id } = params;
    const userState = useSelector((state: RootState) => state.user);

    return (

        <Learning
            courseId={id}
            user_id={userState?.user?.id ?? 0}
        />

    );
};

export default LearningCourse;