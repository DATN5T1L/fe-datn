'use client'

import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import ListPostTTO from '../ListPostTTO'
import { Dispatch, SetStateAction } from 'react';
import styles from '@public/styles/post/LoadPostOnePost.module.css'
import Link from "next/link"
import { useRouter } from 'next/navigation';
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
    slug_post: string;
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
    slug_post: string
}
interface ApiPostProps {
    // step: string;
    data: PostCmt[] | PostView[];
}
interface TypeProps {
    step?: string;
    setStep?: Dispatch<SetStateAction<string>>;
}

const LinePostOnePostTTO: React.FC<ApiPostProps> = (props) => {
    const data = props.data
    const arr = data?.slice(1);
    const router = useRouter()

    const handlePushPost = () => {
        if (data) {
            router.replace(`/post/${data[0].slug_post}`)
        }
    }
    // const listCount = props.step === "1" ? 2 : 3;

    return (
        <Container className={styles.container}  >
            <Row className={styles.row}>
                {/* Left section */}
                <Col xs={12} lg={6} className={styles.col}>
                    <Card className={styles.card} onClick={() => handlePushPost()}>
                        {data && (
                            <>
                                <Card.Img
                                    variant="top"
                                    src={`${data[0].img_post}`}
                                    alt={`${data[0].title_post}`}
                                    className={styles.imgCard}
                                />
                                <Card.Body className={styles.cardBody}>
                                    <Card.Title className={styles.cardTitle} dangerouslySetInnerHTML={{ __html: data[0].title_post }} />
                                    <Card.Text className={styles.cardText} dangerouslySetInnerHTML={{ __html: data[0].content_post }} />
                                </Card.Body>
                            </>
                        )}
                    </Card>
                </Col>

                {data && (
                    <ListPostTTO data={arr} />
                )}
            </Row>
        </Container>

    )
}

export default LinePostOnePostTTO
