// 'use client'

// import { signIn, useSession } from 'next-auth/react';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import styles from '@public/styles/login/LoginBtn.module.css';

// const GgLogin = () => {
//     const { data: session, status } = useSession();
//     const router = useRouter();

//     useEffect(() => {
//         if (status === "authenticated") {
//             console.log("User session data:", session);
//             router.push("/info-user");
//         }
//     }, [status, session, router]);

//     const handleLogin = async () => {
//             const result = await signIn("google", { redirect: false });
//             console.log("Login result:", result);
//     };

//     return (
//         <button className={styles.RegisterMedia__btn} onClick={handleLogin}>
//             <img src="/img/google.svg" alt="Google logo" className={styles.RegisterMedia__img} />
//             <div className={styles.RegisterMedia__title}>
//                 Google
//             </div>
//         </button>
//     );
// };

// export default GgLogin;

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
        // Gọi trực tiếp API login-google
        try {
            const response = await fetch('/api/loginGg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log("API login-google response:", await response.json());
                // Chuyển hướng đến trang /info-user nếu thành công
                // router.push("/info-user");
            } else {
                console.error("API login-google failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error calling login-google API:", error);
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
