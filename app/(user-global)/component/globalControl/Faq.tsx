import React, { useState, useEffect, useRef } from 'react';
import styles from "@public/styles/globalControl/Faq.module.css";
import Button from "../globalControl/btnComponent";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditorComponent from "../globalControl/ckedditor";
// import Ckeditor from './ckedditor';
interface FaqProps {
    course_Id: number;
    course: Chapter[]; // Mảng các chương
    onClose: () => void; // Hàm để đóng popup

}
interface Document {
    document_id: number;
    name_document: string;
    type_document: "code" | "quiz" | "video";
    status_video: boolean;
    url_video: string;
    updated_at: string;
}

interface Chapter {
    chapter_id: number;
    chapter_name: string;
    documents: Document[];
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
    {
        title: 'Thêm nữa',
        content: [
            { name: 'Phần tử X', duration: '30.22', status: false, type: "video" },
            { name: 'Phần tử Y', duration: '25.22', status: false, type: "video" },
            { name: 'Phần tử Z', duration: '12.22', status: false, type: "code" },
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
    {
        title: 'Thêm nữa',
        content: [
            { name: 'Phần tử X', duration: '30.22', status: false, type: "video" },
            { name: 'Phần tử Y', duration: '25.22', status: false, type: "video" },
            { name: 'Phần tử Z', duration: '12.22', status: false, type: "code" },
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
    {
        title: 'Thêm nữa',
        content: [
            { name: 'Phần tử X', duration: '30.22', status: false, type: "video" },
            { name: 'Phần tử Y', duration: '25.22', status: false, type: "video" },
            { name: 'Phần tử Z', duration: '12.22', status: false, type: "code" },
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
    {
        title: 'Thêm nữa',
        content: [
            { name: 'Phần tử X', duration: '30.22', status: false, type: "video" },
            { name: 'Phần tử Y', duration: '25.22', status: false, type: "video" },
            { name: 'Phần tử Z', duration: '12.22', status: false, type: "code" },
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
    {
        title: 'Thêm nữa',
        content: [
            { name: 'Phần tử X', duration: '30.22', status: false, type: "video" },
            { name: 'Phần tử Y', duration: '25.22', status: false, type: "video" },
            { name: 'Phần tử Z', duration: '12.22', status: false, type: "code" },
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
    {
        title: 'Thêm nữa',
        content: [
            { name: 'Phần tử X', duration: '30.22', status: false, type: "video" },
            { name: 'Phần tử Y', duration: '25.22', status: false, type: "video" },
            { name: 'Phần tử Z', duration: '12.22', status: false, type: "code" },
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
    {
        title: 'Thêm nữa',
        content: [
            { name: 'Phần tử X', duration: '30.22', status: false, type: "video" },
            { name: 'Phần tử Y', duration: '25.22', status: false, type: "video" },
            { name: 'Phần tử Z', duration: '12.22', status: false, type: "code" },
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

const Faq: React.FC<FaqProps> = ({ course_Id, onClose, course }) => {
    useEffect(() => {
        console.log('course', course);
    }, [course])

    const [noteContent, setNoteContent] = useState<string>('');
    const popupRef = useRef<HTMLDivElement | null>(null);
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);
    const [activeTab, setActiveTab] = useState('hoidap');
    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            onClose();
            setActiveTab('hoidap'); // Đóng popup khi click ra ngoài
        }
    };

    // Lắng nghe sự kiện click ngoài popup
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const toggleItem = (index: number) => {
        if (openIndexes.includes(index)) {
            setOpenIndexes(openIndexes.filter((i) => i !== index));
        } else {
            setOpenIndexes([...openIndexes, index]);
        }
    };
    const handleSaveNote = async () => {
        const noteData = {
            // id,
            content: noteContent, // Sử dụng noteContent ở đây
        };

        console.log(noteData); // In ra console để kiểm tra
        // Xử lý lưu ghi chú qua API
        // try {
        //     const response = await fetch('https://your-api-endpoint.com/notes', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(noteData),
        //     });

        //     if (!response.ok) {
        //         throw new Error(`Error: ${response.statusText}`);
        //     }

        //     const responseData = await response.json();
        //     console.log('Note saved successfully:', responseData);
        //     onClose(); // Đóng popup sau khi lưu thành công
        // } catch (error) {
        //     console.error('Failed to save note:', error);
        // }
    };
    const handleSubmit = (data: string) => {
        console.log('Dữ liệu từ CKEditor:', data);
        // Xử lý dữ liệu tại đây
    };
    return (
        <>
            <header className={styles.header} style={{
                display: activeTab === 'hoidap' ? 'flex' : 'none',
                zIndex: activeTab === 'hoidap' ? 1 : 0
            }}>
                <h4 className={styles.title}>Hỏi đáp</h4>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none" onClick={onClose}>
                    <path d="M2.85612 1.24003C2.20274 0.586656 1.14341 0.586656 0.490032 1.24003C-0.163344 1.89341 -0.163344 2.95274 0.490032 3.60612L4.88393 8.00002L0.49008 12.3939C-0.163297 13.0473 -0.163297 14.1066 0.49008 14.76C1.14346 15.4133 2.20279 15.4133 2.85617 14.76L7.25002 10.3661L11.6438 14.7599C12.2972 15.4133 13.3565 15.4133 14.0099 14.7599C14.6633 14.1065 14.6633 13.0472 14.0099 12.3938L9.61611 8.00002L14.01 3.60616C14.6633 2.95279 14.6633 1.89346 14.01 1.24008C13.3566 0.586701 12.2973 0.586701 11.6439 1.24008L7.25002 5.63393L2.85612 1.24003Z" fill="#666666" />
                </svg>
            </header>
            <header className={styles.header} style={{
                display: activeTab === 'dschcuabai' ? 'flex' : 'none',
                zIndex: activeTab === 'dschcuabai' ? 1 : 0
            }}>
                <div className={styles.titleNext} onClick={() => setActiveTab('hoidap')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="#237DF7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h4 className={styles.titleDs}>Danh sách câu hỏi</h4>
                </div>
                <h4 className={styles.title}>Hỏi đáp</h4>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none" onClick={onClose}>
                    <path d="M2.85612 1.24003C2.20274 0.586656 1.14341 0.586656 0.490032 1.24003C-0.163344 1.89341 -0.163344 2.95274 0.490032 3.60612L4.88393 8.00002L0.49008 12.3939C-0.163297 13.0473 -0.163297 14.1066 0.49008 14.76C1.14346 15.4133 2.20279 15.4133 2.85617 14.76L7.25002 10.3661L11.6438 14.7599C12.2972 15.4133 13.3565 15.4133 14.0099 14.7599C14.6633 14.1065 14.6633 13.0472 14.0099 12.3938L9.61611 8.00002L14.01 3.60616C14.6633 2.95279 14.6633 1.89346 14.01 1.24008C13.3566 0.586701 12.2973 0.586701 11.6439 1.24008L7.25002 5.63393L2.85612 1.24003Z" fill="#666666" />
                </svg>
            </header>
            <header className={styles.header} style={{
                display: activeTab === 'datcauhoi' ? 'flex' : 'none',
                zIndex: activeTab === 'datcauhoi' ? 1 : 0
            }}>
                <div className={styles.titleNext} onClick={() => setActiveTab('hoidap')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="#237DF7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h4 className={styles.titleDs}>Quay lại</h4>
                </div>
                <h4 className={styles.title}>Hỏi đáp</h4>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none" onClick={onClose}>
                    <path d="M2.85612 1.24003C2.20274 0.586656 1.14341 0.586656 0.490032 1.24003C-0.163344 1.89341 -0.163344 2.95274 0.490032 3.60612L4.88393 8.00002L0.49008 12.3939C-0.163297 13.0473 -0.163297 14.1066 0.49008 14.76C1.14346 15.4133 2.20279 15.4133 2.85617 14.76L7.25002 10.3661L11.6438 14.7599C12.2972 15.4133 13.3565 15.4133 14.0099 14.7599C14.6633 14.1065 14.6633 13.0472 14.0099 12.3938L9.61611 8.00002L14.01 3.60616C14.6633 2.95279 14.6633 1.89346 14.01 1.24008C13.3566 0.586701 12.2973 0.586701 11.6439 1.24008L7.25002 5.63393L2.85612 1.24003Z" fill="#666666" />
                </svg>
            </header>

            <main className={styles.main}
                style={{
                    display: activeTab === 'hoidap' ? 'block' : 'none',
                    zIndex: activeTab === 'hoidap' ? 1 : 0,
                }}
            >
                <h4 className={styles.title}>Danh sách khóa học</h4>
                {course.map((item, index) => (
                    <div key={index} className={styles.listItem}>
                        <div className={styles.listItem__title} onClick={() => toggleItem(index)}>
                            <div className={styles.listItem__titleText}>{index + 1}. {item.chapter_name}</div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className={`${styles.listItem__icon} ${openIndexes.includes(index) ? styles.rotated : ''}`}>
                                <path
                                    d="M18 15L12 9L6 15"
                                    stroke="#B3B3B3"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round" />
                            </svg>
                        </div>
                        {openIndexes.includes(index) && (
                            <ul className={styles.listItem__docs}>
                                {item.documents.map((doc, subIndex) => (
                                    <li key={subIndex} className={styles.listItem__doc}>
                                        <div className={styles.doc_title}>
                                            {doc.type_document === "video" ? (
                                                // Icon video
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <g clipPath="url(#clip0_4106_3787)">
                                                        <circle cx="9.99935" cy="9.99999" r="8.33333" stroke="#B3B3B3" strokeWidth="1.5" />
                                                        <path
                                                            d="M12.8447 9.11752C13.4962 9.50215 13.4962 10.4978 12.8447 10.8825L8.91124 13.2048C8.27809 13.5786 7.5 13.0921 7.5 12.3224L7.5 7.67762C7.5 6.90788 8.27809 6.42133 8.91124 6.79515L12.8447 9.11752Z"
                                                            stroke="#B3B3B3"
                                                            strokeWidth="1.5" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_4106_3787">
                                                            <rect width="20" height="20" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            ) : (
                                                // Icon tài liệu
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path opacity="0.5" d="M3.33398 18.3335H16.6673" stroke="#B3B3B3" stroke-width="1.5" stroke-linecap="round" />
                                                    <path d="M12.1919 2.43436L11.574 3.05228L5.8932 8.7331C5.50843 9.11788 5.31604 9.31027 5.15058 9.52239C4.95541 9.77263 4.78807 10.0434 4.65155 10.3299C4.53581 10.5727 4.44977 10.8308 4.27769 11.3471L3.54852 13.5346L3.37028 14.0693C3.2856 14.3233 3.35172 14.6034 3.54107 14.7927C3.73042 14.9821 4.0105 15.0482 4.26455 14.9635L4.79926 14.7853L6.98677 14.0561L6.9868 14.0561C7.50301 13.884 7.76112 13.798 8.00397 13.6823C8.29045 13.5457 8.5612 13.3784 8.81143 13.1832C9.02355 13.0178 9.21594 12.8254 9.60071 12.4406L9.60072 12.4406L15.2815 6.75979L15.8995 6.14187C16.9233 5.11807 16.9233 3.45816 15.8995 2.43436C14.8757 1.41055 13.2157 1.41055 12.1919 2.43436Z" stroke="#B3B3B3" stroke-width="1.5" />
                                                    <path opacity="0.5" d="M11.5724 3.05273C11.5724 3.05273 11.6496 4.36581 12.8082 5.52441C13.9668 6.68301 15.2799 6.76025 15.2799 6.76025M4.79762 14.7858L3.54688 13.535" stroke="#B3B3B3" stroke-width="1.5" />
                                                </svg>
                                            )}
                                            <div className={styles.listItem__docTitle}
                                            >
                                                <span className={styles.listItem__docIndex}>{`${index + 1}.${subIndex + 1}`} {doc.document_id} </span>
                                                <span className={styles.listItem__docName}> {doc.name_document} </span>
                                            </div>
                                        </div>
                                        {doc.status_video === true && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <g clip-path="url(#clip0_4331_7659)">
                                                    <circle cx="6" cy="6" r="5" stroke="#24A148" stroke-width="1.5" />
                                                    <path d="M4.25 6.25L5.25 7.25L7.75 4.75" stroke="#24A148" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_4331_7659">
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
                ))}

            </main>
            <main className={styles.main}
                style={{
                    display: activeTab === 'dschcuabai' ? 'block' : 'none',
                    zIndex: activeTab === 'dschcuabai' ? 1 : 0,
                }}
            >
                <h4 className={styles.title}>Danh sách khóa học</h4>
                {listData.map((item, index) => {

                    return (
                        <div key={index} className={styles.listItem}>


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


                                                <div className={styles.listItem__docTitle} onClick={() => setActiveTab('dschcuabai')}>
                                                    <div>
                                                        <span className={styles.listItem__docIndex}>{`${index + 1}.${subIndex + 1}`} </span>
                                                        <span className={styles.listItem__docName}>{subItem.name}</span>
                                                    </div>

                                                </div>
                                            </div>

                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    );
                })}
                <div className={styles.bottomCTA}>
                    <p>Không tìm thấy câu hỏi của bạn</p>
                    <Button onClick={() => setActiveTab('datcauhoi')} type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} height={32} >Đặt câu hỏi mới </Button>

                </div>
            </main>
            <main className={styles.main}
                style={{
                    display: activeTab === 'datcauhoi' ? 'block' : 'none',
                    zIndex: activeTab === 'datcauhoi' ? 1 : 0,
                }}
            >



                <div className={styles.editorWrapper}>
                    <h4 className={styles.title}>Đặt câu hỏi</h4>
                    <input type="text" className={styles.inputtTitle} placeholder='Nhập tiêu đề câu hỏi' />
                    <CKEditorComponent course_Id={course_Id} onClose={onClose} onSubmit={handleSubmit} />
                </div>

                <div className={styles.cta}>
                    <Button
                        onClick={onClose}
                        type="premary"
                        status="noBorder"
                        size="S"
                        height={40}
                        leftIcon={false}
                        rightIcon={false}
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSaveNote}
                        type="premary"
                        status="hover"
                        size="S"
                        height={40} leftIcon={false}
                        rightIcon={false}
                    >
                        Đặt câu hỏi
                    </Button>
                </div>

            </main>
        </>
    );

}

export default Faq;