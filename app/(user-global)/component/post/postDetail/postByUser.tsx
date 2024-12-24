'use client'

import { useEffect, useState } from "react";
import useFormatDate from "../../globalControl/useFormatDate";
import styles from "@app/Marketing/Marketing/MarketingArticle/Comments/comments.module.css";


interface PostByUserProps {
    slug: string;
}
interface Post {
    id: string;
    title_post: string;
    slug_post: string;
    content_post: string;
    views_post: number;
    img_post: string;
    fullname: string;
    created_at: string;
}
interface DataResponse {
    data: Post[];
}

const PostByUser: React.FC<PostByUserProps> = ({ slug }) => {
    const [data, setData] = useState<DataResponse | null>(null)
    useEffect(() => {
        if (slug) {
            fetch(`/api/postBySlug/${slug}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data) {
                        setData(data)
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }, [slug])

    return (
        <>
            <div className={styles.container__post__by__user} style={{ maxWidth: '400px' }}>
                <div className={styles.title__post}>
                    Bài viết đồng tác giả
                </div>
                <div className={styles.body__post}>
                    {data?.data?.map((item, index) => (
                        <div className={styles.box__post} key={index}>
                            <div className={styles.containerImg__post}>
                                <img className={styles.img__post__chill} src={`${item.img_post}`} alt={item.slug_post} />
                            </div>
                            <div className={styles.box__post__right}>
                                <div className={styles.title__post__content}>{item.title_post}</div>
                                <div className={styles.content__post__content} dangerouslySetInnerHTML={{ __html: item.content_post }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default PostByUser