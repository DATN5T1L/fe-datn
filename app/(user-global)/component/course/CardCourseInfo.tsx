import Link from 'next/link';
import { Col, Image } from 'react-bootstrap';
import styles from '@public/styles/user-component/Introduce.module.css'
import { getInitials } from '../globalControl/commonC';
interface CourseCardProps {
    course: {
        id: string;
        name_course: string;
        rating_course: number;
        views_course: number;
        instructor_avatar: string;
        instructor_name: string;
        slug_course: string;
        discription_course: string;
    };
    onCourseClick?: (course: any) => void;
}

const CourseCardInfo: React.FC<CourseCardProps> = ({ course, onCourseClick }) => {
    const handleCourseClick = () => {
        if (onCourseClick) onCourseClick(course);
    };
    console.log(course)

    return (
        <Col xs={12} className={styles.main__box__container__left}>
            <div className={styles.main__box}>
                <Link href={`course/${course.slug_course}`} className={styles.card__header}>
                    <h4 className={styles.text__hedding2}>
                        {course.name_course}
                    </h4>
                    <h6 className={styles.text__hedding3}>
                        by {getInitials(course.instructor_name)}
                    </h6>
                    <Image src="/img/iconReact.svg" alt="Học phí ưu đãi TTO.SH" className={styles.text__img} />
                    <Image src="https://res.cloudinary.com/dnmc89c8b/image/upload/v1734067691/fe_image/hinhgau2.png" alt="Học với chuyên gia tto.sh" className={styles.headerContent__avt} />
                </Link>
                <div className={styles.card__body}>
                    <h4 className={styles.card__body__title}>{course.name_course}</h4>
                    <p className={styles.card__body__text}>
                        {course.discription_course}
                    </p>
                </div>
            </div>
        </Col>
    );
};

export default CourseCardInfo;
