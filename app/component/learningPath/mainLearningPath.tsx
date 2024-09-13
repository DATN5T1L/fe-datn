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
                <LearningPathSection />
                <ForWhom></ForWhom>
                <TimeLine></TimeLine>
            </Container>
        </>
    )
}

export default MainLearningPath;