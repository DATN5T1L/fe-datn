'use client';

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from '../../../../../redux/slices/userSlice';
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

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
    const isPokemon = pathName === '/pokemon'
    const isCreateLearningPath = pathName === '/createLearningPath'
    const isCourse = pathName === '/course'
    const isCourseFor = pathName === '/coursefor'

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem('progress_percentages');
        localStorage.setItem('isLoggedIn', 'false');
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    };

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
        const tokenCookie = getCookie('token');
        if (tokenValue) {
            if (isRegister || isLogin || isRetrievePassword) {
                localStorage.setItem('isLoggedIn', 'true');
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

        if (!tokenCookie) {
            handleLogout()
            router.push('/login');
            return;
        }

        if (isTokenExpired(tokenValue)) {
            console.error("Token đã hết hạn");
            handleLogout()
            router.push('/login');
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
            console.log(data);
            localStorage.setItem('isLoggedIn', 'true');
            if (isLogin || isRegister || isRetrievePassword) {
                router.push('/info-user');
            }
        } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
            handleLogout()
            router.push('/login');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const tokenCookie = getCookie('token');
        if (token && tokenCookie) {
            fetchUserInfo(token);
        } else if (!tokenCookie) {
            console.error('Không tìm thấy token');
            if (isInfo || isWallet || isIntro) {
                handleLogout()
                router.push('/login');
            }
        }
        else if (!token) {
            console.error('Không tìm thấy token');
            if (isInfo || isWallet || isIntro) {
                handleLogout()
                router.push('/login');
            }
        }
        const interval = setInterval(() => {
            const storedToken = localStorage.getItem('token');
            if (storedToken && isTokenExpired(storedToken)) {
                console.error("Token đã hết hạn trong quá trình kiểm tra định kỳ");
                handleLogout()
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
                    handleLogout()
                    router.push('/login');
                } else {
                    fetchUserInfo(newToken);
                }
            }

            if (event.key === 'isLoggedIn') {
                const isLoggedIn = event.newValue;

                if (isLoggedIn === 'false') {
                    handleLogout()
                    router.push('/login');
                } else if (isLoggedIn === 'true') {
                    const tokenValue = localStorage.getItem('token');
                    if (tokenValue) {
                        fetchUserInfo(tokenValue);
                    }
                }
            }
        };

        window.addEventListener('login', handleLogin);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('login', handleLogin);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [dispatch, router]);
    useEffect(() => {
        const checkTokenCookie = () => {
            const tokenCookie = getCookie('token');
            localStorage.setItem('returnPath', pathName);
            if (!tokenCookie) {
                console.error('Token cookie is missing. Logging out...');
                handleLogout();
                if(isInfo||isIntro||isWallet)
                router.push('login')
            }
        };

        const interval = setInterval(checkTokenCookie, 1000);

        return () => clearInterval(interval);
    }, [dispatch, router]);

    return null;
};

export default ProfileDispatch;
