'use client';

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from '../../../../../redux/slices/userSlice';
import { usePathname, useRouter } from "next/navigation";

const ProfileDispatch = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathName = usePathname()

    const isRegister = pathName === '/register'
    const isLogin = pathName === '/login'
    const isRetrievePassword = pathName === '/retrievePassword'
    const isInfo = pathName === '/info-user'
    const isIntro = pathName === '/intro-user'
    const isWallet = pathName === '/wallet-user'
    const isHome = pathName === '/home'
    const isCreateLearningPath = pathName === '/createLearningPath'


    const isTokenExpired = (token: string) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiration = payload.exp;

            console.log('Token exp:', expiration, 'Current time:', Math.floor(Date.now() / 1000));

            return expiration < Math.floor(Date.now() / 1000);
        } catch (error) {
            console.error('Không thể phân tích token:', error);
            return true;
        }
    };


    const fetchUserInfo = async (tokenValue: string) => {
        if (tokenValue) {
            if (isRegister || isLogin || isRetrievePassword) {
                router.push('/info-user');
                return;
            }
        }

        if (!tokenValue) {
            if (isInfo || isIntro || isWallet) {
                console.error("Token không hợp lệ hoặc không tồn tại");
                router.push('/login');
                return;
            }
        }

        if (!tokenValue) {
            console.error("Token không hợp lệ hoặc không tồn tại");
            return;
        }

        if (isTokenExpired(tokenValue)) {
            console.error("Token đã hết hạn");
            dispatch(logout());
            localStorage.removeItem('token');
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            // router.push('/login');
            return;
        }

        try {
            const res = await fetch('/api/profile', {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                },
            });

            if (!res.ok) {
                throw new Error('Không thể lấy thông tin người dùng');
            }

            const data = await res.json();

            dispatch(login(data));
        } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
            dispatch(logout());
            localStorage.removeItem('token');
            router.push('/login');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetchUserInfo(token);
        } else {
            console.error('Không tìm thấy token trong localStorage');
            if (isRegister) {
                router.push('/register')
            } else if (isRetrievePassword) {
                router.push('/retrievePassword')
            } else if (isHome) {
                router.push('/home')
            } else if (isCreateLearningPath) {
                router.push('/createLearningPath')
            } else {
                router.push('/login')
            }
        }
        const interval = setInterval(() => {
            const storedToken = localStorage.getItem('token');
            if (storedToken && isTokenExpired(storedToken)) {
                console.error("Token đã hết hạn trong quá trình kiểm tra định kỳ");
                dispatch(logout());
                localStorage.removeItem('token');
                document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                alert('đăng nhập lại để kiểm tra thông tin vì tính bảo mật')
                if (isRegister) {
                    router.push('/register')
                } else if (isRetrievePassword) {
                    router.push('/retrievePassword')
                } else if (isHome) {
                    router.push('/home')
                } else {
                    router.push('/login')
                }
            }
        }, 10000);

        const handleLogin = (event: Event) => {
            const customEvent = event as CustomEvent;
            const { token } = customEvent.detail;
            if (token) {
                localStorage.setItem('token', token);
                fetchUserInfo(token);
            } else {
                console.error("Token không hợp lệ từ sự kiện login");
            }
        };
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'token') {
                const newToken = event.newValue;
                if (!newToken) {
                    dispatch(logout());
                    router.push('/login');
                } else {
                    fetchUserInfo(newToken);
                }
            }
        };

        window.addEventListener('login', handleLogin);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('login', handleLogin);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [dispatch,router]);

    return null;
};

export default ProfileDispatch;
