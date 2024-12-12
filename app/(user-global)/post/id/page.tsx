'use client'
import { useEffect } from "react";

const PostDetail: React.FC<{ params: { id: string } }> = ({ params }) => {
    const { id } = params;

    useEffect(() => {
        let isMounted = true; // Để kiểm tra nếu component vẫn được mount

        fetch(`/api/post/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (isMounted && data) {
                    console.log("cate:", data);
                }
            })
            .catch((error) => {
                if (isMounted) {
                    console.error("Có lỗi xảy ra: ", error);
                }
            });

        return () => {
            isMounted = false; // Cleanup khi component bị unmount
        };
    }, [id]); // Đảm bảo useEffect chạy lại nếu `id` thay đổi

    return <>{id}</>;
};

export default PostDetail;
