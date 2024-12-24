'use client'
import { useEffect, useState } from "react";
import mod from "@app/Marketing/Marketing/MarketingArticle/Comments/comments.module.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import Body from "../../component/globalControl/body";
import ChatCmtPost from "../../component/post/postDetail/chatCmtPost";
import useFormatDate from "../../component/globalControl/useFormatDate";
import PostByUser from "../../component/post/postDetail/postByUser";


interface Post {
    category_id: string;
    content_post: string;
    created_at: string;
    del_flag: boolean;
    id: string;
    img_post: string;
    title_post: string;
    updated_at: string;
    user_id: string;
    views_post: number;
    fullname: string;
}

interface Data<T> {
    status: string;
    message: string;
    data: T;
}

const PostDetail: React.FC<{ params: { id: string } }> = ({ params }) => {
    const slug = params.id;
    const [id, setId] = useState('')
    const [dataP, setDataP] = useState<Post>()
    const [data, setData] = useState<Data<Post> | null>(null)
    const token = useCookie('token')


    useEffect(() => {
        if (slug) {
            fetch(`/api/slugById/${slug}/Post`)
                .then(res => res.json())
                .then(data => {
                    console.log('data: ', data);
                    setId(data.Post)
                })
        }
    }, [slug])

    useEffect(() => {
        let isMounted = true;

        fetch(`/api/post/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (isMounted && data) {
                    console.log("cate:", data);
                    setDataP(data.data)
                }
            })
            .catch((error) => {
                if (isMounted) {
                    console.error("Có lỗi xảy ra: ", error);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [id, slug]);

    useEffect(() => {
        if (id && token) {
            fetch(`/api/post/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setData(data)
                    console.log(data);
                })
                .catch(error => console.error(error))

        }
    }, [token, id])



    return (
        <>
            <Body>
                <Container style={{ display: 'flex', marginTop: '70px' }}>
                    {
                        data ? (
                            <div className="mx-3 d-flex gap-5">
                                <div style={{ maxWidth: "880px" }}>
                                    <span className="fs-1 fs-md-3 fs-lg-5 fw-bold">
                                        {data?.data?.title_post}
                                    </span>
                                    <div className={`${mod.subTitle}`}>
                                        <span className="fs-5 fs-sm-2 fs-lg-1">{useFormatDate(data?.data?.created_at)}</span>
                                        <span>Đăng bởi 	&nbsp;
                                            <bdi>
                                                {data?.data?.fullname}
                                            </bdi>
                                        </span>
                                    </div>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: data?.data?.content_post }}
                                        className="fs-5 fs-sm-2 fs-lg-1" style={{ width: "100%", cursor: 'pointer' }}>
                                    </div>
                                    <div
                                        className="my-5 w-100 d-flex justify-content-center align-items-center"
                                        style={{ flexDirection: "column" }}
                                    >
                                        <img
                                            src={`${data?.data?.img_post}`}
                                            alt={`${data?.data?.title_post}`}
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                objectFit: "contain",
                                                borderRadius: 10,
                                            }}
                                        />
                                    </div>
                                    <ChatCmtPost id={id}></ChatCmtPost>
                                </div>
                                {slug && (
                                    <PostByUser slug={slug}></PostByUser>
                                )}
                            </div >
                        ) : ('')
                    }
                </Container>
            </Body >
        </>
    )
};

export default PostDetail;
