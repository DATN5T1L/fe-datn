"use client";

import React, { useEffect, useRef, useState } from "react";
import { Navbar, Form, Button, ButtonGroup, Spinner } from "react-bootstrap";
import h from "./Header.module.css";
import Notifications from "@/app/admin/component/DashboardMenu/notifications";
import Settings from "@/app/admin/component/DashboardMenu/settings";
import OffcanvasComponent from "@/app/admin/component/DashboardMenu/overviewmenu";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const userState = useSelector((state: RootState) => state.user.user)
  const [loadingAvatar, setLoadingAvatar] = useState(true);
  const pathName = usePathname()

  const notificationRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoadingAvatar(false)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        showNotifications
      ) {
        setShowNotifications(false);
      }

      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node) &&
        showSettings
      ) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications, showSettings]);

  const isAdmin = /^\/(admin)(\/.*)?$/.test(pathName);
  const isMarketing = /^\/(Marketing)(\/.*)?$/.test(pathName);

  return (
    <>
      <Navbar
        bg="white"
        expand="lg"
        className={`${h.nav} d-flex justify-content-between align-items-center`}
      >
        <Navbar.Brand href={`${isAdmin ? '/admin' : isMarketing ? '/admin' : '/'}`}>
          <img
            src="https://res.cloudinary.com/dnmc89c8b/image/upload/v1734076053/fe_image/Logo.png"
            className="d-inline-block align-top"
            alt="Học lập trình cơ bản với TTO.SH"
          />
        </Navbar.Brand>
        <ButtonGroup className={`${h.CTA} d-none d-xl-block`}>


          <Button
            variant="link"
            className={h.iconButton2}

          >
            {loadingAvatar ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <img
                src={`${userState?.avatar}`}
                alt="tto.sh"
                className="d-none d-xl-block"
              />
            )}
          </Button>
        </ButtonGroup>
      </Navbar>


    </>
  );
};

const SearchBar = () => {
  return (
    <div className={`${h.searchInput} input-group w-25`}>
      <input
        placeholder="Tìm kiếm bài viết"
        type="text"
        className={`${h.searchText} form-control rounded-start-5 border-end-0 p-2 ps-3`}
      />
      <div>
        <span
          className="input-group-text bg-white border-start-0 rounded-end-5 rounded-end-0 p-2"
          id="inputGroup-sizing-default"
        >
          {/* Search icon start */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="24"
            viewBox="0 0 12 12"
            fill="none"
          >
            <g clipPath="url(#clip0_3435_8010)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.75 1.375C3.33375 1.375 1.375 3.33375 1.375 5.75C1.375 8.16625 3.33375 10.125 5.75 10.125C8.16625 10.125 10.125 8.16625 10.125 5.75C10.125 3.33375 8.16625 1.375 5.75 1.375ZM0.625 5.75C0.625 2.91954 2.91954 0.625 5.75 0.625C8.58046 0.625 10.875 2.91954 10.875 5.75C10.875 7.03026 10.4056 8.20087 9.62943 9.0991L11.2652 10.7348C11.4116 10.8813 11.4116 11.1187 11.2652 11.2652C11.1187 11.4116 10.8813 11.4116 10.7348 11.2652L9.0991 9.62943C8.20087 10.4056 7.03026 10.875 5.75 10.875C2.91954 10.875 0.625 8.58046 0.625 5.75Z"
                fill="#999999"
              />
            </g>
            <defs>
              <clipPath id="clip0_3435_8010">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {/* Search icon end */}
        </span>
      </div>
    </div>
  );
};

export default Header;