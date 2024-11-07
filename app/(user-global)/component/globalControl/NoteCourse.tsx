import React, { useState, useEffect, useRef } from 'react';
import Button from '../globalControl/btnComponent';
import styles from "@public/styles/globalControl/NoteCourse.module.css";
import CKEditorComponent from "../globalControl/ckedditor";

interface NoteCourseProps {
    id: number | string;
    title: string;
    time: number|string;
    onClose: () => void; // Thêm prop để đóng popup từ bên ngoài
}

const NoteCourse: React.FC<NoteCourseProps> = ({ id, title, time, onClose }) => {
    const [noteContent, setNoteContent] = useState<string>(''); // State để lưu nội dung ghi chú
    const popupRef = useRef<HTMLDivElement | null>(null);
    const formatTime = (seconds: number | string): string => {
        if (typeof seconds === 'string') {
            return seconds;
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    // Hàm lưu ghi chú
    const noteData = {
        title_note: title,
        cache_time_note: time,
        content_note: noteContent, // Sử dụng noteContent ở đây
    };
    console.log(noteData); // In ra console để kiểm tra
    const handleSaveNote = async () => {
        // Xử lý lưu ghi chú qua API
        const token = localStorage.getItem('token');
        console.log('ID:', id);
        console.log('Note Data:', noteData);
        try {
            const response = await fetch(`/api/addNote/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(noteData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const responseData = await response.json();
            console.log('Note saved successfully:', responseData);
            onClose(); // Đóng popup sau khi lưu thành công
        } catch (error) {
            console.error('Failed to save note:', error);
        }
    };

    // Hàm để đóng popup khi click ra ngoài
    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            onClose(); // Đóng popup khi click ra ngoài
        }
    };

    // Lắng nghe sự kiện click ngoài popup
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleGetContent = (data: string) => {
        console.log('Dữ liệu từ CKEditor:', data);
        setNoteContent(data);
    }

    return (
        <div className={styles.popupNoteCourse} ref={popupRef}>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <h4 className={styles.title}>Thêm ghi chú</h4>
                    <p className={styles.time}>{formatTime(time)}</p>
                </div>

                <div className={styles.editorWrapper}>
                    <CKEditorComponent course_Id={id} onClose={onClose} onSubmit={handleGetContent} />
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
                        onClick={() => {
                            handleSaveNote()
                        }}
                        type="premary"
                        status="hover"
                        size="S"
                        height={40} leftIcon={false}
                        rightIcon={false}
                    >
                        Thêm
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NoteCourse;
