'use client'

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@public/styles/login/LoginBtn.module.css';

const GgLogin = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated" && session.user.accessToken) {
            console.log("User session data:", session);
            document.cookie = `token=${session.user.accessToken}; path=/; SameSite=Strict`;
            router.push("/info-user");
        }
    }, [status, session, router]);

    const handleLogin = async () => {
        try {
            const result = await signIn("google", { redirect: false });
            if (session?.user.accessToken) {
                const res = await fetch(`/api/login-google`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${session.user.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(session.user)
                })
                if (res.ok) {
                    console.log(await res.json());
                } else {
                    console.log(await res.json());
                }
            }
            console.log("Login result:", result);
        } catch (error) {

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

// 'use client'

// import { signIn, useSession } from 'next-auth/react';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import styles from '@public/styles/login/LoginBtn.module.css';

// const GgLogin = () => {
    // const { data: session, status } = useSession();
    // const router = useRouter();
    // const [data, setData] = useState(null)
    // const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    // const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

    // useEffect(() => {
    //     if (status === "authenticated") {
    //         console.log("User session data:", session);
    //         router.push("/info-user");
    //     }
    // }, [status, session, router]);

    // const handleLogin = async () => {
        // try {
        //     const response = await fetch('/api/loginGg', {
        //         method: 'GET',
        //         mode:'no-cors'
        //     });

        //     if (response.ok) {
        //         const data = await response.json()
        //         setData(data)
        //     } else {
        //         console.error("API login-google failed:", response.statusText);
        //     }
        // } catch (error) {
        //     console.error("Error calling login-google API:", error);
        // }

        // const googleOAuthURL = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&scope=openid%20profile%20email&response_type=code&state=secure_random_state_value`;
//         window.location.href = '/api/loginGg';
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
