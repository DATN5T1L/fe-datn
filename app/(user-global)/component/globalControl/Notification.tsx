// components/Notification.tsx
'use client'
import React, { useState } from 'react';
import styles from '@public/styles/globalControl/Notification.module.css';



const Notification: React.FC<NotificationProps> = ({ type, message }) => {
    const [visible, setVisible] = useState(true);

    const getNotificationStyles = () => {
        switch (type) {
            case 'success':
                return {
                    backgroundColor: '#EAF6ED',
                    textColor: '#000',
                    Icon: "/icons/success.svg",
                    colorMain: '#24A148',
                };
            case 'error':
                return {
                    backgroundColor: '#4D4B3D',
                    textColor: '#FFFFFF',
                    Icon: "/icons/error.svg",
                    colorMain: '#4589FF',
                };
            case 'fail':
                return {
                    backgroundColor: '#FFFDEF',
                    textColor: '#FFFFFF',
                    Icon: "/icons/fail.svg",
                    colorMain: '#F9E959',
                };
            case 'complete':
                return {
                    backgroundColor: '#EDF4FF',
                    textColor: '#FFFFFF',
                    Icon: '/icons/complete.svg',
                    colorMain: '#DA1E28',
                };
            default:
                return {
                    backgroundColor: '#000000',
                    textColor: '#FFFFFF',
                    Icon: '/icons/complete.svg',
                    colorMain: '#DA1E28',
                };
        }
    };

    const { backgroundColor, textColor, Icon, colorMain } = getNotificationStyles();

    // Hàm tắt thông báo
    const handleTurnOff = () => {
        setVisible(false);
    };

    return (
        visible ? (
            <div
                className={styles.wapper}
                style={{
                    backgroundColor,
                    color: textColor,
                    border: `1px solid ${colorMain}`,

                }}
            >
                <div className={styles.content}>
                    <div
                        style={{
                            padding: '4px',
                            backgroundColor: colorMain,
                            borderRadius: '8px'
                        }}
                    >
                        <img src={Icon} alt="icon" style={{ width: '20px', height: '20px' }} />
                    </div>

                    <span>{message}</span>
                </div>

                <div className={styles.IconCancel} onClick={handleTurnOff}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M2.85612 0.490032C2.20274 -0.163344 1.14341 -0.163344 0.490032 0.490032C-0.163344 1.14341 -0.163344 2.20274 0.490032 2.85612L4.88393 7.25002L0.49008 11.6439C-0.163297 12.2973 -0.163297 13.3566 0.49008 14.01C1.14346 14.6633 2.20279 14.6633 2.85617 14.01L7.25002 9.61611L11.6438 14.0099C12.2972 14.6633 13.3565 14.6633 14.0099 14.0099C14.6633 13.3565 14.6633 12.2972 14.0099 11.6438L9.61611 7.25002L14.01 2.85616C14.6633 2.20279 14.6633 1.14346 14.01 0.490078C13.3566 -0.163299 12.2973 -0.163299 11.6439 0.490078L7.25002 4.88393L2.85612 0.490032Z" fill="#666666" />
                    </svg>
                </div>
            </div>
        ) : null
    );
};

export default Notification;
