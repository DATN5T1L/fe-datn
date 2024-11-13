'use client';

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from '../../../../../redux/slices/userSlice';
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import { RootState, persistor } from '@/redux/store';
import useCookie from "../../hook/useCookie";
import { Token } from "ckeditor5";

interface User {
    age: number;
    avatar: string;
    created_at: string;
    del_flag: boolean;
    discription_user: string;
    email: string;
    fullname: string;
    id: string | number;
    phonenumber: string;
    provider_id: string;
    role: string;
}

const getCookie = (name: string) => {
    if (typeof window === 'undefined') {
        return null;
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
};

const ProfileDispatch = () => {
    const userState = useSelector((state: RootState) => state.user.user)
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
    const isAdmin = /^\/(admin)(\/.*)?$/.test(pathName);
    const isPage = /^\/(home|)(\/.*)?$/.test(pathName);
    const [dataUser, setDataUser] = useState<User | null>(null)
    const [hasLoggedOut, setHasLoggedOut] = useState(false);
    const token = getCookie('token')




    const handleLogout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('progress_percentages');
        localStorage.setItem('isLoggedIn', 'false');
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        localStorage.removeItem('persist:root');
        persistor.pause();
        dispatch(logout());
        await persistor.flush();
        await persistor.purge();
    };

    const isTokenExpired = (token: string) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiration = payload.exp;

            // console.log('Token exp:', expiration, 'Current time:', Math.floor(Date.now() / 1000));

            return expiration < Math.floor(Date.now() / 1000);
        } catch (error) {
            console.error('Không thể phân tích token:', error);
            return true;
        }
    };


    const fetchUserInfo = async (tokenValue: string) => {
        if (tokenValue && (isRegister || isLogin || isRetrievePassword)) {
            localStorage.setItem('isLoggedIn', 'true');
            router.push('/info-user');
            return;
        }

        if (!tokenValue && (isInfo || isIntro || isWallet)) {
            console.error("Token không hợp lệ hoặc không tồn tại");
            if (isAdmin) router.push('/home');
            return;
        }

        if (isTokenExpired(tokenValue)) {
            console.error("Token đã hết hạn");
            handleLogout()
            if (isInfo || isIntro || isWallet) {
                router.push('/login');
            } else if (isAdmin) {
                router.push('/home');
            }
            return;
        }

        try {
            const res = await fetch('/api/profile', {
                cache: "no-cache",
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                },
            });

            if (!res.ok) {
                console.log(await res.json());

                // throw new Error('Không thể lấy thông tin người dùng');
            }

            const data = await res.json();
            dispatch(login(data));
            setDataUser(data)
            localStorage.setItem('isLoggedIn', 'true');
            if (isLogin || isRegister || isRetrievePassword) {
                router.push('/info-user');
            }
        } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
            // handleLogout
            if (isAdmin) {
                router.push('/home');
            }
        }
    };

    useEffect(() => {
        const tokenCookie = getCookie('token');
        if (tokenCookie) {
            fetchUserInfo(tokenCookie);
        }
        else if (!tokenCookie) {
            console.error('Không tìm thấy token');
            if (isInfo || isWallet || isIntro) {
                handleLogout()
                router.push('/login');
            }
        }
        const interval = setInterval(() => {

            const setLogin = localStorage.setItem('isLoggedIn', 'false')
            const token = getCookie('token')
            if (token && isTokenExpired(token)) {
                console.error("Token đã hết hạn trong quá trình kiểm tra định kỳ");
                handleLogout()
                alert('đăng nhập lại để kiểm tra thông tin vì tính bảo mật')
                if (isAdmin) {
                    router.push('/home');
                }
            }
            if (token) {
                localStorage.setItem('isLoggedIn', 'true')
                clearInterval(interval);
            }
            if (dataUser && dataUser.del_flag === false && !hasLoggedOut) {
                setDataUser(null);
                handleLogout();
                setHasLoggedOut(true);
                localStorage.setItem('isLoggedIn', 'false')
                // if (token) {
                //     fetchUserInfo(token);
                // }

                clearInterval(interval);
            }
            else if (dataUser && dataUser.del_flag === true) {
                setHasLoggedOut(false);
            }
            // console.error('check');
        }, 10000);

        const handleLogin = (event: Event) => {
            const customEvent = event as CustomEvent;
            const { token } = customEvent.detail;
            if (token) {
                // localStorage.setItem('token', token);
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
                    if (isAdmin) {
                        router.push('/home');
                    }
                } else {
                    fetchUserInfo(newToken);
                }
            }

            if (event.key === 'isLoggedIn') {
                const isLoggedIn = event.newValue;

                if (isLoggedIn === 'false') {
                    handleLogout()
                    if (isAdmin) {
                        router.push('/home');
                    }
                } else if (isLoggedIn === 'true') {
                    const tokenValue = getCookie('token')
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
    }, [token, dataUser, dispatch, router, pathName]);
    useEffect(() => {
        const checkTokenCookie = () => {
            const tokenCookie = getCookie('token');
            localStorage.setItem('returnPath', pathName);
            if (!tokenCookie) {
                console.error('Token cookie is missing. Logging out...');
                handleLogout();
                if (isInfo || isIntro || isWallet) {
                    localStorage.setItem('returnPath', '');
                    router.push('login')
                }
                else if (isAdmin) { router.push('/home') }
            }
        };

        const interval = setInterval(checkTokenCookie, 10000);

        return () => clearInterval(interval);
    }, [dispatch, router, pathName]);

    return null;

};

export default ProfileDispatch;