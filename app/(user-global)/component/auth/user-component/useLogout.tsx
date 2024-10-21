import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/userSlice';

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
};

export const useLogout = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const token = getCookie('token');

    const handleLogout = async () => {
        if (!token) {
            console.error("Token not found");
            return;
        }
        try {
            const res = await fetch('/api/logout/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                if (typeof window !== 'undefined') {
                    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                    localStorage.removeItem('token');
                }
                dispatch(logout());
                router.push("/home");
            } else {
                console.error("Failed to log out:", res.status);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return { handleLogout };
};
