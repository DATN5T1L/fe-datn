import React, { useState, useEffect, useRef } from 'react';
import styles from "@public/styles/Learning/Faq.module.css";
import Button from "../component/globalControl/btnComponent";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditorComponent from "../component/globalControl/ckedditor";
// import Ckeditor from './ckedditor';



const Faq: React.FC<FaqProps> = ({ course_Id, onClose }) => {
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


            </main>
            <main className={styles.main}
                style={{
                    display: activeTab === 'dschcuabai' ? 'block' : 'none',
                    zIndex: activeTab === 'dschcuabai' ? 1 : 0,
                }}
            >
                <h4 className={styles.title}>Danh sách khóa học</h4>

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