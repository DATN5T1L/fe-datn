'use client'
import React, { useState } from 'react';
import styles from '../../public/styles/Register/Register.module.css'
import Link from 'next/link';

const Register: React.FC = () => {
    const [isCheckPass, setIsCheckPass] = useState(true);
    const [isRememberRegister, setIsRememberRegister] = useState(false)

    const handleCheckPass = () => {
        setIsCheckPass(!isCheckPass);
    }

    const handleRememberRegister = () => {
        setIsRememberRegister(!isRememberRegister)
    }

    return (
        <>
            <main className={styles.main}>
                <form className={styles.form}>
                    <section className={styles.headerRegister}>
                        <h1>Đăng ký tài khoản</h1>
                        <Link href={'/Register'} className={styles.link}>Bạn đã có tài khoản? <span > Đăng nhập</span></Link>
                    </section>
                    <section className={styles.mainRegister}>
                        <section className={styles.validateRegister}>
                            <div className={styles.userNameRegister}>
                                <label htmlFor="userName">
                                    Tên của bạn là gì?
                                </label>
                                <input type="text" required />
                            </div>
                            <div className={styles.emailRegister}>
                                <label htmlFor="userName">
                                    Email của bạn?
                                </label>
                                <input type="text" required />
                            </div>
                            <div className={styles.passRegister}>
                                <div className={styles.checkPass}>
                                    <label htmlFor="password">Mật khẩu</label>
                                    <button
                                        type='button'
                                        onClick={handleCheckPass}
                                    >
                                        {isCheckPass ?
                                            (
                                                <>
                                                    <img src="/img/eyeHidden.svg" alt="" />
                                                    <div>ẩn</div>
                                                </>
                                            ) : (
                                                <>
                                                    <img src="/img/eye.svg" alt="" />
                                                    <div>hiện</div>
                                                </>
                                            )
                                        }
                                    </button>
                                </div>
                                <input type={`${isCheckPass ? 'password' : 'text'}`} required />
                                <div className={styles.noteRegister}>
                                    Sử dụng 8 ký tự trở lên kết hợp chữ cái, số và ký hiệu
                                </div>
                            </div>
                            <div className={styles.requirePassRegister}>
                                <label htmlFor="requirePassword">Nhập lại mật khẩu</label>
                                <input type={`${isCheckPass ? 'password' : 'text'}`} required />
                            </div>
                        </section>
                        <button
                            type='button'
                            className={styles.rememberRegister}
                            onClick={handleRememberRegister}
                        >
                            {isRememberRegister ? (
                                <>
                                    <img src="/img/checkBoxFalse.svg" alt="" />
                                </>
                            ) :
                                (
                                    <>
                                        <img src="/img/checkBoxTrue.svg" alt="" />
                                    </>
                                )}
                            <div>Bằng cách tạo tài khoản, bạn đồng ý với Điều khoản sử dụng và Chính sách quyền riêng tư.</div>
                        </button>
                        <button type='button' className={styles.btnSubmit}>Đăng ký</button>
                    </section>
                    <section className={styles.withRegister}>
                        <div className={styles.headWithRegister}>
                            Tiếp tục với
                        </div>
                        <div className={styles.RegisterMedia}>
                            <button>
                                <img src="/img/fb.svg" alt="" />
                                <div>
                                    Facebook
                                </div>
                            </button>
                            <button>
                                <img src="/img/google.svg" alt="" />
                                <div>
                                    Google
                                </div>
                            </button>
                            <button>
                                <img src="/img/apple.svg" alt="" />
                                <div>
                                    Apple
                                </div>
                            </button>
                        </div>
                    </section>
                </form>
            </main>
        </>
    )
}

export default Register;   