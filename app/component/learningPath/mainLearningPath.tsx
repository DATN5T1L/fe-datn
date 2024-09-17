'use client'

import { Container } from "react-bootstrap";
import styles from '@public/styles/learningPath/MainLearningPath.module.css'
import CategoriesLearningPath from "./categoriesLearningPath";
import LearningPathSection from "./learningPathSection";
import ForWhom from "./forWhom";
import TimeLine from "./timeLine";

const MainLearningPath: React.FC = () => {
    return (
        <>
            <Container className={styles.MainLearningPath}>
                <CategoriesLearningPath />
                <LearningPathSection title='Frontend' img='/img/learningPathFE.svg'/>
                <ForWhom></ForWhom>
                <TimeLine title="FONT-END"></TimeLine>
                <LearningPathSection title='Backend' img='/img/learningPathBE.svg'/>
                <ForWhom></ForWhom>
                <TimeLine title="BACK-END"></TimeLine>
            </Container>
        </>
    )
}

export default MainLearningPath;