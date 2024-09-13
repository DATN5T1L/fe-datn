import BodyContainer from '../component/bodyContainer';
import LeftSlideBar from '../component/leftSlideBar';
import MainLearningPath from '../component/learningPath/mainLearningPath';
import { Metadata } from 'next';
import LearningPathSection from '../component/learningPath/learningPathSection';

export const metadata: Metadata = {
    title: "TTO - Lộ trình học tập",
    description: "Được tạo bởi Taem TTO",
};



const LearningPathComponent: React.FC = () => {

    return (
        <>
            <BodyContainer gap={'26px'}>
                <LeftSlideBar></LeftSlideBar>
                <MainLearningPath></MainLearningPath>
            </BodyContainer>
        </>
    );
};

export default LearningPathComponent;