'use client'

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@public/styles/login/LoginBtn.module.css';

const GgLogin = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            console.log("User session data:", session);
            router.push("/info-user");
        }
    }, [status, session, router]);

    const handleLogin = async () => {
        try {
            const result = await signIn("google", { redirect: false });
            console.log("Login result:", result);

            // Kiểm tra kết quả đăng nhập
            if (result?.error) {
                // Xử lý khi đăng nhập không thành công
                console.error("Login failed:", result.error);
            } else if (result?.ok) {
                // Đăng nhập thành công, có thể chuyển hướng hoặc làm gì đó
                console.log("Login successful");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <button className={styles.RegisterMedia__btn} onClick={handleLogin}>
            <img src="/img/google.svg" alt="Google logo" className={styles.RegisterMedia__img} />
            <div className={styles.RegisterMedia__title}>
                Google
            </div>
        </button>
    );
};

export default GgLogin;

