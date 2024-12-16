// components/Notifications.js
import React from "react";
import styles from "./notification.module.css";
import { Button, Image } from "react-bootstrap";
import Link from "next/link";



const Notifications = () => {
  return (
    <div className={styles.notificationContainer}>
      <div className={styles.header}>Thông báo</div>
      <div className={styles.notificationBody}>
      </div>
      <div className={styles.loadMore}>
        <button className={styles.buttonnoti}>Xem thêm</button>
      </div>
    </div>
  );
};

export default Notifications;
