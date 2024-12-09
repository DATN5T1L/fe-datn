'use client'

import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import ListPostTTO from '../ListPostTTO'
import { Dispatch, SetStateAction } from 'react';
import Link from "next/link"
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
    const arr = data.slice(1);

    console.log(`data nè: `, data);
    // const listCount = props.step === "1" ? 2 : 3;

    return (
        <Container className="m-0"  >
            <Row style={{ padding: "80px 55px" }}>
                {/* Left section */}
                <Col xs={12} lg={6} className="mb-4 mb-lg-0">
                    <Card className="border-0 position-relative w-100" style={{ height: "480px" }}>
                        {data && (
                            <>
                                <Card.Img
                                    variant="top"
                                    src={`${data[0].img_post}`}
                                    alt={`${data[0].title_post}`}
                                    className="w-100 h-100"
                                    style={{ objectFit: 'cover', width: '632px', height: '480px', borderRadius: "10px" }}
                                />
                                <Card.Body className="position-absolute bottom-0 px-4 text-white">
                                    <Link href={`/post/${data[0].id}`}><Card.Title className="fw-bold fs-2 fs-md-1" dangerouslySetInnerHTML={{ __html: data[0].title_post }} /></Link>
                                    <Card.Text className="fs-6 lh-base" dangerouslySetInnerHTML={{ __html: data[0].content_post }} />
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
