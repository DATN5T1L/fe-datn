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
    content: { name: string, duration: string, status: boolean, type: string }[];  // Thêm trường 'duration'
}
const listData: ListItem[] = [
    {
        title: 'Bắt đầu',
        content: [
            { name: 'Phần tử 1', duration: '10.22', status: true, type: "video" },
            { name: 'Phần tử 2', duration: '15.22', status: true, type: "code" },
            { name: 'Phần tử 3', duration: '12.22', status: true, type: "video" },
        ],
    },
    {
        title: 'Tiếp theo',
        content: [
            { name: 'Phần tử A', duration: '8.22', status: false, type: "video" },
            { name: 'Phần tử B', duration: '20.22', status: false, type: "video" },
            { name: 'Phần tử C', duration: '18.22', status: false, type: "code" },
        ],
    },
    {
        title: 'Thêm nữa',
        content: [
            { name: 'Phần tử X', duration: '30.22', status: false, type: "video" },
            { name: 'Phần tử Y', duration: '25.22', status: false, type: "video" },
            { name: 'Phần tử Z', duration: '12.22', status: false, type: "code" },
        ],
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
                {isVisible && (
                    <div className={`${styles.fixed}  ${styles.listCourse} flex-shrink-0`}>
                        <div className={styles.searchContainer}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 2.75C6.66751 2.75 2.75 6.66751 2.75 11.5C2.75 16.3325 6.66751 20.25 11.5 20.25C16.3325 20.25 20.25 16.3325 20.25 11.5C20.25 6.66751 16.3325 2.75 11.5 2.75ZM1.25 11.5C1.25 5.83908 5.83908 1.25 11.5 1.25C17.1609 1.25 21.75 5.83908 21.75 11.5C21.75 14.0605 20.8111 16.4017 19.2589 18.1982L22.5303 21.4697C22.8232 21.7626 22.8232 22.2374 22.5303 22.5303C22.2374 22.8232 21.7626 22.8232 21.4697 22.5303L18.1982 19.2589C16.4017 20.8111 14.0605 21.75 11.5 21.75C5.83908 21.75 1.25 17.1609 1.25 11.5Z" fill="#237DF7" />
                            </svg>
                            <input
                                className={styles.inputSearch}
                                type="text"
                                placeholder="Tìm kiếm bài học"
                            />
                        </div>
                        {listData.map((item, index) => {

                            const totalDurations = item.content.reduce((total, subItem) => {

                                const minutes = parseFloat(subItem.duration.replace(' phút', '').trim());
                                return total + minutes;
                            }, 0);
                            const totalDuration = totalDurations.toFixed(2);


                            return (
                                <div key={index} className={styles.listItem}>
                                    <div className={styles.listItem__title} onClick={() => toggleItem(index)}>

                                        <div>
                                            <div className={styles.listItem__titleText}>{index + 1}. {item.title}</div>
                                            <div className={styles.listItem__contentCount}>{item.content.length}/{item.content.length}</div>|
                                            <div className={styles.listItem__totalDuration}>{totalDuration}</div>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={`${styles.listItem__icon} ${openIndexes.includes(index) ? styles.rotated : ''}`}>
                                            <path d="M18 15L12 9L6 15" stroke="#B3B3B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    {openIndexes.includes(index) && (
                                        <ul className={styles.listItem__docs}>
                                            {item.content.map((subItem, subIndex) => (
                                                <li key={subIndex} className={styles.listItem__doc}>
                                                    <div className={styles.listItemDoc}>
                                                        {subItem.type === "video" ? (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                            <g clipPath="url(#clip0_4106_3787)">
                                                                <circle cx="9.99935" cy="9.99999" r="8.33333" stroke="#B3B3B3" strokeWidth="1.5" />
                                                                <path
                                                                    d="M12.8447 9.11752C13.4962 9.50215 13.4962 10.4978 12.8447 10.8825L8.91124 13.2048C8.27809 13.5786 7.5 13.0921 7.5 12.3224L7.5 7.67762C7.5 6.90788 8.27809 6.42133 8.91124 6.79515L12.8447 9.11752Z"
                                                                    stroke="#B3B3B3" strokeWidth="1.5" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_4106_3787">
                                                                    <rect width="20" height="20" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                <path opacity="0.5" d="M3.33398 18.3333H16.6673" stroke="#B3B3B3" stroke-width="1.5" stroke-linecap="round" />
                                                                <path d="M12.1919 2.43451L11.574 3.05243L5.8932 8.73325C5.50843 9.11803 5.31604 9.31042 5.15058 9.52255C4.95541 9.77278 4.78807 10.0435 4.65155 10.33C4.53581 10.5729 4.44977 10.831 4.27769 11.3472L3.54852 13.5347L3.37028 14.0694C3.2856 14.3235 3.35172 14.6036 3.54107 14.7929C3.73042 14.9823 4.0105 15.0484 4.26455 14.9637L4.79926 14.7855L6.98677 14.0563L6.9868 14.0563C7.50301 13.8842 7.76112 13.7982 8.00397 13.6824C8.29045 13.5459 8.5612 13.3786 8.81143 13.1834C9.02355 13.0179 9.21594 12.8256 9.60071 12.4408L9.60072 12.4408L15.2815 6.75995L15.8995 6.14203C16.9233 5.11822 16.9233 3.45831 15.8995 2.43451C14.8757 1.41071 13.2157 1.41071 12.1919 2.43451Z" stroke="#B3B3B3" stroke-width="1.5" />
                                                                <path opacity="0.5" d="M11.5724 3.05258C11.5724 3.05258 11.6496 4.36566 12.8082 5.52426C13.9668 6.68286 15.2799 6.7601 15.2799 6.7601M4.79762 14.7856L3.54688 13.5349" stroke="#B3B3B3" stroke-width="1.5" />
                                                            </svg>
                                                        )}


                                                        <div className={styles.listItem__docTitle}>
                                                            <div>
                                                                <span className={styles.listItem__docIndex}>{`${index + 1}.${subIndex + 1}`} </span>
                                                                <span className={styles.listItem__docName}>{subItem.name}</span>
                                                            </div>
                                                            <span className={styles.listItem__docDuration}>{subItem.duration}</span>
                                                        </div>
                                                    </div>
                                                    {subItem.status ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className={styles.listItem__iconSuccess}>
                                                            <g clipPath="url(#clip0_4106_3752)">
                                                                <circle cx="6" cy="6" r="5" stroke="#24A148" strokeWidth="1.5" />
                                                                <path d="M4.25 6.25L5.25 7.25L7.75 4.75" stroke="#24A148" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_4106_3752">
                                                                    <rect width="12" height="12" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className={styles.listItem__iconFailure}>
                                                            <g clipPath="url(#clip0_4106_3794)">
                                                                <path d="M1 8C1 6.58579 1 5.87868 1.43934 5.43934C1.87868 5 2.58579 5 4 5H8C9.41421 5 10.1213 5 10.5607 5.43934C11 5.87868 11 6.58579 11 8C11 9.41421 11 10.1213 10.5607 10.5607C10.1213 11 9.41421 11 8 11H4C2.58579 11 1.87868 11 1.43934 10.5607C1 10.1213 1 9.41421 1 8Z" stroke="#B3B3B3" strokeWidth="1.5" />
                                                                <path d="M6 7V9" stroke="#B3B3B3" strokeWidth="1.5" strokeLinecap="round" />
                                                                <path d="M3 5V4C3 2.34315 4.34315 1 6 1C7.65685 1 9 2.34315 9 4V5" stroke="#B3B3B3" strokeWidth="1.5" strokeLinecap="round" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_4106_3794">
                                                                    <rect width="12" height="12" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            );
                        })}



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
        </div >

    );
}
export default Learning;