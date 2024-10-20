"use client";

import Image from "next/image";
import Link from "next/link";
import { Nav, Navbar } from "react-bootstrap";

// thêm css.module
import ProgressCircle from '../course/ProgressCircle'
import styles from "@public/styles/globalControl/Nav.module.css";

const NavCourse = () => {
    return (
        <header>
            <Navbar className={styles.nav} >
                <div className={styles.brandProgress}>
                    <Link href="/" className='brand-header'>
                        <Image src="/img/LogoPage.jpg" alt="logo" className='img-brand-header' />
                    </Link>
                    <h4>HTML CSS PRO</h4>
                    <ProgressCircle progress={75} />
                </div>
                <div className={styles.cta}>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                    </label>
                </div>




            </Navbar>
        </header>
    );
}

export default NavCourse;