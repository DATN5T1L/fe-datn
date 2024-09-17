'use client'

import styles from '@public/styles/course/MainCourse.module.css'
import { Container } from 'react-bootstrap'
import MyCourseForm from './myCourseForm'
import CourseForm from './courseToTakeForm'

const MainCourse: React.FC = () => {
    return (
        <>
            <Container className={styles.main}>
                <MyCourseForm></MyCourseForm>
                <CourseForm title='Khóa học Pro'></CourseForm>
                <CourseForm title='Khóa miễn phí'></CourseForm>  
            </Container>
        </>
    )
}

export default MainCourse;
