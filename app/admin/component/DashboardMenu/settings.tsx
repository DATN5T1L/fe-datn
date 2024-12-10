
import React from "react";
import styles from "./settings.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const Settings = () => {
  const userState = useSelector((state: RootState) => state.user.user)
  return (
    <div>
      <div className={styles.settingsContainer}>
        <div className={styles.header}>
          <div className={styles.title}>{userState?.role}</div>
          <div className={styles.name}>{userState?.fullname}</div>
        </div>

        <div className={styles.body}>
          <div className={styles.title}>Liên hệ admin</div>
          <div className={styles.title}>Đăng xuất</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
