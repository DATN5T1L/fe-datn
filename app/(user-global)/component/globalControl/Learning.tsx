"use client"
import VideoPlayer from "../videoPlayer"

import { useState } from "react";

import styles from "@public/styles/globalControl/Learning.module.css";
import Button from "../globalControl/btnComponent";

interface courseidProp {
    courseId: number;
}
interface ListItem {
    title: string;
    content: string[];
}
const listData: ListItem[] = [
    {
        title: 'Mục 1',
        content: ['Phần tử 1', 'Phần tử 2', 'Phần tử 3'],
    },
    {
        title: 'Mục 2',
        content: ['Phần tử A', 'Phần tử B', 'Phần tử C'],
    },
    {
        title: 'Mục 3',
        content: ['Phần tử X', 'Phần tử Y', 'Phần tử Z'],
    },
];
const Learning: React.FC<courseidProp> = ({ courseId }) => {


    const [isVisible, setIsVisible] = useState(true);
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);



    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };


    const toggleItem = (index: number) => {
        if (openIndexes.includes(index)) {
            setOpenIndexes(openIndexes.filter((i) => i !== index));
        } else {
            setOpenIndexes([...openIndexes, index]);
        }
    };
    return (
        <div className={styles.container}>
            <div className={`${styles.row}`}>
                {/* Video */}

                <div className={`${styles.flexGrow} ${styles.videoContainer} flex-grow-1`} >
                    <div className={`${styles.Video}`}>
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/tTQNbiaQ1-s?si=qFajN9dLQ_U4XpPJ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                    </div>
                    <div className={styles.body}>
                        <div className={`${styles.bodyTop}`}>
                            <div className={styles.bodyTitle}>
                                <span className={styles.timeUpdate}>Cập nhật ngày 23 tháng 10 năm 2024</span>
                                <h4 className={styles.titleCourse}>HTML CSS là gì</h4>
                            </div>
                            <Button type="premary" status="hover" size="S" leftIcon={true} rightIcon={false} height={40}>Thêm ghi chú</Button>
                        </div>
                        <div className={`${styles.bodyContent}`}>
                            <p className={styles.content}>HTML CSS (HyperText Markup Language Cascading Style Sheets) Nội dung bổ sung: https://www.w3schools.com/css/css_pseudo_classes.asp</p>
                        </div>
                    </div>
                </div>
                {/* danh sách bài học của khóa học */}
                {isVisible && (
                    <div className={`${styles.fixed}  ${styles.listCourse} flex-shrink-0`}>
                        {listData.map((item, index) => (
                            <div key={index} className={styles.listItem}>

                                <div className={styles.listTitle} onClick={() => toggleItem(index)}>
                                    {item.title}
                                </div>


                                {openIndexes.includes(index) && (
                                    <ul className={styles.subList}>
                                        {item.content.map((subItem, subIndex) => (
                                            <li key={subIndex}>{subItem}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={`${styles.actionBar}`}>
                <div className={styles.faq}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                        <circle cx="25.0003" cy="25" r="20.8333" stroke="#237DF7" stroke-width="1.5" />
                        <path d="M21.0938 18.4896C21.0938 16.3322 22.8426 14.5833 25 14.5833C27.1574 14.5833 28.9062 16.3322 28.9062 18.4896C28.9062 19.9218 28.1355 21.1739 26.9862 21.8539C25.9959 22.4398 25 23.3286 25 24.4792V27.0833" stroke="#237DF7" stroke-width="1.5" stroke-linecap="round" />
                        <circle cx="25.0003" cy="33.3333" r="2.08333" fill="#237DF7" />
                    </svg>
                </div>
                <div className={styles.ctaNextPev}>
                    <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={true} height={40}>Bài trước</Button>
                    <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={true} height={40}>Bài tiếp theo</Button>
                </div>

                <div className={styles.cateSec}>
                    <span>Chương 1: Bắt dầu</span>
                    <div className={styles.iconCatesec} onClick={toggleVisibility}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.3892 0.803629C21.3558 1.46469 22 2.64499 22 4.0329V17.9671C22 19.355 21.3558 20.5353 20.3892 21.1964C19.4104 21.8658 18.1152 21.9826 16.9723 21.2446L6.18329 14.2775C5.03297 13.5346 4.5 12.2341 4.5 11C4.5 9.76587 5.03297 8.46536 6.18329 7.72253L16.9723 0.755426C18.1152 0.0173917 19.4104 0.134203 20.3892 0.803629ZM19.5424 2.04175C19.0199 1.6844 18.3798 1.63211 17.786 2.01553L6.99702 8.98263C6.36047 9.39369 6 10.1637 6 11C6 11.8363 6.36047 12.6063 6.99701 13.0174L17.786 19.9845C18.3798 20.3679 19.0199 20.3156 19.5424 19.9583C20.0771 19.5926 20.5 18.8884 20.5 17.9671V4.0329C20.5 3.11159 20.0771 2.40745 19.5424 2.04175ZM1.25 3.25C1.66421 3.25 2 3.58579 2 4V18C2 18.4142 1.66421 18.75 1.25 18.75C0.835786 18.75 0.5 18.4142 0.5 18V4C0.5 3.58579 0.835786 3.25 1.25 3.25Z" fill="#237DF7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Learning;