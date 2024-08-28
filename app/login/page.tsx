'use client'
import React, { useState } from 'react';
import styles from '../../public/styles/login/Login.module.css'
import Link from 'next/link';

const Login: React.FC = () => {
    const [isCheckPass, setIsCheckPass] = useState(true);
    const [isRememberLogin, setIsRememberLogin] = useState(false)

    const handleCheckPass = () => {
        setIsCheckPass(!isCheckPass);
    }

    const handleRememberLogin = () => {
        setIsRememberLogin(!isRememberLogin)
    }

    return (
        <>
            <main className={styles.main}>
                <form className={styles.form}>
                    <section className={styles.headerLogin}>
                        <h1>Đăng nhập</h1>
                        <Link href={'/'} className={styles.link}>Bạn chưa có tài khoản? <span > Đăng ký</span></Link>
                    </section>
                    <section className={styles.loginMedia}>
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
                    </section>
                    <fieldset className={styles.fieldsetLogin}>
                        <div></div>
                        <legend>hoặc đăng nhập với email</legend>
                        <div></div>
                    </fieldset>
                    <section className={styles.mainLogin}>
                        <div className={styles.userNameLogin}>
                            <label htmlFor="userName">
                                Email hoặc tên người dùng
                            </label>
                            <input type="text" required />
                        </div>
                        <div className={styles.passLogin}>
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
                        </div>
                        <div className={styles.taskLogin}>
                            <button
                                type='button'
                                className={styles.rememberLogin}
                                onClick={handleRememberLogin}
                            >
                                {isRememberLogin ? (
                                    <>
                                        <img src="/img/checkBoxFalse.svg" alt="" />
                                    </>
                                ) :
                                    (
                                        <>
                                            <img src="/img/checkBoxTrue.svg" alt="" />
                                        </>
                                    )}
                                <div>Ghi nhớ đăng nhập</div>
                            </button>
                            <Link href={'/'} className={styles.forgetPass}>
                                Quên mật khẩu
                            </Link>
                        </div>
                    </section>
                    <button type='button' className={styles.btnSubmit}>Đăng nhập</button>
                </form>
            </main>
        </>
    )
}

export default Login;   