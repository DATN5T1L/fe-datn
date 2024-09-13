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
                <LearningPathSection title='Front-end' img='/img/learningPathFE.png'/>
                <ForWhom></ForWhom>
                <TimeLine title="FONT-END"></TimeLine>
                <LearningPathSection title='Back-end' img='/img/learningPathBE.png'/>
                <ForWhom></ForWhom>
                <TimeLine title="BACK-END"></TimeLine>
            </Container>
        </>
    )
}

export default MainLearningPath;