import React, { useState, useEffect, useRef, useMemo } from 'react';
import useCookie from '@app/(user-global)/component/hook/useCookie';
import styles from "@public/styles/Learning/NoteContent.module.css";

import Button from "../component/globalControl/btnComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IconVideo, IconDoc, IconX, IconWhat32, IconDot, IconPush, Arrow } from "@/app/(user-global)/component/icon/icons";
import Notification from "@app/(user-global)/component/globalControl/Notification";
import { motion } from 'framer-motion';
import { calculateTimeAgo, scrollToElementBottom } from "@app/(user-global)/component/globalControl/commonC"
import Tippy from "@tippyjs/react/headless";
const NoteContent: React.FC<NoteProps> = ({ course_Id, userImage, onClose }) => {

    const token = useCookie('token');
    const userState = useSelector((state: RootState) => state.user);
    const user = userState?.user;

    // các hàm state ẩn hiện
    const [type, setType] = useState<NotiType>("complete");
    const [message, setMessage] = useState<string>("");
    const [showNotification, setShowNotification] = useState(false);
    const [selected, setSelected] = useState<string>("Bài học hiện tại");
    const [arrange, setArrange] = useState<string>("asc");
    const [arrangeContent, setArrangeContent] = useState<string>("Mới nhất");
    const [isSecledCate, setSecledCate] = useState<boolean>(false);
    const [isSecledArrange, setSecledArrange] = useState<boolean>(false);

    const toggleSecledCate = () => {
        setSecledCate(prev => !prev)
    }
    const toggleSecledArrange = () => {
        setSecledArrange(prev => !prev)
    }
    // console.log(commentsDetail);
    // Lắng nghe sự kiện click ngoài popup
    useEffect(() => {
        handleArrangeContent();
    }, [arrangeContent])
    const handleArrangeContent = () => {
        if (arrangeContent === "Mới nhất") {
            setArrange("asc")
            return;
        }
        setArrange("desc");
    }

    return (
        <main className={styles.ContainerNote}>

            <header className={styles.headerNote}>
                <h4 className={styles.title}>
                    Ghi chú của bạn
                </h4>

                <div className={styles.cta}>
                    <div className={styles.atcs}>
                        <Tippy
                            visible={isSecledCate}
                            onClickOutside={toggleSecledCate}
                            interactive={true}
                            placement="bottom"
                            render={(attrs) => (
                                <div className={styles.tippyCataList} tabIndex={-1} {...attrs}>
                                    <div className={styles.CataList} onClick={() => setSelected('Bài học hiện tại')}>
                                        Bài học hiện tại
                                    </div>
                                    <div className={styles.CataList} onClick={() => setSelected('Chương hiện tại')}>
                                        Chương hiện tại
                                    </div>
                                    <div className={styles.CataList} onClick={() => setSelected('Tất cả')}>
                                        Tất cả
                                    </div>
                                </div>
                            )}
                        >
                            <button className={styles.select} onClick={toggleSecledCate}>
                                <span>{selected}</span>
                                <Arrow deg='90' />
                            </button>
                        </Tippy>

                        <Tippy
                            visible={isSecledArrange}
                            onClickOutside={toggleSecledArrange}
                            interactive={true}
                            placement="bottom"
                            render={(attrs) => (
                                <div className={styles.tippyCataList} tabIndex={-1} {...attrs}>
                                    <div className={styles.CataList} onClick={() => setArrangeContent('Mới nhất')}>
                                        Mới nhất
                                    </div>
                                    <div className={styles.CataList} onClick={() => setArrangeContent('Cũ nhất')}>
                                        Cũ nhất
                                    </div>
                                    {arrange}
                                </div>
                            )}
                        >
                            <button className={styles.selectArr} onClick={toggleSecledArrange}>
                                <span>{arrangeContent}</span>
                                <Arrow deg='90' />
                            </button>
                        </Tippy>
                    </div>
                    <IconX />
                </div>

            </header>
            {showNotification && (
                <motion.div
                    initial={{ x: '-100%' }} // Bắt đầu từ bên ngoài màn hình (trái)
                    animate={{ x: 0 }}       // Chạy vào giữa màn hình
                    exit={{ x: '-100%' }}    // Chạy ra khỏi màn hình (trái)
                    transition={{ duration: 1 }} // Thời gian chuyển đổi 0.5 giây
                    className={styles.noteTap}
                >
                    <Notification type={type} message={message} position='bottom-left' />
                </motion.div>
            )}

        </main>
    );

}

export default NoteContent;