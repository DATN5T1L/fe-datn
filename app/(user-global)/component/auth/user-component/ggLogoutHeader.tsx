'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/userSlice';

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
};

const GgLogoutHeader = () => {
    const dispatch = useDispatch()
    const router = useRouter();
    const token = getCookie('token');


    const handleLogout = async () => {
        if (!token) {
            console.error("Token not found");
            return;
        }

        try {
            if (confirm('Bạn có muốn đăng xuất không !!!')) {
                const res = await fetch('/api/logout/', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.ok) {
                    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                    localStorage.removeItem('token');
                    localStorage.removeItem('progress_percentages')
                    localStorage.clear()
                    dispatch(logout());
                    router.push("/home");
                } else {
                    console.error("Failed to log out:", res.status);
                }
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
        // signOut({
        //     callbackUrl: "/home"
        // });
        console.log(token);
    };

    return (
        <button className='subMenu-body-link' onClick={handleLogout}>
            <img src='/img/infoLogout-black.svg' className='subMenu-body-img-black' />
            <img src='/img/infoLogout-white.svg' className='subMenu-body-img-white' />
            <div className='subMenu-body-link-title'>
                Đăng xuất
            </div>
        </button>

    )
}

export default GgLogoutHeader