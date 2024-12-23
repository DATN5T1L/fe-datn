'use client';

import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import ListPostTTO from '../ListPostTTO';
import useFormatDate from '../globalControl/useFormatDate';

import Link from 'next/link';
interface Post {
    id: string;
    title_post: string;
    content_post: string;
    img_post: string;
    views_post?: number;
    poster_id?: string;
    del_flag: boolean;
    category_id: string;
    fullname: string;
    created_at: string;
    updated_at: string;

    slug_post: string;
}

interface ApiPostProps {
    data: Post[];
}

const LinePostTwoPostTTO: React.FC<ApiPostProps> = ({ data }) => {
    const topPosts = data.slice(0, 2); // Lấy 2 bài viết đầu tiên
    const remainingPosts = data.slice(2); // Các bài viết còn lại
    const [step, setStep] = useState("1");

    return (
        <Container className="m-0">
            <Row style={{ padding: "60px 55px" }}>
                {/* Left section: Hiển thị 2 bài viết đầu tiên */}
                <Col xs={12} lg={6}>
                    <Row className="g-4">
                        {topPosts.map((item, index) => (
                            <Col xs={6} key={index}>
                                <Card className="mb-3 border-0">
                                    <Row className="g-3 d-flex flex-column">
                                        <Col xs={12}>
                                            <Card.Img
                                                style={{
                                                    height: '144px',
                                                    maxWidth: '304px',
                                                    objectFit: 'cover',
                                                }}
                                                src={item.img_post}
                                                alt={item.title_post}
                                            />
                                        </Col>
                                        <Col xs={12} className="d-flex flex-column justify-content-between">
                                            <Card.Body className="p-0">
                                                <Link href={`/post/${item.slug_post}`}>  <Card.Title className="h6 fw-semibold" dangerouslySetInnerHTML={{ __html: item.title_post }} /></Link>
                                                <Card.Text
                                                    className="text-black fs-6 lh-base fw-medium"
                                                    style={{
                                                        display: "-webkit-box",
                                                        WebkitBoxOrient: "vertical",
                                                        WebkitLineClamp: 4,
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        maxHeight: "6rem",
                                                    }}
                                                    dangerouslySetInnerHTML={{ __html: item.content_post }}
                                                />
                                            </Card.Body >
                                            <Row className="text-muted align-items-center" style={{ fontSize: '0.8rem' }}>
                                                <Col xs="auto">{useFormatDate(item.updated_at)}</Col>
                                                <Col className="text-end">Tuấn Huỳnh</Col>
                                            </Row>
                                        </Col >
                                    </Row >
                                </Card >
                            </Col >
                        ))}
                    </Row >
                </Col >

                {/* Right section: Hiển thị các bài viết còn lại */}
                {
                    remainingPosts.length > 0 && (
                        <ListPostTTO data={remainingPosts} step={step} setStep={setStep} />
                    )
                }
            </Row >
        </Container >
    );
};

export default LinePostTwoPostTTO;
