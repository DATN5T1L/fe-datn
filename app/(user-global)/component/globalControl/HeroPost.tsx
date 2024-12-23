"use client";

import styles from "@public/styles/post/HeroPost.module.css";
import { Container, Row, Col, Image } from 'react-bootstrap';
// import PostTTO from "../LinePostOnePostTTO";
// import ListPostTTO from "../ListPostTTO";
// import ListPostLeftTTO from "../LinePostTwoPostTTO"
import LinePostOnePostTTO from "../LinePostOnePostTTO";
import LinePostTwoPostTTO from "../LinePostTwoPostTTO";
import ListSingle from "../ListSingle";
import { useEffect, useState } from "react";

interface CatePost {
    created_at: string;
    del_flag: boolean;
    id: string;
    name_category: string;
    tags: string;
    updated_at: string;
}
interface PostCmt {
    id: string;
    title_post: string;
    content_post: string;
    img_post: string;
    views_post: number;
    poster_id: string;
    del_flag: boolean;
    category_id: string;
    created_at: string;
    updated_at: string;
    fullname: string;
    slug_post:string;
}
interface PostView {
    id: string;
    title_post: string;
    content_post: string;
    img_post: string;
    views_post: number;
    status_post: string;
    del_flag: boolean;
    user_id: string;
    category_id: string;
    created_at: string;
    updated_at: string;
    fullname: string;
    slug_post:string;
}
interface ApiCate<T> {
    success: string;
    data: T[];
}
interface ApiPost<T> {
    success: string;
    message: string;
    data: T[];
}


const HeroPost: React.FC = () => {

    const [dataCatePost, setDataCatePost] = useState<ApiCate<CatePost> | null>(null)
    const [dataPostCmt, setDataPostCmt] = useState<ApiPost<PostCmt> | null>(null)
    const [dataPostView, setDataPostView] = useState<ApiPost<PostView> | null>(null)

    useEffect(() => {
        fetch(`/api/clientCatePost/4`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setDataCatePost(data)
                }
                console.log('cate:', data);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra: ', error);
            })
    }, [])

    useEffect(() => {
        fetch(`/api/postByCmt/4`)
            .then(res => res.json())
            .then(data => {
                console.log('Post by cmt: ', data);
                if (data) {
                    setDataPostCmt(data)
                }
            })
            .catch(error => {
                console.error('Có lỗi xảy ra: ', error);
            })
    }, [])

    useEffect(() => {
        fetch(`/api/postByView/4`)
            .then(res => res.json())
            .then(data => {
                console.log('Post by view: ', data);
                if (data) {
                    setDataPostView(data)
                }
            })
            .catch(error => {
                console.error('Có lỗi xảy ra: ', error);
            })
    }, [])

    return (
        <Container className={styles.container}>
            <h2 className={styles.title}>
                Bản tin TTO.SH
            </h2>
            <Row className={styles.Wapper} >
                {dataCatePost && dataCatePost.data.map((item, index) => (
                    <Col key={index} xs={6} md={3}>
                        <figure className={styles.itemList}>
                            <Image className={styles.image} src="https://images.unsplash.com/photo-1719937206341-38a6392dfdef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8" alt="Post hero" />
                            <figcaption className={styles.descImg}><span className={styles.content}>{item.name_category}</span></figcaption>
                        </figure>
                    </Col>
                ))}
            </Row>
            <div>
                <h3 className={styles.title2}>
                    Cùng xem qua những bài viết nổi bật của TTO
                </h3>
                {dataPostCmt && (
                    <>
                        <LinePostOnePostTTO data={dataPostCmt.data} />
                        <LinePostTwoPostTTO data={dataPostCmt.data} />
                    </>
                )}


                <h3 className={styles.title2}>
                    Danh sách bài bài viết có lượt xem cao nhất
                </h3>

                {dataPostView && (
                    <>
                        <ListSingle data={dataPostView.data} />
                        <LinePostOnePostTTO data={dataPostView.data} />
                    </>
                )}
            </div>

        </Container>
    )
}

export default HeroPost;