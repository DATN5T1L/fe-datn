'use client';

import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import ListPostTTO from '../ListPostTTO';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

interface PostCmt {
    id: string;
    title_post: string;
    content_post: string;
    slug_post: string;
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
    slug_post: string;
}

interface ApiPostProps {
    data?: (PostCmt | PostView)[];
}

interface TypeProps {
    step?: string;
    setStep?: Dispatch<SetStateAction<string>>;
    data?: (PostCmt | PostView)[];
}

const LinePostOnePostTTO: React.FC<TypeProps> = ({ step, data = [] }) => {
    const listCount = step === '1' ? 2 : 3; // Dynamic count logic
    const arr = data?.slice(1); // Exclude first item for ListPostTTO

    // Static placeholder when no data is provided
    const defaultImage =
        'https://images.pexels.com/photos/669578/pexels-photo-669578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    const defaultTitle = 'Xu hướng công nghệ AI và Machine Learning năm 2024';
    const defaultContent =
        'Trí tuệ nhân tạo (AI) và học máy (Machine Learning) đang trở thành công nghệ chủ chốt trong nhiều lĩnh vực, từ y tế, tài chính đến thương mại điện tử...';

    return (
        <Container className="m-0">
            <Row style={{ padding: '80px 55px' }}>
                {/* Left Section */}
                <Col xs={12} lg={6} className="mb-4 mb-lg-0">
                    <Card className="border-0 position-relative w-100" style={{ height: '480px' }}>
                        {data && data.length > 0 ? (
                            <>
                                <Card.Img
                                    variant="top"
                                    src={`${data[0].img_post}`}
                                    alt={`${data[0].title_post}`}
                                    className="w-100 h-100"
                                    style={{
                                        objectFit: 'cover',
                                        borderRadius: '10px',
                                    }}
                                />
                                <Card.Body
                                    className="position-absolute bottom-0 px-4 text-white"
                                    style={{ width: '548px', padding: '32px' }}
                                >
                                    <Link href={`/post/${data[0].slug_post}`}>
                                        <Card.Title
                                            className="fw-bold fs-2 fs-md-1"
                                            dangerouslySetInnerHTML={{ __html: data[0].title_post }}
                                        />
                                    </Link>
                                    <Card.Text
                                        className="fs-6 lh-base"
                                        dangerouslySetInnerHTML={{ __html: data[0].content_post }}
                                    />
                                </Card.Body>
                            </>
                        ) : (
                            <>
                                {/* Default Placeholder */}
                                <Card.Img
                                    variant="top"
                                    src={defaultImage}
                                    alt="Xu hướng công nghệ"
                                    className="w-100 h-100"
                                    style={{
                                        objectFit: 'cover',
                                        borderRadius: '10px',
                                    }}
                                />
                                <Card.Body className="position-absolute bottom-0 px-4 text-white">
                                    <Card.Title className="fw-bold fs-2 fs-md-1">{defaultTitle}</Card.Title>
                                    <Card.Text className="fs-6 lh-base">{defaultContent}</Card.Text>
                                </Card.Body>
                            </>
                        )}
                    </Card>
                </Col>

                {/* ListPostTTO: Dynamic list or placeholder */}
                {data && data.length > 1 ? <ListPostTTO data={arr} /> : <ListPostTTO data={[]} />}
            </Row>
        </Container>
    );
};

export default LinePostOnePostTTO;
