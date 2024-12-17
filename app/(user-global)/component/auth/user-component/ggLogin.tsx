'use client'

import { signIn, useSession } from 'next-auth/react';
import { useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@public/styles/login/LoginBtn.module.css';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/userSlice';

const GgLogin = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        if (status === "authenticated" && session) {

            // Gọi API sau khi đã xác thực
            const loginGoogle = async () => {
                try {
                    const res = await fetch(`/api/login-google`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: session.user.name,
                            email: session.user.email,
                            image: session.user.image,
                            accessToken: session.user.accessToken,
                        })
                    });

                    const data = await res.json();
                    if (res.ok) {
                        console.log("User session data:", session);
                        if (session.user.image) {
                            dispatch(login({
                                fullname: session.user.name,
                                email: session.user.email,
                                avatar: session.user.image,
                                ...data,
                            }));
                            router.push("/home");
                        } else {
                            console.error("Ảnh đại diện chưa sẵn sàng");
                        }
                        document.cookie = `token=${data.access_token}; path=/; SameSite=Strict`;
                        router.push("/home");
                        console.log('Đăng nhập thành công:', data);
                    } else {
                        console.log('Đăng nhập thất bại:', data);
                    }
                } catch (error) {
                    console.error('Lỗi khi đăng nhập:', error);
                }
            };

            setTimeout(loginGoogle, 100);
        }
    }, [status, session, router, dispatch]);

    const handleLogin = async () => {
        if (status !== "authenticated") {
            await signIn("google", { redirect: false });
        }
    };

    return (
        <button className={styles.RegisterMedia__btn} onClick={handleLogin}>
            <img src="/img/google.svg" alt="Bán khóa học online tto.sh" className={styles.RegisterMedia__img} />
            <div className={styles.RegisterMedia__title}>
                Google
            </div>
        </button>
    );
};

export default GgLogin;

